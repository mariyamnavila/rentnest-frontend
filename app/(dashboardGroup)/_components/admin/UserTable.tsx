'use client';

import { useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Image from 'next/image';
import { Search, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BanUnbanButton } from './BanUnbanButton';
import type { AdminUser, AdminUserMeta } from '../../_actions/admin/adminActions';

type UserTableProps = {
  users: AdminUser[];
  meta: AdminUserMeta | null;
};

export function UserTable({ users, meta }: UserTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (value: string) => {
    if (debouncedReference.current) {
      clearTimeout(debouncedReference.current);
    }

    debouncedReference.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set('search', value);
      } else {
        params.delete('search');
      }

      params.delete('page');

      router.replace(`${pathname}?${params.toString()}`);
    }, 500);
  };

  const handleClear = () => {
    if (debouncedReference.current) {
      clearTimeout(debouncedReference.current);
    }

    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    params.delete('page');

    router.replace(`${pathname}?${params.toString()}`);
  };

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`?${params.toString()}`);
  };

  const currentPage = meta?.page || 1;
  const totalPages = meta?.totalPages || 1;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
        <Input
          defaultValue={searchParams.get('search') ?? ''}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search by name, email, or role..."
          className="pl-10 pr-10 h-11 rounded-xl border-[#e4e4e4] dark:border-[#2e3440] bg-[#f7f7f7] dark:bg-[#232733] text-sm font-medium placeholder:text-gray-400"
        />
        {searchParams.get('search') && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#2e3440] transition-colors cursor-pointer"
          >
            <X className="size-3.5 text-gray-400" />
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-[#e4e4e4] dark:border-[#2e3440]">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#f7f7f7] dark:bg-[#232733] border-b border-[#e4e4e4] dark:border-[#2e3440]">
              <th className="py-3 px-5 text-[11px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider">User</th>
              <th className="py-3 px-5 text-[11px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Role</th>
              <th className="py-3 px-5 text-[11px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Status</th>
              <th className="py-3 px-5 text-[11px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider min-w-32.5 whitespace-nowrap">Joined</th>
              <th className="py-3 px-5 text-[11px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e4e4e4] dark:divide-[#2e3440]">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-[#fff5f5]/50 dark:hover:bg-[#232733]/50 transition-colors">
                <td className="py-3.5 px-5">
                  <div className="flex items-center gap-3">
                    <div className="relative h-9 w-9 rounded-xl overflow-hidden shrink-0 border border-gray-200 dark:border-slate-700 bg-[#f7f7f7] dark:bg-[#232733]">
                      {user.profileImage ? (
                        <Image unoptimized src={user.profileImage} alt={user.name} fill className="object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-xs font-bold text-gray-400">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#222222] dark:text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-5">
                  <span className={`inline-block px-2 py-0.5 rounded-lg text-[10px] font-bold ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400'
                      : user.role === 'LANDLORD' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400'
                        : 'bg-[#fff5f5] text-[#CFA190] dark:bg-[#232733]'
                    }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-3.5 px-5">
                  <span className={`inline-block px-2 py-0.5 rounded-lg text-[10px] font-bold ${user.status === 'BANNED'
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400'
                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                    }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-3.5 px-5 text-xs text-gray-500 dark:text-slate-400 min-w-32.5 whitespace-nowrap">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                </td>
                <td className="py-3.5 px-5 text-right">
                  {user.role !== 'ADMIN' && (
                    <BanUnbanButton userId={user.id} currentStatus={user.status} />
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="py-12 text-center text-sm text-gray-400">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Showing {(currentPage - 1) * meta.limit + 1}–{Math.min(currentPage * meta.limit, meta.total)} of {meta.total}
          </p>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 w-8 rounded-xl border-[#e4e4e4] dark:border-[#2e3440] p-0 cursor-pointer"
            >
              <ChevronLeft className="size-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                size="sm"
                variant={p === currentPage ? 'default' : 'outline'}
                onClick={() => goToPage(p)}
                className={`h-8 w-8 rounded-xl text-xs font-bold p-0 cursor-pointer ${p === currentPage
                    ? 'bg-[#CFA190] hover:bg-[#C08E82] text-white border-0'
                    : 'border-[#e4e4e4] dark:border-[#2e3440] text-gray-500'
                  }`}
              >
                {p}
              </Button>
            ))}
            <Button
              size="sm"
              variant="outline"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-8 w-8 rounded-xl border-[#e4e4e4] dark:border-[#2e3440] p-0 cursor-pointer"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
