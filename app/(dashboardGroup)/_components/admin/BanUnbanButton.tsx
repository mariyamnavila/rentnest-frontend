'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Ban, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toggleUserStatus } from '../../_actions/admin/adminActions';
import { toast } from 'sonner';

type BanUnbanButtonProps = {
  userId: string;
  currentStatus: string;
};

export function BanUnbanButton({ userId, currentStatus }: BanUnbanButtonProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isBanned = currentStatus === 'BANNED';

  const mutation = useMutation({
    mutationFn: () => toggleUserStatus(userId, currentStatus),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message);
        queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
        router.refresh();
      } else {
        toast.error(result.message);
      }
    },
    onError: () => {
      toast.error('Failed to update user status');
    },
  });

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending}
      className={
        isBanned
          ? 'text-gray-500 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-xl px-2.5 py-1.5 cursor-pointer gap-1'
          : 'text-gray-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl px-2.5 py-1.5 cursor-pointer gap-1'
      }
    >
      {mutation.isPending ? (
        <Loader2 className="size-3.5 animate-spin" />
      ) : isBanned ? (
        <CheckCircle className="size-3.5" />
      ) : (
        <Ban className="size-3.5" />
      )}
      <span className="text-xs font-bold">
        {mutation.isPending
          ? 'Updating...'
          : isBanned
            ? 'Unban'
            : 'Ban'}
      </span>
    </Button>
  );
}
