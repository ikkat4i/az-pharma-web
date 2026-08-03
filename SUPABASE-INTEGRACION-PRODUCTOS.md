# Supabase integrado con productos y Dashboard

## Ya funciona en esta versión

- `/admin-login` inicia sesión con Supabase Auth.
- `/dashboard` verifica el rol `admin` desde el servidor.
- El catálogo público carga los productos desde la tabla `products`.
- El Dashboard permite guardar `price_usd` y `stock`.
- Los cambios se guardan en Supabase y se ven para todos los clientes.
- Si Supabase no responde, el catálogo utiliza temporalmente los productos del archivo local.

## Variables de Vercel

Agregar:

```env
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=TU_PUBLISHABLE_KEY
NEXT_PUBLIC_WHATSAPP_NUMBER=595973694377
```

Después hacer Redeploy.

## Probar

1. Abrir `/admin-login`.
2. Ingresar con `azupharma0@gmail.com`.
3. Abrir Dashboard > Inventario.
4. Cambiar un precio y presionar Guardar.
5. Abrir la tienda en incógnito para comprobar el nuevo valor.
