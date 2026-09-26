# Seguimiento de Leelify

Plan actualizado el 26 de septiembre de 2026. Se trabaja paso a paso con la usuaria.

## Avances de las sesiones anteriores

- [x] Enlace «Sigue explorando» del home a audiolibros.
- [x] Página de audiolibros con el catálogo completo.
- [x] Página inicial de vídeos con carga de contenidos VIDEO.

## Orden de trabajo acordado

1. [ ] Vídeos tipo reels: desplazamiento vertical, ajuste por vídeo, reproducción del visible, pausa del anterior y controles de sonido. Revisar y aprovechar components/home/videos.tsx y ContentPlayer antes de duplicar componentes.
2. [ ] Likes reutilizables: revisar esquema, definir relación usuario-contenido, endpoints y estado del botón. Los cambios de base de datos se abordan en esta etapa, no durante reels.
3. [ ] Tests/juegos basados en datos: variar preguntas e imágenes por tema, nivel y contenido; separar el banco de preguntas de la interfaz. Concretar selección, respuestas y feedback con la usuaria.
4. [ ] Navegación compartida: añadir navegación inferior (actualmente solo en tests), con iconos y enlaces; corregir el nav que salta de línea mediante menú hamburguesa y título. Revisar escritorio y móvil juntos.
5. [ ] Puntajes y rankings: definir reglas de puntos, evitar duplicaciones por reintentos, persistir resultados y mostrar clasificación según los criterios que se acuerden.

## Pendientes anteriores (sin fecha)

- [ ] Sincronizar el estado de PlayPause con los eventos reales de reproducción, pausa y finalización, y gestionar errores de play().
- [ ] Revisar el src del elemento de vídeo en PlayPause: en la última lectura aparecía src="{mediaUrl"; debe ser src={mediaUrl}.
- [ ] Conectar la barra de progreso al tiempo reproducido y guardar los avances en el backend.
- [ ] Probar en el navegador la recuperación de sesión: reiniciar backend, iniciar sesión, recargar home y comprobar usuario y progreso. Los cambios de renovación ya se implementaron; la comprobación manual se aplazó.

## Forma de trabajo acordada

La usuaria quiere aprender haciendo los cambios ella misma. Explicar una corrección
o paso cada vez y esperar antes de avanzar. No modificar código ni ejecutar
comandos salvo petición expresa. Las revisiones solicitadas permiten leer los
archivos necesarios, sin editarlos. Esta lista se crea por petición expresa para
llevar el control; no implica implementar todavía sus tareas.
