# Chuleta de anotaciones y excepciones — Leelify

Este archivo sirve como referencia rápida para las anotaciones `@...` y las excepciones utilizadas en el backend de Leelify.

## 1. ¿Qué es una anotación?

Una anotación añade información a una clase, método o parámetro. Spring lee esa información y configura parte del comportamiento automáticamente.

```java
@Service
public class AudiobookService {
}
```

`@Service` no es un comentario: Spring la utiliza cuando inicia la aplicación.

---

## 2. Anotaciones para organizar las capas

### `@Repository`

```java
@Repository
public class AudiobookDAO {
}
```

- Marca una clase que accede a la base de datos.
- Permite que Spring cree y administre el DAO.
- Se utiliza normalmente en las clases del paquete `dao`.

Import necesario:

```java
import org.springframework.stereotype.Repository;
```

### `@Service`

```java
@Service
public class AudiobookService {
}
```

- Marca una clase que contiene lógica de negocio.
- Conecta normalmente el controlador con el DAO.
- Aquí se colocan reglas, cálculos y comprobaciones.

Import:

```java
import org.springframework.stereotype.Service;
```

### `@RestController`

```java
@RestController
public class AudiobookController {
}
```

- Marca una clase que recibe peticiones HTTP.
- Convierte automáticamente los objetos Java devueltos en JSON.
- Se utiliza en clases del paquete `controller`.

Import:

```java
import org.springframework.web.bind.annotation.RestController;
```

### Resumen de capas

| Anotación | Capa habitual | Responsabilidad |
|---|---|---|
| `@Repository` | DAO | Consultar y modificar la base de datos |
| `@Service` | Servicio | Aplicar la lógica de la aplicación |
| `@RestController` | Controlador | Recibir peticiones y devolver respuestas |

Flujo habitual:

```text
React → Controller → Service → DAO → MySQL
```

---

## 3. Anotaciones de rutas HTTP

### `@RequestMapping`

Define la parte común de la URL de un controlador.

```java
@RequestMapping("/api/audiobooks")
```

### `@GetMapping`

Consulta información sin modificarla.

```java
@GetMapping
public List<AudiobookResponse> getAll() {
    return audiobookService.getAll();
}
```

Corresponde a:

```http
GET /api/audiobooks
```

### `@GetMapping("/{id}")`

Obtiene un dato concreto.

```java
@GetMapping("/{id}")
public AudiobookResponse getById(@PathVariable int id) {
    return audiobookService.getById(id);
}
```

### `@PostMapping`

Envía datos para crear un recurso o ejecutar una acción.

```java
@PostMapping
public AudiobookResponse create(@RequestBody AudiobookRequest request) {
    return audiobookService.create(request);
}
```

### `@PutMapping("/{id}")`

Actualiza un recurso existente.

```java
@PutMapping("/{id}")
public AudiobookResponse update(
        @PathVariable int id,
        @RequestBody AudiobookRequest request
) {
    return audiobookService.update(id, request);
}
```

### `@DeleteMapping("/{id}")`

Elimina un recurso.

```java
@DeleteMapping("/{id}")
public void delete(@PathVariable int id) {
    audiobookService.delete(id);
}
```

### Resumen HTTP

| Anotación | Método HTTP | Uso habitual |
|---|---|---|
| `@GetMapping` | GET | Consultar |
| `@PostMapping` | POST | Crear o enviar una acción |
| `@PutMapping` | PUT | Actualizar |
| `@DeleteMapping` | DELETE | Eliminar |

---

## 4. Anotaciones de parámetros

### `@RequestBody`

Convierte el JSON recibido en un objeto Java.

```java
public UserResponse login(@RequestBody LoginRequest request) {
}
```

### `@PathVariable`

Obtiene un valor incluido en la ruta.

```java
@GetMapping("/{id}")
public AudiobookResponse getById(@PathVariable int id) {
}
```

Para `/api/audiobooks/8`, `id` vale `8`.

### `@RequestParam`

Obtiene un valor de los parámetros de consulta.

```java
@GetMapping
public List<AudiobookResponse> getByGrade(@RequestParam int grade) {
}
```

