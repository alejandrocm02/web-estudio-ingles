# Estado de StudyEnglish · 5 de octubre de 2026

## Publicado

- PR #11 y #12: currículo ampliado, perfiles locales, copias y repaso de fallos.
- PR #13, main a14b5f9: ruta orientativa, repaso espaciado, historial por tema,
  ajustes de contraste y CI en Chromium/WebKit.
- PR #14, main 3f322d8: 30 MP3 fijos con transcripción y controles accesibles.
  Las 17 regresiones y 24 comprobaciones de navegador pasan en Linux CI,
  incluidos los reintentos tras un fallo de red en WebKit.
- 1.594 entradas de vocabulario, 120 preguntas de tests, 22 lecturas y 96 preguntas.

## Preparado en esta rama, todavía sin publicar

- Cuenta de StudyEnglish, cliente Supabase fijado en 2.117.2, caché por UID,
  importación explícita con copia previa y sincronización con control de versiones.
- Recuperación y cambio de contraseña implementados; recorrido por correo pendiente.
- Pruebas de integridad de los 30 audios, reproducción, fallos, conflictos,
  reconexión y separación de cuentas simuladas.

## Infraestructura creada y comprobada

- Proyecto independiente StudyEnglish (vjghrnmunzbjvkhrauao), organización
  AlejandroCM, Free, París. Coste de creación confirmado: 0 USD/mes.
- CornerMaximo no se ha usado ni modificado.
- Tabla study_progress y función de guardado con revisión; RLS habilitado,
  sin acceso anónimo, USING y WITH CHECK para cada usuario.
- verify-isolation.sql pasa todos los asserts y revierte sus datos de prueba.
  Advisors de seguridad: ninguna incidencia.
- Redirección de autenticación a account.html de GitHub Pages configurada.
- Confirmación de correo permanece activada por decisión del titular.

## Pendiente antes de abrir el registro público

- Brevo gratuito creado: el panel indica 300 correos diarios; el titular ha
  verificado el teléfono y creado la clave SMTP. Supabase tiene SMTP guardado
  con smtp-relay.brevo.com, puerto 587 y nombre StudyEnglish. La clave se introdujo
  directamente en Supabase, sin incluirla en el chat ni en el repositorio.
- Remitente StudyEnglish añadido por separado y verificado por el titular mediante
  el código enviado por Brevo. El remitente CornerMaximo existente se conserva.
- El titular activó el bloqueo de IP no autorizadas para SMTP en Brevo, con
  lista permitida vacía. Falta identificar y autorizar la salida de Supabase.
- Verificar entrega de confirmación y recuperación y retorno a account.html.
- emailReady permanece false: altas y solicitud de recuperación desactivadas.
- Verificar acceso/sincronización reales en dos navegadores. El titular autorizó
  crear y eliminar dos cuentas de prueba, pero la revisión automática rechazó
  ejecutar la prueba porque exigía incluir la eliminación dentro de su proceso.
  Todas las cuentas temporales se eliminaron; ninguna prueba real de acceso pasó.
- Ejecutar CI en GitHub, revisar y publicar en el mismo Pages tras superar controles.

## Límites de verificación

- Preparación de cuentas: 25 pruebas de lógica/regresión y 24 comprobaciones
  de navegador pasan en Linux CI (ejecución 37286421040). Las pruebas de
  sincronización usan un servidor simulado; el aislamiento SQL se verificó en
  Supabase mediante una transacción que revierte todos los datos de prueba.
- En Windows, WebKit simula parte del sistema multimedia y no ofrece Web Audio:
  dos pruebas se omiten allí, pero se ejecutan en Linux en GitHub Actions.
- La auditoría axe y el teclado no sustituyen una sesión con VoiceOver/TalkBack/NVDA.
- La pronunciación pedagógica de las grabaciones necesita revisión humana adicional.
