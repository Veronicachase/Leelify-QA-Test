# Seguimiento de Leelify

Plan actualizado el 28 de septiembre de 2026. Se trabaja paso a paso con la usuaria.

## Avances de las sesiones anteriores

- [x] Enlace «Sigue explorando» del home a audiolibros.
- [x] Página de audiolibros con el catálogo completo.
- [x] Página inicial de vídeos con carga de contenidos VIDEO.
- [x] Conectar AllVideos con el componente Videos, ahora en `front/src/components/videos/videos.tsx`, y separar `videos.css`.
- [x] Mostrar vídeos en una columna con desplazamiento y `scroll-snap-type: y mandatory`.
- [x] Corregir enlaces de vídeo en la base de datos: la usuaria confirma que ya se reproducen. Los contenidos 5, 6, 7, 8 y 9 se actualizaron con el mismo archivo para las pruebas.
- [x] Crear `content_likes` con `user_id`, `content_id`, fecha automática, clave primaria compuesta y referencias a usuarios y contenidos.
- [x] Insertar y consultar un like de prueba: usuario 3, contenido 6.
- [x] Crear ContentLikeDAO: consultar, añadir sin duplicados y quitar likes.
- [x] Crear ContentLikeService con comprobación de existencia del contenido.
- [x] Crear ContentLikeController con GET, PUT y DELETE en `/api/me/contents/{contentId}/like`; usuario obtenido del JWT.
- [x] Corregir los errores de sintaxis. La usuaria confirma que `./mvnw.cmd compile` termina correctamente. Aún no se han probado las peticiones HTTP de likes.

## Punto exacto para retomar mañana: likes

1. [ ] Arrancar/reiniciar el backend y probar con un usuario autenticado las peticiones GET, PUT y DELETE del like. PUT y DELETE responden 204, sin cuerpo; GET devuelve un booleano.
2. [ ] Comprobar que añadir dos veces no duplica el like, quitarlo funciona y volver a consultar refleja el cambio. Usar el usuario correspondiente al token; el like de prueba pertenece al usuario 3 y al contenido 6.
3. [ ] Crear el servicio del frontend para consultar, añadir y quitar likes, enviando `Authorization: Bearer ...`. No llamar a `response.json()` en respuestas 204.
4. [ ] Crear el componente reutilizable del botón de like: recibir contentId, cargar su estado, cambiar corazón al guardar/quitar, gestionar carga y errores y evitar clics simultáneos. Definir qué mostrar cuando no haya sesión.
5. [ ] Integrarlo en audiolibros y vídeos y comprobar que el estado persiste al recargar y es independiente para cada usuario/contenido.
6. [ ] Guardar el SQL de creación de `content_likes` en el proyecto para poder reproducir la instalación; por ahora la tabla se creó manualmente en Workbench.

## Orden de trabajo acordado

1. [ ] Cerrar la revisión de reels: confirmar en móvil y escritorio altura, desplazamiento, reproducción del visible y pausa del anterior. Se utilizan `components/videos/videos.tsx` y `components/home/contentPlayer.tsx`. Los controles nativos que aparecen al tocar se aceptaron por ahora; no hace falta crear una barra propia.
2. [ ] Terminar likes: backend compilado; faltan las pruebas HTTP y la conexión con el frontend detalladas arriba. Es el siguiente trabajo al retomar.
3. [ ] Tests/juegos basados en datos: variar preguntas e imágenes por tema, nivel y contenido; separar el banco de preguntas de la interfaz. Concretar selección, respuestas y feedback con la usuaria.
4. [ ] Navegación compartida: añadir navegación inferior (actualmente solo en tests), con iconos y enlaces; corregir el nav que salta de línea mediante menú hamburguesa y título. Revisar escritorio y móvil juntos.
5. [ ] Puntajes y rankings: definir reglas de puntos, evitar duplicaciones por reintentos, persistir resultados y mostrar clasificación según los criterios que se acuerden.

## Pendientes anteriores (sin fecha)

- [ ] Sincronizar el estado de PlayPause con los eventos reales de reproducción, pausa y finalización, y gestionar errores de play().
- [ ] Confirmar el src del elemento de vídeo en PlayPause: se indicó cambiar src="{mediaUrl" por src={mediaUrl}; comprobar el estado actual antes de repetir instrucciones.
- [ ] Conectar la barra de progreso al tiempo reproducido, comunicar cambios al estado de la página y guardar avances con PUT `/api/me/contents/{contentId}/progress`. Actualmente está comprobada la lectura de currentTime, pero no se ha completado el circuito hasta estado y base de datos. Incluir el destacado y las páginas completas; diferenciar visualización inmediata de persistencia.
- [ ] Revisar que las duraciones guardadas coincidan con los archivos: en una captura el destacado decía 1 minuto y el reproductor mostraba 2:44. El backend rechaza progressSeconds superiores a durationSeconds.
- [ ] Probar en el navegador la recuperación de sesión: reiniciar backend, iniciar sesión, recargar home y comprobar usuario y progreso. Los cambios de renovación ya se implementaron; la comprobación manual se aplazó.
- [ ] Revisar las reglas globales de juegos, especialmente `main`, que afectan al home y otras vistas; limitar estilos a sus componentes al trabajar la navegación.

## Forma de trabajo acordada

La usuaria quiere aprender haciendo los cambios ella misma. Explicar una corrección
o paso cada vez y esperar antes de avanzar. No modificar código ni ejecutar
comandos salvo petición expresa. Las revisiones solicitadas permiten leer los
archivos necesarios, sin editarlos. Esta lista se crea por petición expresa para
llevar el control; no implica implementar todavía sus tareas.
