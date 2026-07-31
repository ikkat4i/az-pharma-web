'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LockKeyhole, Mail } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('azupharma0@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'No se pudo iniciar sesión.');
        return;
      }
      router.replace('/dashboard');
      router.refresh();
    } catch {
      setError('No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-login-page">
      <form className="admin-login-card" onSubmit={submit}>
        <Link href="/" className="admin-login-back">← Volver a la tienda</Link>
        <div className="admin-login-icon"><LockKeyhole /></div>
        <h1>Acceso administrativo</h1>
        <p>Acceso exclusivo del administrador. El ingreso de clientes continúa separado en la tienda.</p>
        <label><span>Correo</span><div><Mail size={18}/><input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required /></div></label>
        <label><span>Contraseña</span><div><LockKeyhole size={18}/><input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required /></div></label>
        {error && <p className="admin-login-error">{error}</p>}
        <button type="submit" disabled={loading}>{loading ? 'Ingresando…' : 'Ingresar al dashboard'}</button>
      </form>
    </main>
  );
}
