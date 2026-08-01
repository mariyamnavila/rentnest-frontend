'use client';

import { startTransition, useActionState, useEffect, useState } from 'react';
import { Star, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { submitReview, type ReviewState } from '../../_actions/tenant/reviewActions';
import { toast } from 'sonner';

type ReviewFormModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyId: string;
  propertyName: string;
};

const initialState: ReviewState = {
  success: false,
  message: '',
  errors: {},
};

export function ReviewFormModal({ open, onOpenChange, propertyId, propertyName }: ReviewFormModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [state, action, pending] = useActionState(submitReview, initialState);

  useEffect(() => {
    if (!state) return;
    if (!state.message.trim()) return;

    if (state.success) {
      toast.success(state.message);
      onOpenChange(false);
    } else {
      toast.error(state.message);
    }
  }, [state, onOpenChange]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setRating(0);
      setComment('');
    }
    onOpenChange(open);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('propertyId', propertyId);
    formData.append('rating', String(rating));
    if (comment) formData.append('comment', comment);

    startTransition(() => {
      action(formData);
    });
  };

  const displayRating = hoveredRating || rating;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-black uppercase">
            Leave a Review
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 dark:text-slate-400">
            Share your experience renting <span className="font-bold text-[#222222] dark:text-white">{propertyName}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Star Rating */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wide text-[#222222] dark:text-slate-200">
              Rating <span className="text-rose-500">*</span>
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  disabled={pending}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  className="cursor-pointer disabled:cursor-not-allowed transition-transform hover:scale-110"
                >
                  <Star
                    className={`size-8 transition-colors ${
                      star <= displayRating
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-gray-200 text-gray-200 dark:fill-slate-700 dark:text-slate-700'
                    }`}
                  />
                </button>
              ))}
              {displayRating > 0 && (
                <span className="ml-2 text-sm font-bold text-[#222222] dark:text-white">
                  {displayRating}/5
                </span>
              )}
            </div>
            {state.errors?.rating && (
              <p className="text-[11px] font-semibold text-rose-500">{state.errors.rating}</p>
            )}
          </div>

          {/* Comment */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wide text-[#222222] dark:text-slate-200">
              Comment <span className="text-gray-400 font-normal text-[10px]">(Optional)</span>
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={pending}
              rows={4}
              maxLength={500}
              placeholder="Tell others about your experience..."
              className="w-full rounded-xl border border-[#e4e4e4] dark:border-[#2e3440] bg-transparent px-3 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#CFA190]/50 resize-none"
            />
            <p className="text-[10px] text-gray-400 text-right">{comment.length}/500</p>
            {state.errors?.comment && (
              <p className="text-[11px] font-semibold text-rose-500">{state.errors.comment}</p>
            )}
          </div>

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            disabled={pending || rating === 0}
            className="w-full bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-xl py-5 cursor-pointer text-sm gap-2"
          >
            {pending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="size-4" />
                Submit Review
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
