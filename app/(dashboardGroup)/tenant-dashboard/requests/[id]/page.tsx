import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin, CalendarDays, Mail, DollarSign, Pencil, CreditCard, ShieldCheck, Calculator, Building2 } from 'lucide-react';
import { getRentalDetail } from '@/app/(dashboardGroup)/_actions/tenant/rentalDetailActions';
import { StatusBadge } from '@/app/(dashboardGroup)/_components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type RequestDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: RequestDetailPageProps) {
  const { id } = await params;
  const result = await getRentalDetail(id);
  if (!result.success || !result.data) return { title: 'Request Not Found - RentNest' };
  return { title: `${result.data.property?.title || 'Request Details'} - RentNest` };
}

export default async function RequestDetailPage({ params }: RequestDetailPageProps) {
  const { id } = await params;
  const result = await getRentalDetail(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const rental = result.data;
  const property = rental.property;
  const latestPayment = rental.payments?.[0];

  const displayImage =
    property?.images?.[0] ||
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80';

  const isPending = rental.status === 'PENDING';
  const isApproved = rental.status === 'APPROVED';
  const isActive = rental.status === 'ACTIVE';
  const hasCompletedPayment = latestPayment?.status === 'COMPLETED';

  // Calculate rental duration in days and total estimated cost
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const start = new Date(rental.startDate);
  const end = new Date(rental.endDate);
  const totalDays = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / MS_PER_DAY));
  const dailyRate = (property?.price || 0) / 30;
  const totalAmount = Number((dailyRate * totalDays).toFixed(2));

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">

      {/* Back Navigation Link */}
      <Link
        href="/tenant-dashboard/requests"
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-slate-400 hover:text-[#CFA190] transition-colors uppercase tracking-wider"
      >
        <ArrowLeft className="size-4" />
        <span>Back to Applications</span>
      </Link>

      {/* Property Showcase Card */}
      {property && (
        <Card className="bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] shadow-md rounded-3xl overflow-hidden">
          <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-5">
            <div className="relative h-28 w-full sm:w-36 rounded-2xl overflow-hidden shrink-0 border border-gray-100 dark:border-slate-800">
              <Image src={displayImage} alt={property.title} fill className="object-cover" unoptimized />
              <Badge className="absolute top-2 left-2 bg-black/70 text-white font-bold text-[9px] uppercase">
                {property.category?.name || 'Rental'}
              </Badge>
            </div>

            <div className="min-w-0 flex-1 space-y-1.5 text-center sm:text-left w-full">
              <Link
                href={`/properties/${property.id}`}
                className="text-lg font-black text-[#222222] dark:text-white hover:text-[#CFA190] transition-colors truncate block"
              >
                {property.title}
              </Link>
              <div className="flex items-center justify-center sm:justify-start gap-1 text-xs text-gray-500 dark:text-slate-400">
                <MapPin className="size-3.5 text-[#CFA190] shrink-0" />
                <span className="truncate">{property.location}</span>
              </div>
              <div className="pt-1 flex items-baseline justify-center sm:justify-start gap-1">
                <span className="text-xl font-black text-[#CFA190]">${property.price.toLocaleString()}</span>
                <span className="text-xs text-gray-400">/ month</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Application Overview Card */}
      <Card className="bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] shadow-xl rounded-3xl">
        <CardHeader className="p-6 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 space-y-0 border-b border-gray-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] text-xs font-extrabold tracking-wider uppercase mb-1">
              <Building2 className="size-3.5" />
              <span>Application Summary</span>
            </div>
            <CardTitle className="text-2xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
              APPLICATION DETAILS
            </CardTitle>
          </div>

          <div className="flex items-center gap-3">
            <StatusBadge status={rental.status} />
            {isPending && (
              <Link href={`/tenant-dashboard/requests/${rental.id}/edit`}>
                <Button size="sm" variant="outline" className="border-[#CFA190] text-[#CFA190] hover:bg-[#fff5f5] dark:hover:bg-[#232733] font-bold rounded-xl text-xs gap-1.5 py-4">
                  <Pencil className="size-3.5" />
                  <span>Edit</span>
                </Button>
              </Link>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-2 space-y-6">

          {/* Lease Timeline Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase text-[#CFA190]">
                <CalendarDays className="size-4" />
                <span>Move-in Date</span>
              </div>
              <p className="text-base font-black text-[#222222] dark:text-white">
                {new Date(rental.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase text-[#CFA190]">
                <CalendarDays className="size-4" />
                <span>Move-out Date</span>
              </div>
              <p className="text-base font-black text-[#222222] dark:text-white">
                {new Date(rental.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Cost Calculation Summary */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#CFA190]/10 text-[#CFA190] flex items-center justify-center shrink-0">
                <Calculator className="size-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#222222] dark:text-white block">
                  Rental Duration: {totalDays} {totalDays === 1 ? 'Day' : 'Days'}
                </span>
                <span className="text-[10px] text-gray-500 block">
                  Based on monthly rate ${property?.price?.toLocaleString() || 0}/mo
                </span>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xl font-black text-[#CFA190]">${totalAmount.toLocaleString()}</span>
              <span className="text-[10px] text-gray-400 block font-semibold">Total Rent Cost</span>
            </div>
          </div>

          {/* Message Section */}
          {rental.message && (
            <div className="space-y-1.5">
              <span className="text-xs font-extrabold uppercase text-gray-400">Message Sent to Landlord</span>
              <div className="p-4 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] text-sm text-gray-600 dark:text-slate-300 italic">
                &ldquo;{rental.message}&rdquo;
              </div>
            </div>
          )}

          {/* Landlord Contact Info */}
          {property?.landlord && (
            <div className="space-y-2 pt-2">
              <span className="text-xs font-extrabold uppercase text-gray-400">Landlord Contact</span>
              <div className="flex items-center gap-3.5 p-4 mt-2 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440]">
                <div className="h-10 w-10 rounded-2xl bg-[#CFA190] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
                  {property.landlord.name?.[0]?.toUpperCase() || 'L'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-extrabold text-[#222222] dark:text-white truncate">{property.landlord.name}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                    <Mail className="size-3 text-[#CFA190]" />
                    <span className="truncate">{property.landlord.email}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Status Card */}
          {latestPayment && (
            <div className="space-y-2 pt-2">
              <span className="text-xs font-extrabold uppercase text-gray-400">Payment Status</span>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440]">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 flex items-center justify-center shrink-0">
                    <DollarSign className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-[#222222] dark:text-white">${latestPayment.amount.toLocaleString()}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-extrabold">{latestPayment.method} Checkout</p>
                  </div>
                </div>
                <StatusBadge status={latestPayment.status} />
              </div>
            </div>
          )}

        </CardContent>

        {/* Action Footer */}
        {isApproved && !hasCompletedPayment && (
          <CardFooter className="p-6 pt-0">
            <Link href={`/tenant-dashboard/requests/${rental.id}/pay`} className="w-full">
              <Button className="w-full bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-2xl py-6 cursor-pointer text-sm gap-2 shadow-lg transition-transform hover:-translate-y-0.5">
                <CreditCard className="size-4" />
                <span>Pay Now with Stripe</span>
              </Button>
            </Link>
          </CardFooter>
        )}

        {isActive && hasCompletedPayment && (
          <CardFooter className="p-6 pt-0">
            <div className="w-full p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center flex items-center justify-center gap-2 text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="size-4" />
              <span>Rental Active — Payment Verified</span>
            </div>
          </CardFooter>
        )}
      </Card>

    </div>
  );
}
