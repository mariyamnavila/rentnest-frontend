import Link from 'next/link';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { getRentalDetail } from '@/app/(dashboardGroup)/_actions/tenant/rentalDetailActions';
import { RentalUpdateForm } from '@/app/(dashboardGroup)/_components/tenant/RentalUpdateForm';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditRentalRequestPage({ params }: PageProps) {
  const { id } = await params;

  const result = await getRentalDetail(id);

  const rental = result.data;

  if (!rental) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 space-y-4">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-rose-100 dark:bg-rose-950/40 text-rose-500 mb-2">
          <AlertTriangle className="size-6" />
        </div>
        <h1 className="text-lg font-black text-[#222222] dark:text-white uppercase">Request Not Found</h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 max-w-sm mx-auto">
          The rental request you are looking for does not exist or you do not have permission to view it.
        </p>
        <Link
          href="/tenant-dashboard/requests"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#CFA190] hover:underline"
        >
          <ArrowLeft className="size-3.5" />
          Back to Requests
        </Link>
      </div>
    );
  }

  if (rental.status !== 'PENDING') {
    const statusLabel = rental.status.charAt(0) + rental.status.slice(1).toLowerCase();

    return (
      <div className="max-w-2xl mx-auto text-center py-12 space-y-4">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-amber-100 dark:bg-amber-950/40 text-amber-500 mb-2">
          <AlertTriangle className="size-6" />
        </div>
        <h1 className="text-lg font-black text-[#222222] dark:text-white uppercase">Cannot Edit Request</h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 max-w-sm mx-auto">
          This request is currently <span className="font-bold text-[#222222] dark:text-white">{statusLabel}</span>. Only <span className="font-bold text-[#222222] dark:text-white">PENDING</span> requests can be edited.
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

  return (
    <RentalUpdateForm
      rentalId={rental.id}
      startDate={rental.startDate}
      endDate={rental.endDate}
      message={rental.message}
    />
  );
}
