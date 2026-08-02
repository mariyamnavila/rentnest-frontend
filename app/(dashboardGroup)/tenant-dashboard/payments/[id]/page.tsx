import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CreditCard, Calendar, DollarSign, MapPin, Clock, Receipt } from 'lucide-react';
import { getPaymentDetail } from '../../../_actions/tenant/paymentHistoryActions';
import { StatusBadge } from '../../../_components/shared/StatusBadge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type PageProps = {
  params: Promise<{ id: string }>;
};

export const metadata = {
  title: 'Payment Details - RentNest',
};

export default async function PaymentDetailPage({ params }: PageProps) {
  const { id } = await params;
  const result = await getPaymentDetail(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const payment = result.data;
  const property = payment.rentalRequest?.property;

  return (
    <div className="space-y-6 font-sans">

      {/* Back Link */}
      <Link
        href="/tenant-dashboard/payments"
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-slate-400 hover:text-[#CFA190] transition-colors uppercase tracking-wider"
      >
        <ArrowLeft className="size-4" />
        <span>Back to Payments</span>
      </Link>

      {/* Page Header */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-white via-white to-[#fff5f5] dark:from-[#1a1d24] dark:via-[#1a1d24] dark:to-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] flex items-center justify-center shrink-0">
            <Receipt className="size-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
              Payment <span className="text-[#CFA190]">Details</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Payment Info */}
        <Card className="lg:col-span-2 bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs">
          <CardHeader className="p-6 pb-4">
            <CardTitle className="text-base font-black uppercase tracking-wide text-[#222222] dark:text-white">
              Transaction Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-4">

            {/* Amount & Status */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440]">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#fff5f5] dark:bg-[#1a1d24] border border-[#CFA190]/20 flex items-center justify-center text-[#CFA190]">
                  <DollarSign className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Amount Paid</p>
                  <p className="text-xl font-black text-[#CFA190]">${payment.amount.toLocaleString()}</p>
                </div>
              </div>
              <StatusBadge status={payment.status} />
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Method</p>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#f7f7f7] dark:bg-[#232733] text-xs font-bold text-gray-600 dark:text-slate-300">
                  <CreditCard className="size-3.5 text-[#CFA190]" />
                  {payment.method}
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Transaction ID</p>
                <p className="text-xs font-bold text-[#222222] dark:text-white break-all">
                  {payment.transactionId || '—'}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Paid At</p>
                <span className="flex items-center gap-1.5 text-xs font-bold text-[#222222] dark:text-white">
                  <Calendar className="size-3.5 text-[#CFA190]" />
                  {payment.paidAt
                    ? new Date(payment.paidAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                    : new Date(payment.createdAt || '').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Created</p>
                <span className="flex items-center gap-1.5 text-xs font-bold text-[#222222] dark:text-white">
                  <Clock className="size-3.5 text-gray-400" />
                  {new Date(payment.createdAt || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Rental Period */}
            {payment.rentalRequest && (
              <div className="p-4 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] space-y-2">
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Rental Period</p>
                <div className="flex items-center gap-2 text-xs font-bold text-[#222222] dark:text-white">
                  <Calendar className="size-3.5 text-[#CFA190]" />
                  {new Date(payment.rentalRequest.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  {' — '}
                  {new Date(payment.rentalRequest.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            )}

          </CardContent>
        </Card>

        {/* Property Info */}
        {property && (
          <Card className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs">
            <CardHeader className="p-6 pb-4">
              <CardTitle className="text-base font-black uppercase tracking-wide text-[#222222] dark:text-white">
                Property
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-4">
              <div className="relative h-32 rounded-2xl overflow-hidden border border-[#e4e4e4] dark:border-[#2e3440]">
                <Image
                  unoptimized
                  src={property.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80'}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1.5">
                <p className="text-sm font-black text-[#222222] dark:text-white">{property.title}</p>
                <p className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin className="size-3 text-[#CFA190] shrink-0" />
                  {property.location}
                </p>
                <p className="text-sm font-black text-[#CFA190]">
                  ${property.price.toLocaleString()}<span className="text-[10px] text-gray-400 font-normal">/mo</span>
                </p>
              </div>
              <Link href={`/properties/${property.id}`} className="block">
                <Button variant="outline" className="w-full h-10 rounded-xl border-[#CFA190] text-[#CFA190] hover:bg-[#fff5f5] dark:hover:bg-[#232733] font-bold text-xs cursor-pointer">
                  View Property
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

      </div>

    </div>
  );
}
