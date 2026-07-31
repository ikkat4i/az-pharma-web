import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, adminCookieOptions, createAdminSession } from '@/lib/admin-auth';

export async function POST(request: Request) {
  const { email, password } = (await request.json()) as { email?: string; password?: string };
  const valid =
    Boolean(process.env.ADMIN_EMAIL) &&
    Boolean(process.env.ADMIN_PASSWORD) &&
    email?.trim().toLowerCase() === process.env.ADMIN_EMAIL?.trim().toLowerCase() &&
    password === process.env.ADMIN_PASSWORD;

  if (!valid) {
    return NextResponse.json({ ok: false, error: 'Correo o contraseña incorrectos.' }, { status: 401 });
  }

  try {
    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, createAdminSession(email!), adminCookieOptions);
    return response;
  } catch {
    return NextResponse.json({ ok: false, error: 'Falta configurar la sesión del administrador.' }, { status: 500 });
  }
}