Corresponde a:

```text
/api/audiobooks?grade=5
```

### `@Valid`

Ejecuta las validaciones del DTO antes de entrar en el método.

```java
public UserResponse register(
        @Valid @RequestBody RegisterRequest request
) {
}
```

Si los datos no son válidos, Spring devuelve normalmente `400 Bad Request`.

---

## 5. Anotaciones de validación

Estas anotaciones se colocan normalmente en los DTO de entrada.

### `@NotBlank`

No permite `null`, una cadena vacía ni solamente espacios.

```java
@NotBlank String title
```

### `@Email`

Comprueba que el texto tenga formato de email.

```java
@Email String email
```

### `@Size`

Controla el tamaño de textos o colecciones.

```java
@Size(min = 8, max = 128) String password
```

### `@Min` y `@Max`

Definen límites numéricos.

```java
@Min(1) @Max(12) int grade
```

### `@NotNull`

Impide que un objeto sea `null`, pero no comprueba si un texto está vacío.

```java
@NotNull Integer durationSeconds
```

### `@Positive` y `@PositiveOrZero`

```java
@Positive int durationSeconds
@PositiveOrZero int points
```

- `@Positive`: debe ser mayor que cero.
- `@PositiveOrZero`: puede ser cero, pero no negativo.

---

## 6. Configuración de Spring

### `@SpringBootApplication`

```java
@SpringBootApplication
public class LeelifyApplication {
}
```

- Marca la clase principal.
- Activa la configuración automática de Spring Boot.
- Hace que Spring busque componentes en `com.leelify` y sus subpaquetes.

### `@Configuration`

Marca una clase que contiene configuración de Spring.

```java
@Configuration
public class PasswordConfig {
}
```

### `@Bean`

Le pide a Spring que administre el objeto devuelto por un método.

```java
@Bean
PasswordEncoder passwordEncoder() {
    return unPasswordEncoder;
}
```

Después Spring puede entregar ese objeto mediante el constructor:

```java
public AuthService(PasswordEncoder passwordEncoder) {
    this.passwordEncoder = passwordEncoder;
}
```

### `@Override`

Es una anotación de Java, no de Spring. Indica que un método reemplaza uno definido en una clase padre o interfaz.

```java
@Override
public void addCorsMappings(CorsRegistry registry) {
}
```

Ayuda al compilador a detectar nombres o firmas incorrectas.

---

## 7. Respuestas y errores HTTP

### `@ResponseStatus`

Define el código HTTP de una respuesta.

```java
@ResponseStatus(HttpStatus.CREATED)
```

| Estado | Código | Significado |
|---|---:|---|
| `HttpStatus.OK` | 200 | Petición correcta |
| `HttpStatus.CREATED` | 201 | Recurso creado |
| `HttpStatus.NO_CONTENT` | 204 | Correcto, sin contenido de respuesta |
| `HttpStatus.BAD_REQUEST` | 400 | Datos enviados incorrectos |
| `HttpStatus.UNAUTHORIZED` | 401 | Credenciales incorrectas o ausentes |
| `HttpStatus.NOT_FOUND` | 404 | Recurso no encontrado |
| `HttpStatus.CONFLICT` | 409 | Conflicto, por ejemplo email duplicado |
| `HttpStatus.INTERNAL_SERVER_ERROR` | 500 | Error inesperado del servidor |

### `@RestControllerAdvice`

Marca una clase que puede gestionar excepciones producidas por todos los controladores.

```java
@RestControllerAdvice
public class ApiExceptionHandler {
}
```

### `@ExceptionHandler`

Indica qué excepción gestiona un método.

```java
@ExceptionHandler(DuplicateEmailException.class)
@ResponseStatus(HttpStatus.CONFLICT)
public Map<String, String> handleDuplicateEmail(
        DuplicateEmailException exception
) {
    return Map.of("message", exception.getMessage());
}
```

---

## 8. Excepciones: conceptos fundamentales

### Jerarquía simplificada

