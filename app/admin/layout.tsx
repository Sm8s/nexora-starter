import type { Metadata } from 'next';
import AdminShell from '@/components/AdminShell';

export const metadata: Metadata = { title: 'NEXORA · Admin' };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
