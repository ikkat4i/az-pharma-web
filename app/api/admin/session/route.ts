import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, verifyAdminSession } from '@/lib/admin-auth';

export async function GET() {
  const store = await cookies();
  return NextResponse.json({ isAdmin: verifyAdminSession(store.get(ADMIN_COOKIE)?.value) });
}
