# Herramientas del ecosistema backend

En este documento se explica qué son y para qué sirven las principales herramientas usadas en el desarrollo y documentación de APIs REST.

---

## Axios

Axios es una librería JavaScript para hacer peticiones HTTP tanto desde el navegador como desde Node.js. Es una alternativa a la API nativa `fetch` con algunas ventajas importantes.

### Por qué se usa

- Transforma automáticamente los datos JSON sin necesidad de llamar a `.json()`
- Maneja errores HTTP de forma más clara que fetch
- Permite configurar cabeceras globales, interceptores y timeouts fácilmente
- Funciona igual en el navegador y en Node.js

### Ejemplo

```javascript
// Con fetch (nativo)
const res = await fetch('http://localhost:3000/api/v1/tasks');
const data = await res.json();

// Con Axios
const { data } = await axios.get('http://localhost:3000/api/v1/tasks');
```

### Cuándo usarlo

Axios es especialmente útil en proyectos grandes donde se necesita gestionar muchas peticiones HTTP con configuraciones comunes, como cabeceras de autenticación o manejo centralizado de errores.

---

## Postman

Postman es una aplicación de escritorio y web que permite probar, documentar y compartir APIs REST de forma visual sin necesidad de escribir código.

### Por qué se usa

- Permite hacer peticiones GET, POST, PUT, PATCH y DELETE con cualquier cuerpo y cabeceras
- Guarda las peticiones en colecciones organizadas por proyecto
- Permite forzar errores intencionados para verificar que la API responde correctamente
- Genera documentación automática a partir de las colecciones
- Permite compartir colecciones con otros miembros del equipo

### Casos de uso en este proyecto

Se usó Postman para verificar que la API de TaskFlow respondía correctamente en los siguientes casos:

| Petición | Resultado esperado |
|----------|-------------------|
| GET /api/v1/tasks | 200 con array de tareas |
| POST con título válido | 201 con tarea creada |
| POST con título corto | 400 con mensaje de error |
| DELETE /api/v1/tasks/1 | 204 sin cuerpo |
| DELETE con ID inexistente | 404 con mensaje de error |

---

## Sentry

Sentry es una plataforma de monitorización de errores en tiempo real. Cuando una aplicación falla en producción, Sentry captura el error, lo registra con toda la información de contexto (stack trace, usuario, navegador, etc.) y envía una alerta al equipo de desarrollo.

### Por qué se usa

- Detecta errores en producción que no aparecen en desarrollo
- Proporciona el stack trace completo del error para poder reproducirlo
- Agrupa errores similares para no recibir miles de notificaciones por el mismo problema
- Permite asignar errores a desarrolladores específicos para su resolución
- Tiene integración con GitHub, Slack y otros servicios

### Por qué es importante

Sin Sentry, los errores en producción solo se detectan cuando un usuario los reporta. Con Sentry, el equipo de desarrollo los conoce antes que el usuario y puede actuar de forma proactiva.

### Ejemplo de integración en Express

```javascript
const Sentry = require('@sentry/node');

Sentry.init({ dsn: process.env.SENTRY_DSN });

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
```

---

## Swagger

Swagger (también conocido como OpenAPI) es un estándar para documentar APIs REST de forma estructurada y legible tanto por humanos como por máquinas.

### Por qué se usa

- Genera documentación interactiva de la API accesible desde el navegador
- Permite probar los endpoints directamente desde la documentación
- Define el contrato de la API de forma precisa: qué parámetros acepta, qué devuelve y qué errores puede producir
- Facilita la comunicación entre el equipo de backend y el equipo de frontend
- Es el estándar de la industria para documentar APIs

### Cómo funciona

Con la librería `swagger-ui-express` se puede montar una interfaz visual en una ruta del servidor, por ejemplo `/api/docs`, donde se muestra toda la documentación de la API de forma interactiva.

### Ejemplo de endpoint documentado con Swagger

```yaml
/api/v1/tasks:
  get:
    summary: Obtener todas las tareas
    responses:
      200:
        description: Lista de tareas
  post:
    summary: Crear una nueva tarea
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              titulo:
                type: string
                minLength: 3
              prioridad:
                type: number
                minimum: 1
    responses:
      201:
        description: Tarea creada
      400:
        description: Datos inválidos
```

### Diferencia con Postman

Postman se usa internamente por el equipo para probar la API durante el desarrollo. Swagger genera documentación pública que pueden consultar otros desarrolladores que quieran consumir la API.

---

## Resumen

| Herramienta | Para qué sirve |
|-------------|----------------|
| Axios | Hacer peticiones HTTP desde el cliente o servidor |
| Postman | Probar y documentar APIs durante el desarrollo |
| Sentry | Monitorizar errores en producción en tiempo real |
| Swagger | Documentar APIs de forma estándar e interactiva |
