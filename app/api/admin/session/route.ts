import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ isAdmin: false });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    return NextResponse.json({
      isAdmin: profile?.role === 'admin',
      email: user.email ?? null,
    });
  } catch {
    return NextResponse.json({ isAdmin: false });
  }
}
