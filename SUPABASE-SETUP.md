# AZ+PHARMA — Fase profesional con Supabase

Esta versión conserva la tienda publicada, el acceso administrativo y WhatsApp.
También elimina la mención de DINAVISA del pie de página.

## Próxima fase: base de datos real

Para activar productos, stock, pedidos, clientes e imágenes editables desde el dashboard:

1. Crear un proyecto en Supabase.
2. Abrir **SQL Editor** y ejecutar `supabase/schema.sql`.
3. Crear un bucket público llamado `product-images`.
4. Agregar en Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Crear el usuario administrador y asignarle `role = 'admin'` en `profiles`.

No publiques `SUPABASE_SERVICE_ROLE_KEY` en código cliente ni en GitHub.

## WhatsApp

Número configurado:
`595973694377`

Variable de Vercel:
`NEXT_PUBLIC_WHATSAPP_NUMBER=595973694377`
