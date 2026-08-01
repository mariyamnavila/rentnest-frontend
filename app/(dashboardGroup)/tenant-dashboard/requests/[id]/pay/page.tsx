import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CreditCard, ShieldCheck, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { getRentalDetail } from '@/app/(dashboardGroup)/_actions/tenant/rentalDetailActions';
import { PayButton } from '@/app/(dashboardGroup)/_components/tenant/PayButton';

type PayPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PayPageProps) {
  const { id } = await params;
  const result = await getRentalDetail(id);
  if (!result.success || !result.data) return { title: 'Payment - RentNest' };
  return { title: `Pay for ${result.data.property?.title || 'Rental'} - RentNest` };
}

export default async function PayPage({ params }: PayPageProps) {
  const { id } = await params;
  const result = await getRentalDetail(id);

  if (!result.success || !result.data) notFound();

  const rental = result.data;
  const property = rental.property;

  // Only APPROVED requests can be paid
  if (rental.status !== 'APPROVED') {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 space-y-4">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-amber-100 dark:bg-amber-950/40 text-amber-500 mb-2">
          <AlertTriangle className="size-6" />
        </div>
        <h1 className="text-lg font-black text-[#222222] dark:text-white uppercase">Payment Not Available</h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 max-w-sm mx-auto">
          Only <span className="font-bold text-[#222222] dark:text-white">APPROVED</span> rental requests can proceed to payment.
        </p>
        <Link
          href={`/tenant-dashboard/requests/${id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#CFA190] hover:underline"
        >
          <ArrowLeft className="size-3.5" />
          Back to Request
        </Link>
      </div>
    );
  }

  // Calculate cost
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const start = new Date(rental.startDate);
  const end = new Date(rental.endDate);
  const totalDays = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / MS_PER_DAY));
  const dailyRate = (property?.price || 0) / 30;
  const totalAmount = Number((dailyRate * totalDays).toFixed(2));

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">
      {/* Back Link */}
      <Link
        href={`/tenant-dashboard/requests/${id}`}
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-slate-400 hover:text-[#CFA190] transition-colors uppercase tracking-wider"
      >
        <ArrowLeft className="size-4" />
        <span>Back to Application</span>
      </Link>

      {/* Payment Card */}
      <div className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-gray-100 dark:border-slate-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] text-xs font-extrabold tracking-wider uppercase w-fit mb-3">
            <CreditCard className="size-3.5" />
            <span>Secure Checkout</span>
          </div>
          <h1 className="text-2xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
            Payment Summary
          </h1>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Property Info */}
          {property && (
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440]">
              <div className="min-w-0 flex-1 space-y-1">
                <p className="text-sm font-black text-[#222222] dark:text-white truncate">
                  {property.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  {property.location}
                </p>
              </div>
              <p className="text-sm font-black text-[#CFA190] shrink-0">
                ${property.price.toLocaleString()}<span className="text-[10px] text-gray-400 font-normal">/mo</span>
              </p>
            </div>
          )}

          {/* Rental Duration */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440]">
              <div className="flex items-center gap-1.5 mb-1">
                <Clock className="size-3.5 text-[#CFA190]" />
                <span className="text-[10px] font-bold text-gray-400 uppercase">Duration</span>
              </div>
              <p className="text-sm font-bold text-[#222222] dark:text-white">
                {totalDays} {totalDays === 1 ? 'Day' : 'Days'}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440]">
              <div className="flex items-center gap-1.5 mb-1">
                <CheckCircle className="size-3.5 text-[#CFA190]" />
                <span className="text-[10px] font-bold text-gray-400 uppercase">Status</span>
              </div>
              <p className="text-sm font-bold text-emerald-600">
                Approved
              </p>
            </div>
          </div>

          {/* Total */}
          <div className="p-4 rounded-2xl bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase">Total Amount</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Based on ${property?.price?.toLocaleString()}/mo rate</p>
            </div>
            <p className="text-2xl font-black text-[#CFA190]">${totalAmount.toLocaleString()}</p>
          </div>

          {/* Security Note */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-[#232733] border border-gray-200 dark:border-slate-800 text-xs text-gray-500">
            <ShieldCheck className="size-4 text-[#CFA190] shrink-0" />
            <span>Payments are processed securely via Stripe. Your card details are never stored on our servers.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 space-y-3">
          <PayButton rentalRequestId={rental.id} />

          {/* Already Paid */}
          {rental.payments?.some((p) => p.status === 'COMPLETED') && (
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-600">
              <CheckCircle className="size-4" />
              <span>Payment Already Completed</span>
            </div>
          )}

          {/* Failed Payment */}
          {rental.payments?.some((p) => p.status === 'FAILED') && (
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs font-bold text-rose-600">
              <XCircle className="size-4" />
              <span>Previous Payment Failed — Please Try Again</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
