'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, Pencil, Trash2, ToggleLeft, ToggleRight, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { deleteProperty, togglePropertyAvailability } from '../../_actions/landlord/propertyActions';
import { toast } from 'sonner';

type PropertyActionsProps = {
  propertyId: string;
  propertyName: string;
  isAvailable: boolean;
};

export function PropertyActions({ propertyId, propertyName, isAvailable }: PropertyActionsProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [toggling, setToggling] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteProperty(propertyId);
      if (result.success) {
        toast.success(result.message);
        setDeleteOpen(false);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleToggle = () => {
    setToggling(true);
    startTransition(async () => {
      const result = await togglePropertyAvailability(propertyId, !isAvailable);
      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
      setToggling(false);
    });
  };

  return (
    <div className="flex items-center gap-1.5">
      <Link href={`/properties/${propertyId}`}>
        <Button size="sm" variant="ghost" className="text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl px-2 py-1.5 cursor-pointer">
          <Eye className="size-4" />
        </Button>
      </Link>

      <Link href={`/landlord-dashboard/properties/${propertyId}/edit`}>
        <Button size="sm" variant="ghost" className="text-gray-500 hover:text-[#CFA190] hover:bg-[#fff5f5] dark:hover:bg-[#232733] rounded-xl px-2 py-1.5 cursor-pointer">
          <Pencil className="size-4" />
        </Button>
      </Link>

      <Button
        size="sm"
        variant="ghost"
        onClick={handleToggle}
        disabled={pending || toggling}
        className="text-gray-500 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30 rounded-xl px-2 py-1.5 cursor-pointer"
      >
        {toggling ? (
          <Loader2 className="size-4 animate-spin" />
        ) : isAvailable ? (
          <ToggleRight className="size-4" />
        ) : (
          <ToggleLeft className="size-4" />
        )}
      </Button>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="ghost" className="text-gray-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl px-2 py-1.5 cursor-pointer">
            <Trash2 className="size-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-rose-100 dark:bg-rose-950/40 text-rose-500 mb-2 mx-auto">
              <AlertTriangle className="size-6" />
            </div>
            <DialogTitle className="text-center text-lg font-black uppercase">
              Delete Property
            </DialogTitle>
            <DialogDescription className="text-center text-sm text-gray-500 dark:text-slate-400">
              Are you sure you want to delete <span className="font-bold text-[#222222] dark:text-white">{propertyName}</span>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              disabled={pending}
              className="rounded-xl border-[#e4e4e4] dark:border-[#2e3440] font-bold cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={pending}
              className="rounded-xl font-bold cursor-pointer gap-2"
            >
              {pending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="size-4" />
                  Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
