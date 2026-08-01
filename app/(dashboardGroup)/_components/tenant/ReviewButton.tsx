'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReviewFormModal } from './ReviewFormModal';

type ReviewButtonProps = {
  propertyId: string;
  propertyName: string;
  compact?: boolean;
};

export function ReviewButton({ propertyId, propertyName, compact = false }: ReviewButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="sm"
        onClick={() => setOpen(true)}
        className={compact
          ? "bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs px-2.5 py-1.5 cursor-pointer gap-1"
          : "bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs px-3 py-1.5 cursor-pointer gap-1"
        }
      >
        <Star className="size-3.5" />
        {!compact && <span>Review</span>}
      </Button>

      <ReviewFormModal
        open={open}
        onOpenChange={setOpen}
        propertyId={propertyId}
        propertyName={propertyName}
      />
    </>
  );
}