```text
Object
└── Throwable
    ├── Error
    └── Exception
        ├── SQLException
        └── RuntimeException
            ├── DuplicateEmailException
            ├── InvalidCredentialsException
            └── UserDataAccessException
```

### `throw`

Lanza una excepción concreta.

```java
throw new InvalidCredentialsException();
```

### `throws`

Declara que un método puede producir una excepción.

```java
private User mapUser(ResultSet resultSet) throws SQLException {
}
```

### `try` y `catch`

`try` contiene el código que puede fallar y `catch` decide qué hacer con el error.

```java
try {
    statement.executeUpdate();
} catch (SQLException exception) {
    throw new UserDataAccessException(
        "No se pudo guardar el usuario",
        exception
    );
}
```

### `RuntimeException`

- Es una excepción no comprobada.
- Java no obliga a capturarla en cada método.
- Puede subir desde el DAO hasta `ApiExceptionHandler`.

```java
public class AudiobookNotFoundException extends RuntimeException {
    public AudiobookNotFoundException(int id) {
        super("No existe el audiolibro " + id);
    }
}
```

### `SQLException`

- Representa errores producidos al trabajar con SQL/JDBC.
- Es una excepción comprobada.
- Java obliga a capturarla con `catch` o declararla con `throws`.

### `SQLIntegrityConstraintViolationException`

Es un tipo específico de `SQLException`. Puede aparecer cuando se incumple una restricción como `UNIQUE`, una clave foránea o algunas reglas de integridad.

```java
catch (SQLIntegrityConstraintViolationException exception) {
    throw new DuplicateEmailException(email, exception);
}
```

### Excepciones personalizadas de Leelify

| Excepción | Significado | Respuesta habitual |
|---|---|---|
| `DuplicateEmailException` | El email ya está registrado | 409 Conflict |
| `InvalidCredentialsException` | Email o contraseña incorrectos | 401 Unauthorized |
| `UserDataAccessException` | Falló una operación SQL de usuarios | 500 Internal Server Error |
| `AudiobookNotFoundException` | No existe el audiolibro solicitado | 404 Not Found |

No es necesario crear una excepción para cada línea que pueda fallar. Créala cuando la aplicación necesite reconocer y tratar una situación de forma diferente.

---

## 9. Inyección de dependencias mediante constructor

```java
private final AudiobookService audiobookService;

public AudiobookController(AudiobookService audiobookService) {
    this.audiobookService = audiobookService;
}
```

Esto no utiliza `new`. Spring encuentra `AudiobookService` por su anotación `@Service`, crea el objeto y lo entrega al controlador.

```text
Spring crea AudiobookDAO
        ↓
Spring lo entrega a AudiobookService
        ↓
Spring entrega AudiobookService a AudiobookController
```

Se recomienda la inyección por constructor porque las dependencias quedan claras y pueden declararse `final`.

---

## 10. Regla importante sobre paquetes y carpetas

La declaración `package` debe coincidir con la ubicación de la clase.

Si el archivo está aquí:

```text
src/main/java/com/leelify/exceptions/DuplicateEmailException.java
```

debe comenzar así:

```java
package com.leelify.exceptions;
```

Y se importa con:

```java
import com.leelify.exceptions.DuplicateEmailException;
```

Si está en `com/leelify/dao`, entonces debe declarar:

```java
package com.leelify.dao;
```

Mover el archivo en el explorador no actualiza necesariamente la línea `package` ni sus imports.

---

## 11. Plantilla rápida para Audiobook

```text
AudiobookController  @RestController
        ↓
AudiobookService     @Service
        ↓
AudiobookDAO         @Repository
        ↓
MySQL
```

Endpoint de ejemplo:

```java
@RestController
@RequestMapping("/api/audiobooks")
public class AudiobookController {

    private final AudiobookService audiobookService;

    public AudiobookController(AudiobookService audiobookService) {
        this.audiobookService = audiobookService;
    }

    @GetMapping
    public List<AudiobookResponse> getAll() {
        return audiobookService.getAll();
    }
}
```

Cuando aparezca una anotación nueva, puedes añadirla a esta chuleta con: significado, lugar habitual, import y un ejemplo pequeño.
