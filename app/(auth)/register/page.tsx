import { Suspense } from 'react';
import { RegisterForm } from '../_components/RegisterForm';
import { Loader2 } from 'lucide-react';

export const metadata = {
  title: 'Register - RentNest',
  description: 'Create your RentNest tenant or landlord account.',
};

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center p-8 text-[#CFA190]">
          <Loader2 className="size-8 animate-spin" />
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
