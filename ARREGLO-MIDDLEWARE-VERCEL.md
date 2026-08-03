# Arreglo del error MIDDLEWARE_INVOCATION_FAILED

Se eliminó el middleware global que estaba provocando el error 500 en Vercel.

La seguridad del Dashboard continúa activa en:

- `app/dashboard/layout.tsx`

Ese layout comprueba:
1. que exista una sesión de Supabase;
2. que el perfil tenga `role = 'admin'`;
3. que los visitantes sean redirigidos a `/admin-login`.

Por lo tanto, quitar el middleware no deja público el Dashboard.
