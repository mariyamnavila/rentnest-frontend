import { Suspense } from 'react';
import { LoginForm } from '../_components/LoginForm';
import { Loader2 } from 'lucide-react';

export const metadata = {
  title: 'Sign In - RentNest',
  description: 'Access your RentNest tenant, landlord, or admin account.',
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center p-8 text-[#CFA190]">
          <Loader2 className="size-8 animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
