# StudyEnglish

Sitio educativo estático publicado desde este repositorio en GitHub Pages:
https://alejandrocm02.github.io/web-estudio-ingles/

## Desarrollo y comprobaciones

Se necesita Node.js 20 o posterior para las pruebas. La web publicada no depende de Node ni de los paquetes de desarrollo.

```sh
npm ci
npm test
python3 -m http.server 8765
```

Abre `http://localhost:8765`. Cada habilidad conserva su propia página HTML.
`data.js` contiene el currículo original; `curriculum-update.js` añade las ampliaciones.
`vocabulary.json` es la fuente de palabras. `script.js` implementa las actividades y
`progress-tools.js` permite descargar y restaurar progreso.

Los tests comprueban datos, los niveles de las seis secciones, la separación de perfiles,
el progreso de vocabulario, comprensión de Listening, repaso de errores y copias de progreso.
La síntesis de voz se simula en las pruebas; su calidad real depende del navegador.

## Progreso y perfiles

Los perfiles siguen siendo locales al navegador. La contraseña se deriva con PBKDF2,
pero no cifra los datos de estudio ni proporciona autenticación de servidor.
Las copias contienen únicamente progreso y respuestas; nunca credenciales o sesiones.
La restauración combina el avance con el perfil activo y conserva las respuestas locales
cuando existen en ambas copias.

Los audios previamente terminados se conservan como «escuchados». El indicador de
Listening mide ahora respuestas de comprensión correctas, en un campo separado.
Los índices originales de ejercicios y lecturas se mantienen para conservar el avance.

## Pendiente: sincronización entre dispositivos

Aún no hay servicio de autenticación ni base de datos de StudyEnglish configurados.
Para activarlos hay que seleccionar un proyecto propio, confirmar su organización y
coste, configurar autenticación y recuperación, aislar cada usuario mediante políticas
RLS, migrar el progreso con confirmación del titular y probar sesiones en dos dispositivos.
El proyecto Supabase de CornerMaximo no se utiliza para esta web.
