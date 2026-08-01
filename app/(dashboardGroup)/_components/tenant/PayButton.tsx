'use client';

import { useTransition } from 'react';
import { Loader2, CreditCard, ExternalLink } from 'lucide-react';
import { createCheckoutSession } from '../../_actions/tenant/paymentActions';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type PayButtonProps = {
  rentalRequestId: string;
};

export function PayButton({ rentalRequestId }: PayButtonProps) {
  const [pending, startTransition] = useTransition();

  const handlePay = () => {
    startTransition(async () => {
      const result = await createCheckoutSession(rentalRequestId);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      if (result.checkoutUrl) {
        toast.success(result.message);
        window.location.href = result.checkoutUrl;
      }
    });
  };

  return (
    <Button
      onClick={handlePay}
      disabled={pending}
      className="w-full bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-2xl py-6 cursor-pointer text-sm gap-2 shadow-lg transition-transform hover:-translate-y-0.5"
    >
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          <span>Redirecting to Stripe...</span>
        </>
      ) : (
        <>
          <CreditCard className="size-4" />
          <span>Pay with Stripe</span>
          <ExternalLink className="size-3.5 opacity-60" />
        </>
      )}
    </Button>
  );
}
