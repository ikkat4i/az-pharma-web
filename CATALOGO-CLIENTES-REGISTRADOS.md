# Catálogo PDF para clientes registrados

Se agregó:

- favicon con el símbolo del logo de AZU+FARMA;
- icono para accesos directos de iPhone/iPad;
- catálogo oficial PDF dentro de `public/catalogos`;
- sección de descarga debajo del video de productos destacados;
- botón desbloqueado solamente cuando el cliente inició sesión;
- para visitantes, el botón abre el formulario de ingreso/registro;
- textos en español, portugués e inglés.

Archivo público:
`/catalogos/catalogo-oficial-azu-farma-2026.pdf`

La protección visual usa el sistema actual de clientes de la tienda. Para una
protección estricta del archivo en el servidor, el login de clientes debe
migrarse a Supabase Auth en la siguiente fase.
