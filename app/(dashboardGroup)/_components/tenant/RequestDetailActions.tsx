'use client';

import { useState } from 'react';
import { ReviewFormModal } from './ReviewFormModal';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

type RequestDetailActionsProps = {
  status: string;
  propertyId: string;
  propertyName: string;
};

export function RequestDetailActions({ status, propertyId, propertyName }: RequestDetailActionsProps) {
  const [reviewOpen, setReviewOpen] = useState(false);

  if (status !== 'ACTIVE' && status !== 'COMPLETED') return null;

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setReviewOpen(true)}
        className="w-full bg-white dark:bg-[#1a1d24] border-[#e4e4e4] dark:border-[#2e3440] text-[#222222] dark:text-slate-100 hover:text-[#CFA190] dark:hover:text-[#CFA190] hover:bg-[#fff5f5] dark:hover:bg-[#232733] font-bold rounded-2xl py-5 cursor-pointer text-sm gap-2 transition-all shadow-xs"
      >
        <Star className="size-4 fill-amber-400 text-amber-500 shrink-0" />
        <span>Leave a Review</span>
      </Button>

      <ReviewFormModal
        open={reviewOpen}
        onOpenChange={setReviewOpen}
        propertyId={propertyId}
        propertyName={propertyName}
      />
    </>
  );
}
