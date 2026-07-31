'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function AdminLogoutButton() {
  const router = useRouter();
  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/');
    router.refresh();
  }
  return <button type="button" className="admin-logout" onClick={logout}><LogOut />Cerrar sesión</button>;
}
