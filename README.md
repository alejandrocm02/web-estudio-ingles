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
Listening usa 30 MP3 fijos; se verifican hashes, transcripciones, decodificación y reproducción. La pronunciación de vocabulario conserva la síntesis del dispositivo.

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
activar el registro público de cuentas.

## Progreso y perfiles

Los perfiles siguen siendo locales al navegador. La contraseña se deriva con PBKDF2,
pero no cifra los datos de estudio ni proporciona autenticación de servidor.
Las copias contienen únicamente progreso y respuestas; nunca credenciales o sesiones.
La restauración combina el avance con el perfil activo y conserva las respuestas locales
cuando existen en ambas copias.

Los audios previamente terminados se conservan como «escuchados». El indicador de
Listening mide ahora respuestas de comprensión correctas, en un campo separado.
Los índices originales de ejercicios y lecturas se mantienen para conservar el avance.

## Cuentas y sincronización

Proyecto independiente StudyEnglish en Supabase, organización AlejandroCM, plan Free.
La confirmación de correo se mantiene activada. El registro y la recuperación públicos
se controlan con emailReady en cloud.js; solo activarlo tras verificar SMTP y los enlaces.

account.html permite acceso, importación explícita del perfil local, sincronización y
cambio de contraseña. cloud.js separa cachés por UID y reintenta conflictos con revisión
del servidor. cloud-merge.js combina cambios respecto a la última versión confirmada;
conserva borrados, mejores notas y cambios independientes. Si dos dispositivos editan
la misma respuesta, prevalece el último cambio confirmado. Una copia local permite
reintentar la sincronización al recuperar conexión.

El servidor valida propiedad con RLS; solo se distribuye una clave publicable.
La biblioteca oficial Supabase 2.117.2 se sirve desde vendor, con licencia y versión
fijadas en el lockfile. supabase/verify-isolation.sql comprueba aislamiento y conflictos
y revierte todos sus datos de prueba. No se usa CornerMaximo.

Consulta audio/README.md para procedencia y generación de las grabaciones.
