import { redirect } from 'next/navigation';
import { requireAdminSession } from '@/lib/adminAuth';
import LoginForm from './LoginForm';

export default async function LoginPage() {
  if (await requireAdminSession()) redirect('/admin/quotes');
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}
