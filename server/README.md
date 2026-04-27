# TaskFlow — Backend API

Servidor REST construido con Node.js y Express que gestiona las tareas de la aplicación TaskFlow. Proporciona endpoints para crear, obtener y eliminar tareas, con validación de datos, manejo de errores y arquitectura por capas.

---

## Tecnologías

| Tecnología | Uso |
|------------|-----|
| Node.js | Entorno de ejecución del servidor |
| Express | Framework HTTP |
| CORS | Gestión de acceso entre dominios |
| dotenv | Variables de entorno |
| nodemon | Recarga automática en desarrollo |

---

## Arquitectura por capas

```
server/
├── .env                        # Variables de entorno (no se sube a GitHub)
├── package.json
└── src/
    ├── index.js                # Punto de entrada y configuración de Express
    ├── config/
    │   └── env.js              # Validación de variables de entorno
    ├── routes/
    │   └── task.routes.js      # Enrutamiento de la API
    ├── controllers/
    │   └── task.controller.js  # Controladores HTTP y validación
    └── services/
        └── task.service.js     # Lógica de negocio pura
```

**Capa de enrutamiento** — Mapea verbos HTTP a controladores. No contiene lógica.

**Capa de controladores** — Extrae datos de la petición, valida el formato y llama al servicio. Devuelve la respuesta HTTP con el código correcto.

**Capa de servicios** — Lógica de negocio pura. No conoce la existencia de Express ni HTTP.

---

## Instalación y ejecución en local

```bash
# Entrar en la carpeta del servidor
cd server

# Instalar dependencias
npm install

# Crear el archivo de variables de entorno
echo "PORT=3000" > .env

# Arrancar en modo desarrollo (con recarga automática)
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

---

## Variables de entorno

Crea un archivo `.env` en la carpeta `server/` con el siguiente contenido:

```
PORT=3000
```

El servidor se niega a arrancar si `PORT` no está definido:

```javascript
// src/config/env.js
require('dotenv').config();

if (!process.env.PORT) {
  throw new Error('El puerto no esta definido');
}

module.exports = { PORT: process.env.PORT };
```

---

## Middlewares

El servidor aplica los siguientes middlewares en orden:

```javascript
app.use(cors());           // Permite peticiones desde el frontend
app.use(express.json());   // Parsea el cuerpo de las peticiones como JSON
app.use(loggerAcademico);  // Registra método, URL, código y tiempo de respuesta
```

Logger personalizado:

```javascript
const loggerAcademico = (req, res, next) => {
  const inicio = Date.now();
  res.on('finish', () => {
    console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode} (${Date.now() - inicio}ms)`);
  });
  next();
};
```

---

## API REST

Base URL: `http://localhost:3000/api/v1`

### GET /tasks — Obtener todas las tareas

**Request:**
```
GET /api/v1/tasks
```

**Response 200:**
```json
[
  {
    "id": 1,
    "titulo": "Comprar pan",
    "completada": false,
    "prioridad": 1
  }
]
```

---

### POST /tasks — Crear una tarea

**Request:**
```
POST /api/v1/tasks
Content-Type: application/json

{
  "titulo": "Comprar pan",
  "prioridad": 1
}
```

**Response 201:**
```json
{
  "id": 1,
  "titulo": "Comprar pan",
  "completada": false,
  "prioridad": 1
}
```

**Response 400 — Título inválido:**
```json
{
  "error": "El titulo es obligatorio y debe tener al menos 3 caracteres."
}
```

**Response 400 — Prioridad inválida:**
```json
{
  "error": "La prioridad debe ser un numero positivo."
}
```

---

### DELETE /tasks/:id — Eliminar una tarea

**Request:**
```
DELETE /api/v1/tasks/1
```

**Response 204:** Sin cuerpo de respuesta.

**Response 404 — Tarea no encontrada:**
```json
{
  "error": "Tarea no encontrada"
}
```

---

## Códigos de estado

| Código | Significado | Cuándo se usa |
|--------|-------------|---------------|
| 200 | OK | GET con éxito |
| 201 | Created | POST con éxito |
| 204 | No Content | DELETE con éxito |
| 400 | Bad Request | Datos inválidos en el body |
| 404 | Not Found | Tarea no encontrada |
| 500 | Internal Server Error | Error inesperado del servidor |

---

## Manejo global de errores

Al final de `index.js` hay un middleware de 4 parámetros que captura todos los errores no controlados:

```javascript
app.use((err, req, res, next) => {
  if (err.message === 'NOT_FOUND') {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});
```

Si el error es `NOT_FOUND` devuelve 404. Para cualquier otro error devuelve 500 con un mensaje genérico, sin filtrar detalles técnicos al cliente.

El servicio lanza errores así:

```javascript
function eliminarTarea(id) {
  const index = tasks.findIndex(t => t.id === parseInt(id));
  if (index === -1) throw new Error('NOT_FOUND');
  tasks.splice(index, 1);
}
```

---

## Pruebas con Postman

Se probaron los siguientes casos con Postman:

| Petición | Body | Respuesta esperada |
|----------|------|--------------------|
| GET /api/v1/tasks | — | 200 con array |
| POST con título válido | `{ "titulo": "Comprar pan", "prioridad": 1 }` | 201 con tarea |
| POST con título corto | `{ "titulo": "ab", "prioridad": 1 }` | 400 con error |
| POST sin prioridad | `{ "titulo": "Tarea" }` | 400 con error |
| DELETE /api/v1/tasks/1 | — | 204 sin cuerpo |
| DELETE con ID inexistente | — | 404 con error |

---

## Despliegue en Vercel con Express

Vercel está diseñado para funciones serverless, pero se puede desplegar Express añadiendo un archivo `vercel.json` en la carpeta `server/`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/index.js"
    }
  ]
}
```

Luego en Vercel:
1. Importar el repositorio
2. Cambiar el **Root Directory** a `server`
3. Añadir la variable de entorno `PORT=3000` en el panel de Vercel
4. Desplegar

El backend estará disponible en una URL pública tipo `https://taskflow-server.vercel.app`

---

## Persistencia

Actualmente las tareas se almacenan en memoria (array en `task.service.js`). Al reiniciar el servidor los datos se pierden. En una versión futura se conectaría a una base de datos como MongoDB o PostgreSQL para persistencia real.
