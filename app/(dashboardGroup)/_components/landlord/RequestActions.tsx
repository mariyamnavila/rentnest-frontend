'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Loader2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { updateRequestStatus, completeRequest } from '../../_actions/landlord/requestActions';
import { RequestDetailModal } from './RequestDetailModal';
import { toast } from 'sonner';
import type { IRentalRequest } from '@/lib/types';

type RequestActionsProps = {
  rentalRequestId: string;
  status: string;
  request: IRentalRequest;
};

export function RequestActions({ rentalRequestId, status, request }: RequestActionsProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [detailOpen, setDetailOpen] = useState(false);

  const handleApprove = () => {
    startTransition(async () => {
      const result = await updateRequestStatus(rentalRequestId, 'APPROVED');
      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleReject = () => {
    startTransition(async () => {
      const result = await updateRequestStatus(rentalRequestId, 'REJECTED');
      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleComplete = () => {
    startTransition(async () => {
      const result = await completeRequest(rentalRequestId);
      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <>
      <div className="flex items-center gap-1.5">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setDetailOpen(true)}
          className="text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl px-2 py-1.5 cursor-pointer"
        >
          <Eye className="size-4" />
        </Button>

        {status === 'PENDING' && (
          <>
            <Button
              size="sm"
              onClick={handleApprove}
              disabled={pending}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs px-3 py-1.5 cursor-pointer gap-1"
            >
              {pending ? <Loader2 className="size-3 animate-spin" /> : <CheckCircle className="size-3" />}
              Approve
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleReject}
              disabled={pending}
              className="border-rose-200 dark:border-rose-800 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-bold rounded-xl text-xs px-3 py-1.5 cursor-pointer gap-1"
            >
              <XCircle className="size-3" />
              Reject
            </Button>
          </>
        )}

        {status === 'ACTIVE' && (
          <Button
            size="sm"
            onClick={handleComplete}
            disabled={pending}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl text-xs px-3 py-1.5 cursor-pointer gap-1"
          >
            {pending ? <Loader2 className="size-3 animate-spin" /> : <CheckCircle className="size-3" />}
            Complete
          </Button>
        )}
      </div>

      <RequestDetailModal
        open={detailOpen}
        onOpenChange={setDetailOpen}
        request={request}
      />
    </>
  );
}
