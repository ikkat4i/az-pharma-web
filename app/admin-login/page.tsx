'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LockKeyhole, Mail } from 'lucide-react';
import { createClient } from '@/lib/supabase/browser';

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('azupharma0@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError('');
    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) {
        console.error(loginError);

        const message = loginError.message || 'No se pudo iniciar sesión.';
        setError(message);
        return;
      }

      if (!data.user) {
        setError('Supabase no devolvió ningún usuario.');
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        console.error(profileError);
        await supabase.auth.signOut({ scope: 'local' });
        setError('No se pudo verificar el perfil del administrador.');
        return;
      }

      if (profile?.role !== 'admin') {
        await supabase.auth.signOut({ scope: 'local' });
        setError('Esta cuenta no tiene permisos de administrador.');
        return;
      }

      const nextPath =
        typeof window !== 'undefined'
          ? new URLSearchParams(window.location.search).get('next')
          : null;

      router.replace(
        nextPath?.startsWith('/') ? nextPath : '/dashboard',
      );

      router.refresh();
    } catch (caughtError) {
      console.error(caughtError);

      const message =
        caughtError instanceof Error
          ? caughtError.message
          : 'No se pudo conectar con el servicio de acceso.';

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-login-page">
      <form className="admin-login-card" onSubmit={submit}>
        <Link href="/" className="admin-login-back">
          ← Volver a la tienda
        </Link>

        <div className="admin-login-icon">
          <LockKeyhole />
        </div>

        <h1>Acceso administrativo</h1>

        <p>
          Inicio de sesión privado para el equipo de AZ+PHARMA.
          El acceso de clientes continúa separado.
        </p>

        <label>
          <span>Correo</span>

          <div>
            <Mail size={18} />

            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
        </label>

        <label>
          <span>Contraseña</span>

          <div>
            <LockKeyhole size={18} />

            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
        </label>

        {error && (
          <p className="admin-login-error">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading}>
          {loading
            ? 'Ingresando…'
            : 'Ingresar al dashboard'}
        </button>
      </form>
    </main>
  );
}