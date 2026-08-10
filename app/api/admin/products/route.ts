import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { ok: false, message: 'No hay una sesión de administrador activa.' },
        { status: 401 },
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError || profile?.role !== 'admin') {
      return NextResponse.json(
        { ok: false, message: 'No tenés permisos de administrador.' },
        { status: 403 },
      );
    }

    const body = await request.json();

    const id = Number(body.id);

    if (!Number.isFinite(id)) {
      return NextResponse.json(
        { ok: false, message: 'Producto inválido.' },
        { status: 400 },
      );
    }

    const databasePatch: {
      price_usd?: number | null;
      stock?: number;
      updated_at: string;
    } = {
      updated_at: new Date().toISOString(),
    };

    if ('priceUSD' in body) {
      databasePatch.price_usd =
        body.priceUSD === null || body.priceUSD === ''
          ? null
          : Number(body.priceUSD);
    }

    if ('stock' in body) {
      databasePatch.stock = Math.max(
        0,
        Math.trunc(Number(body.stock) || 0),
      );
    }

    const { data, error } = await supabase
      .from('products')
      .update(databasePatch)
      .eq('id', id)
      .select(
        'id,slug,laboratory,name,detail,presentation,benefit,usage,origin,image_path,badge,badge_tone,price_usd,stock,prescription',
      )
      .single();

    if (error) {
      console.error('Error actualizando producto:', error);

      return NextResponse.json(
        {
          ok: false,
          message: `Supabase no pudo actualizar el producto: ${error.message}`,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      product: data,
      message: 'Precio y stock actualizados correctamente.',
    });
  } catch (error) {
    console.error('Error en PATCH /api/admin/products:', error);

    return NextResponse.json(
      {
        ok: false,
        message: 'Ocurrió un error actualizando el producto.',
      },
      { status: 500 },
    );
  }
}