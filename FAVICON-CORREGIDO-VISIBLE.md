# Corrección del favicon

El problema era que el símbolo original medía aproximadamente 58×56 px y se
centraba sin ampliarse dentro de un lienzo de 512×512 px. Por eso en la pestaña
parecía un punto diminuto.

Esta versión:
- amplía el símbolo para ocupar aproximadamente 92 % del icono;
- genera favicon.ico en múltiples tamaños;
- actualiza icon.png, apple-icon.png y los iconos del manifest;
- cambia la versión de caché a `?v=7`.
