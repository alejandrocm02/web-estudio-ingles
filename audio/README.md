# Grabaciones de Listening

30 archivos MP3 mono, 24 kHz, 96 kbit/s. Los mismos archivos se sirven a todos
los dispositivos desde GitHub Pages; no se envían textos a un proveedor TTS.
Son voces sintéticas, no grabaciones humanas. Vocabulario conserva su botón de
pronunciación con las voces del dispositivo.

Generados localmente con [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M)
(modelo Apache-2.0) y [kokoro-onnx](https://github.com/thewh1teagle/kokoro-onnx)
(MIT), voces `af_heart` y `bf_emma`. No se distribuyen pesos del modelo.
El archivo `manifest.json` registra voz, duración, tamaño y hashes SHA-256 de
cada guion y MP3. Los guiones pertenecen al currículo de este repositorio.

Reproducción del proceso: instalar en un directorio de trabajo externo al sitio
`kokoro-onnx==0.4.9`, `soundfile==0.13.1`, `lameenc==1.8.1`; descargar
`kokoro-v1.0.onnx` y `voices-v1.0.bin` de la publicación `model-files-v1.1`
del repositorio kokoro-onnx; exportar las pistas como `tracks.json` y ejecutar
`tools/generate-listening.py --build-dir RUTA`. El generador divide frases para
evitar truncamiento y normaliza los picos. No se ejecuta durante las visitas.

SHA-256 modelo: `beb0d1848dee9a49da392cc3df26958d46cfa35d321edf434f52949153f0df3a`.
SHA-256 voces: `bca610b8308e8d99f32e6fe4197e7ec01679264efed0cac9140fe9c29f1fbf7d`.

Las pruebas verifican integridad, correspondencia con el guion, decodificación,
señal audible, reproducción, pausa, velocidad, transcripción y errores de carga.
La valoración pedagógica de pronunciación requiere además escucha humana.
