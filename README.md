# StudyEnglish

Sitio educativo estático publicado desde este repositorio en GitHub Pages:
https://alejandrocm02.github.io/web-estudio-ingles/

## Desarrollo y comprobaciones

Se necesita Node.js 20 o posterior para las pruebas. La web publicada no depende de Node ni de los paquetes de desarrollo.

```sh
npm ci
npm test
npx playwright install chromium webkit
npm run test:browser
node tests/server.cjs
```

Abre `http://localhost:8765`. Cada habilidad conserva su propia página HTML.
`data.js` contiene el currículo original; `curriculum-update.js` añade las ampliaciones.
`vocabulary.json` es la fuente de palabras. `script.js` implementa las actividades y
`progress-tools.js` permite descargar y restaurar progreso.

Los tests comprueban datos, los niveles de las seis secciones, la separación de perfiles,
el progreso de vocabulario, comprensión de Listening, repaso de errores y copias de progreso.
Listening usa 30 MP3 fijos; se verifican hashes, transcripciones, decodificación y reproducción. La pronunciación de vocabulario conserva la voz del dispositivo.

## Ruta, repaso e historial

`learn.html` ofrece una prueba orientativa de 18 preguntas, un nivel de ruta editable,
enlaces a las actividades de ese nivel y repaso de hasta diez palabras pendientes.
La prueba toma tres temas distintos por nivel cuando están disponibles; exige dos
aciertos de tres en niveles consecutivos para sugerir el siguiente punto de partida.
Es una orientación breve de gramática/vocabulario, no una certificación MCER.

Las palabras marcadas como aprendidas se incorporan al repaso al abrir la ruta.
Recordarlas programa revisiones a 1, 3, 7, 14, 30 y 60 días; un olvido vuelve a
programarlas a diez minutos. Los 2.000 intentos más recientes se conservan por
perfil, habilidad, nivel y tema, incluidos los aciertos posteriores. El historial
empieza con esta versión; los fallos antiguos no pueden reconstruirse.

`learning.js` valida y combina estos datos en las copias existentes. `study-plan.js`
implementa la interfaz y el registro de intentos. La prueba inicial no modifica
las mejores puntuaciones de los tests ni el progreso previo.

GitHub Actions ejecuta regresiones y pruebas de navegador en cada PR y en `main`:
Chromium de escritorio/móvil y WebKit móvil, orientación, persistencia, repaso,
foco del diálogo, anchura móvil y auditoría axe en claro/oscuro. La auditoría
automática no sustituye las pruebas manuales con lectores de pantalla reales.
La publicación sigue saliendo de `main` en el mismo GitHub Pages.

Consulta [el estado y las dependencias pendientes](docs/STATUS.md) antes de
activar cuentas o sustituir las voces del dispositivo.

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
## Grabaciones de Listening

Los mismos MP3 se reproducen en móvil y ordenador, con controles nativos, pausa,
velocidad, descarga y transcripción. Son voces sintéticas británica/americana
generadas localmente con Kokoro; no hay un servicio TTS durante las visitas.
Consulta audio/README.md para procedencia, licencias y reproducción del proceso.
