'use client';

import { createContext, useContext, useCallback, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMe } from '@/service/getMe';
import type { IUser, UserRole } from '@/lib/types';

type UserData = NonNullable<IUser['data']>;

type AuthContextType = {
  user: UserData | null;
  role: UserRole | undefined;
  isLoading: boolean;
  refetch: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const result = await getMe();
      return result;
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const refresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
  }, [queryClient]);

  const user = data?.data ?? null;
  const role = user?.role;

  return (
    <AuthContext.Provider value={{ user, role, isLoading, refetch: refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
