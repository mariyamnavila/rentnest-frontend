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
        onClick={() => setReviewOpen(true)}
        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl py-6 cursor-pointer text-sm gap-2 shadow-lg transition-transform hover:-translate-y-0.5"
      >
        <Star className="size-4" />
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
