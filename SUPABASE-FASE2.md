# AZ+PHARMA — Fase 2: autenticación profesional

## Incluido en esta versión

- `/admin-login` separado del login de clientes.
- Protección del dashboard en el servidor.
- Sesiones con cookies administradas por Supabase.
- Rol `admin` comprobado en la tabla `profiles`.
- Cierre de sesión del administrador.
- Dashboard oculto en la navegación para visitantes.
- Esquema SQL de productos, stock, clientes y pedidos.

## Configuración

1. Crear un proyecto en Supabase.
2. Ejecutar `supabase/schema.sql` en **SQL Editor**.
3. En **Authentication > Users**, crear:
   - correo: `azupharma0@gmail.com`
   - contraseña temporal: la que elijas.
4. Ejecutar en SQL Editor:

```sql
update public.profiles
set role = 'admin'
where email = 'azupharma0@gmail.com';
```

5. En Vercel agregar:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
NEXT_PUBLIC_WHATSAPP_NUMBER=595973694377
```

6. Ejecutar localmente:

```powershell
npm.cmd install
npm.cmd run build
```

7. Subir:

```powershell
git add .
git commit -m "Add Supabase admin authentication"
git push
```

El login de clientes actual continúa separado; en una fase posterior puede migrarse también a Supabase Auth.
