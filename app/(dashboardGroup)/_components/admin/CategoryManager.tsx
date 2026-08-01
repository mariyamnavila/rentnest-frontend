'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, Loader2, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { createCategory, updateCategory, deleteCategory } from '../../_actions/admin/adminActions';
import { toast } from 'sonner';
import type { AdminCategory } from '../../_actions/admin/adminActions';

type CategoryManagerProps = {
  categories: AdminCategory[];
};

export function CategoryManager({ categories }: CategoryManagerProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState('');

  const createMutation = useMutation({
    mutationFn: () => createCategory(newName),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message);
        setNewName('');
        queryClient.invalidateQueries({ queryKey: ['admin', 'categories'] });
        router.refresh();
      } else {
        toast.error(result.message);
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: () => updateCategory(editingId!, editName),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message);
        setEditingId(null);
        setEditName('');
        queryClient.invalidateQueries({ queryKey: ['admin', 'categories'] });
        router.refresh();
      } else {
        toast.error(result.message);
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteCategory(deleteId!),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message);
        setDeleteId(null);
        setDeleteName('');
        queryClient.invalidateQueries({ queryKey: ['admin', 'categories'] });
        router.refresh();
      } else {
        toast.error(result.message);
      }
    },
  });

  const startEdit = (cat: AdminCategory) => {
    setEditingId(cat.id);
    setEditName(cat.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  return (
    <div className="space-y-4">

      {/* Create Form */}
      <div className="flex gap-2">
        <Input
          placeholder="New category name..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && newName.trim()) createMutation.mutate();
          }}
          className="h-11 rounded-xl border-[#e4e4e4] dark:border-[#2e3440] bg-[#f7f7f7] dark:bg-[#232733] text-sm font-medium"
        />
        <Button
          onClick={() => createMutation.mutate()}
          disabled={!newName.trim() || createMutation.isPending}
          className="h-11 px-5 rounded-xl bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold text-sm cursor-pointer gap-1.5 shrink-0"
        >
          {createMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
          Add
        </Button>
      </div>

      {/* Category List */}
      <div className="space-y-2">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center gap-2 p-3 rounded-xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440]"
          >
            {editingId === cat.id ? (
              <>
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && editName.trim()) updateMutation.mutate();
                    if (e.key === 'Escape') cancelEdit();
                  }}
                  autoFocus
                  className="h-9 rounded-lg text-sm"
                />
                <Button
                  size="sm"
                  onClick={() => updateMutation.mutate()}
                  disabled={!editName.trim() || updateMutation.isPending}
                  className="h-9 w-9 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer shrink-0"
                >
                  {updateMutation.isPending ? <Loader2 className="size-3.5 animate-spin" /> : <Check className="size-3.5" />}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={cancelEdit}
                  className="h-9 w-9 rounded-lg text-gray-400 hover:text-gray-600 cursor-pointer shrink-0"
                >
                  <X className="size-3.5" />
                </Button>
              </>
            ) : (
              <>
                <span className="flex-1 text-sm font-bold text-[#222222] dark:text-white">
                  {cat.name}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => startEdit(cat)}
                  className="h-9 w-9 rounded-lg text-gray-400 hover:text-[#CFA190] hover:bg-[#fff5f5] dark:hover:bg-[#1a1d24] cursor-pointer shrink-0"
                >
                  <Pencil className="size-3.5" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => { setDeleteId(cat.id); setDeleteName(cat.name); }}
                  className="h-9 w-9 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer shrink-0"
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </>
            )}
          </div>
        ))}

        {categories.length === 0 && (
          <p className="text-center text-sm text-gray-400 py-8">No categories yet. Create one above.</p>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onOpenChange={(open) => { if (!open) { setDeleteId(null); setDeleteName(''); } }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-black uppercase">Delete Category</DialogTitle>
            <DialogDescription className="text-center text-sm text-gray-500 dark:text-slate-400">
              Are you sure you want to delete <span className="font-bold text-[#222222] dark:text-white">{deleteName}</span>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => { setDeleteId(null); setDeleteName(''); }}
              disabled={deleteMutation.isPending}
              className="rounded-xl border-[#e4e4e4] dark:border-[#2e3440] font-bold cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isPending}
              className="rounded-xl font-bold cursor-pointer gap-2"
            >
              {deleteMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
