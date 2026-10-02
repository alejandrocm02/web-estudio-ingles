# Estado de StudyEnglish · 29 de septiembre de 2026

## Base verificada

- `main` inicial: `5a49026`, PR #11 y #12 fusionados.
- 1.594 entradas de vocabulario combinadas y deduplicadas; 120 preguntas de tests.
- 22 lecturas, 96 preguntas de Reading y 30 pistas de Listening.
- 11 regresiones originales correctas; perfiles locales, copias y repaso de fallos de la ronda ya existían.
- GitHub Pages publica `/` de `main` en https://alejandrocm02.github.io/web-estudio-ingles/.

## Implementado en esta entrega

- Repaso espaciado con fechas persistentes y sesiones de hasta diez palabras.
- Historial por nivel, habilidad y tema de los últimos 2.000 intentos, incluidos aciertos posteriores.
- Prueba orientativa de 18 preguntas y ruta editable con actividades del nivel elegido.
- Exportación/restauración de estos datos, sin duplicar intentos al combinar copias.
- Pruebas automáticas en PR, Chromium/WebKit, móvil, teclado y axe en ambos temas.
- Contrastes corregidos y foco al avanzar entre preguntas.

## Pendiente: cuentas reales (prioridad 1)

No se ha creado ni conectado ningún proyecto Supabase. No se ha usado ni modificado
CornerMaximo. Solo se consultó el inventario de proyectos y organizaciones.
La organización disponible es **AlejandroCM**, plan **Free**. Falta que el titular
elija organización; después debe consultarse `get_cost` para esa organización y
confirmar el importe antes de crear **StudyEnglish**. No se presupone el coste.

Propuesta para la siguiente entrega:

1. Proyecto independiente `StudyEnglish`, región europea. Clave publicable en el
   cliente; ninguna clave secreta o `service_role` en GitHub Pages.
2. Supabase Auth con correo confirmado, acceso y recuperación por contraseña.
   Remitente SMTP propio: el correo de prueba solo admite miembros del equipo.
   Configurar redirecciones exactas a la ruta de recuperación de Pages.
3. Datos asociados a `auth.users.id`, RLS en cada tabla expuesta: lectura/escritura
   solo cuando `auth.uid() = user_id`; UPDATE con USING y WITH CHECK. Revocar acceso
   anónimo. Nunca autorizar mediante metadatos editables del usuario.
4. Mantener perfiles locales y ofrecer importación explícita del perfil activo,
   indicando origen y destino. No enviar hashes, sesiones ni otros perfiles.
   Guardar una copia previa a la migración.
5. Sincronización con versión de servidor y reintento de conflictos; combinar
   avances y deduplicar intentos. Separar la caché por UID, proteger cambios de
   sesión durante peticiones y mostrar estado sin conexión.
6. Verificar dos usuarios y dos navegadores: migración, altas, recuperación,
   cierre/cambio de sesión, aislamiento RLS, reconexión, edición simultánea y copias.
   Revisar advisors antes de activar en producción.

No marcar cuentas/sincronización como terminadas hasta verificar el recorrido real.

## Pendiente: audio estable (prioridad 2)

Las 30 pistas aún usan síntesis de voz del dispositivo. Transcripción, pausa,
velocidad y preguntas de comprensión ya existen. Falta seleccionar producción
(voz sintética de calidad o grabación humana), confirmar cualquier coste y disponer
de los archivos con permiso de publicación.

Integración prevista: archivos fijos versionados por pista en Pages, correspondencia
exacta con los guiones actuales, controles nativos de audio con nombre accesible,
velocidad, transcripción, fallo de carga anunciado y sin reproducción automática.
Conservar índices y separar «escuchado» de «comprensión superada». Comprobar
pronunciación, volumen, móvil y funcionamiento sin `speechSynthesis` antes de publicar.

## Pendiente de verificación humana

Prueba con VoiceOver/TalkBack/NVDA reales. Los tests automatizados comprueban
semántica, contraste, foco y recorridos; no equivalen a una sesión con esos lectores.
