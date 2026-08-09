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
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className={compact
          ? "bg-white dark:bg-[#1a1d24] border-[#e4e4e4] dark:border-[#2e3440] text-[#222222] dark:text-slate-200 hover:text-[#CFA190] dark:hover:text-[#CFA190] hover:bg-[#fff5f5] dark:hover:bg-[#232733] font-bold rounded-xl text-xs px-2.5 py-1.5 cursor-pointer gap-1.5 transition-colors shadow-2xs"
          : "bg-white dark:bg-[#1a1d24] border-[#e4e4e4] dark:border-[#2e3440] text-[#222222] dark:text-slate-200 hover:text-[#CFA190] dark:hover:text-[#CFA190] hover:bg-[#fff5f5] dark:hover:bg-[#232733] font-bold rounded-xl text-xs px-3 py-1.5 cursor-pointer gap-1.5 transition-colors shadow-2xs"
        }
      >
        <Star className="size-3.5 fill-amber-400 text-amber-500 shrink-0" />
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
