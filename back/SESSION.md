# Sesiones persistentes

Al iniciar el backend, Spring crea únicamente la tabla `refresh_sessions` si no
existe, mediante `src/main/resources/refresh-sessions.sql`. No modifica las tablas
existentes. El usuario de base de datos necesita permiso CREATE; si producción no
lo permite, ejecutar previamente ese script y definir `SPRING_SQL_INIT_MODE=never`.

Después de actualizar el backend, iniciar sesión una vez. Login establece una
cookie HttpOnly de siete días y devuelve el JWT de acceso de una hora. Solo se
guarda la huella SHA-256 del secreto de renovación en la base de datos. La sesión
tiene una duración absoluta de siete días, sin extensión al renovarla.

El frontend usa `credentials: include` y `X-Leelify-Request` en login, refresh y
logout. AuthContext restaura la sesión al arrancar y renueva el acceso antes de
caducar. Los datos de usuario y el JWT permanecen en memoria. Register conserva
su flujo actual: crear cuenta y navegar al login.

`POST /api/auth/refresh` devuelve 401 cuando falta la cookie, caduca la sesión o
desaparece el usuario. `POST /api/auth/logout` revoca la sesión del navegador y
elimina la cookie; los JWT de acceso ya emitidos conservan su validez hasta caducar.
Las sesiones expiradas se eliminan al crear nuevas sesiones.

## Configuración

- Local: frontend `http://localhost:5173`, backend `http://localhost:8080`.
  Usar el mismo hostname, sin mezclar localhost con 127.0.0.1.
- Producción: HTTPS y `AUTH_COOKIE_SECURE=true`.
- `FRONTEND_ORIGINS`: lista de orígenes exactos permitidos, separados por comas.
  No usar comodines. Frontend y API deben ser del mismo sitio para SameSite=Strict
  (por ejemplo app.example.com y api.example.com, ambos HTTPS).
- `app.auth.refresh-seconds`: duración de sesión, por defecto 604800 segundos.

El header personalizado obligatorio, junto con CORS restringido y SameSite=Strict,
protege las operaciones con cookie frente a solicitudes CSRF desde otros sitios.

## Verificación

Ejecutar `./mvnw.cmd test` en back y `npm run build --prefix front` desde la raíz.
En navegador: iniciar sesión, recargar Home y comprobar que se recuperan el usuario
y los progresos. Al invocar y esperar `logout()` desde el contexto, recargar debe
dejar la sesión cerrada. Un error de red al cerrar sesión se propaga para poder
mostrarlo y reintentar, sin simular que el servidor la ha revocado.
