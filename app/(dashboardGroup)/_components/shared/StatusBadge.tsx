import { Badge } from '@/components/ui/badge';

type StatusBadgeProps = {
  status: string;
};

const statusStyles: Record<string, string> = {
  PENDING: 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/40 dark:border-amber-800',
  APPROVED: 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/40 dark:border-blue-800',
  REJECTED: 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/40 dark:border-rose-800',
  ACTIVE: 'bg-green-50 text-green-600 border-green-200 dark:bg-green-950/40 dark:border-green-800',
  COMPLETED: 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:border-gray-700',
  PENDING_PAYMENT: 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/40 dark:border-blue-800',
  COMPLETED_PAYMENT: 'bg-green-50 text-green-600 border-green-200 dark:bg-green-950/40 dark:border-green-800',
  FAILED_PAYMENT: 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/40 dark:border-rose-800',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const style = statusStyles[status] || 'bg-gray-100 text-gray-600 border-gray-200';

  return (
    <Badge
      variant="outline"
      className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 shrink-0 ${style}`}
    >
      {status.replace('_', ' ')}
    </Badge>
  );
}
