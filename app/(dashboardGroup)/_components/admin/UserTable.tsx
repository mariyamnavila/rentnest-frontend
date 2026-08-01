'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { BanUnbanButton } from './BanUnbanButton';
import type { AdminUser } from '../../_actions/admin/adminActions';

type UserTableProps = {
  users: AdminUser[];
};

export function UserTable({ users }: UserTableProps) {
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? users.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      )
    : users;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 h-11 rounded-xl border-[#e4e4e4] dark:border-[#2e3440] bg-[#f7f7f7] dark:bg-[#232733] text-sm font-medium placeholder:text-gray-400"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-[#e4e4e4] dark:border-[#2e3440]">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#f7f7f7] dark:bg-[#232733] border-b border-[#e4e4e4] dark:border-[#2e3440]">
              <th className="py-3 px-5 text-[11px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider">User</th>
              <th className="py-3 px-5 text-[11px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Role</th>
              <th className="py-3 px-5 text-[11px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Status</th>
              <th className="py-3 px-5 text-[11px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Joined</th>
              <th className="py-3 px-5 text-[11px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e4e4e4] dark:divide-[#2e3440]">
            {filtered.map((user) => (
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
                  <span className={`inline-block px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                    user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400'
                    : user.role === 'LANDLORD' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400'
                    : 'bg-[#fff5f5] text-[#CFA190] dark:bg-[#232733]'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-3.5 px-5">
                  <span className={`inline-block px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                    user.status === 'BANNED'
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400'
                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-3.5 px-5 text-xs text-gray-500 dark:text-slate-400">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                </td>
                <td className="py-3.5 px-5 text-right">
                  {user.role !== 'ADMIN' && (
                    <BanUnbanButton userId={user.id} currentStatus={user.status} />
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="py-12 text-center text-sm text-gray-400">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
