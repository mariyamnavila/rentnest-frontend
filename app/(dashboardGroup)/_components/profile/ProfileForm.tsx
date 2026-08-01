'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { Loader2, Save, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { updateProfile } from '../../_actions/profile/profileActions';
import { toast } from 'sonner';
import type { ProfileUser } from '../../_actions/profile/profileActions';

type ProfileFormProps = {
  user: ProfileUser;
};

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone || '');
  const [profileImage, setProfileImage] = useState(user.profileImage || '');

  const mutation = useMutation({
    mutationFn: () => updateProfile({ name, phone, profileImage }),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    },
  });

  const roleBadge = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400';
      case 'LANDLORD':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400';
      default:
        return 'bg-[#fff5f5] text-[#CFA190] dark:bg-[#232733]';
    }
  };

  return (
    <div className="space-y-6">

      {/* Avatar Section */}
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 rounded-2xl overflow-hidden border-2 border-[#e4e4e4] dark:border-[#2e3440] bg-[#f7f7f7] dark:bg-[#232733]">
          {profileImage ? (
            <Image unoptimized src={profileImage} alt={user.name} fill className="object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-2xl font-bold text-gray-400">
              <User className="size-8" />
            </div>
          )}
        </div>
        <div>
          <p className="text-lg font-black text-[#222222] dark:text-white">{user.name}</p>
          <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-lg text-[10px] font-bold ${roleBadge(user.role)}`}>
            {user.role}
          </span>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Email</label>
          <Input
            value={user.email}
            disabled
            className="h-11 rounded-xl border-[#e4e4e4] dark:border-[#2e3440] bg-[#f7f7f7] dark:bg-[#232733] text-sm font-medium text-gray-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Full Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 rounded-xl border-[#e4e4e4] dark:border-[#2e3440] bg-[#f7f7f7] dark:bg-[#232733] text-sm font-medium"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Phone</label>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Add phone number"
            className="h-11 rounded-xl border-[#e4e4e4] dark:border-[#2e3440] bg-[#f7f7f7] dark:bg-[#232733] text-sm font-medium"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Profile Image URL</label>
          <Input
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
            placeholder="https://example.com/photo.jpg"
            className="h-11 rounded-xl border-[#e4e4e4] dark:border-[#2e3440] bg-[#f7f7f7] dark:bg-[#232733] text-sm font-medium"
          />
        </div>
      </div>

      {/* Save Button */}
      <Button
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending || !name.trim()}
        className="h-11 px-6 rounded-xl bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold text-sm cursor-pointer gap-2"
      >
        {mutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
        Save Changes
      </Button>

      {/* Meta Info */}
      <div className="pt-4 border-t border-[#e4e4e4] dark:border-[#2e3440] space-y-1">
        <p className="text-[11px] text-gray-400">
          Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '—'}
        </p>
      </div>

    </div>
  );
}
