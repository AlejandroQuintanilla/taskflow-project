# TaskFlow 📋

> Organiza tu día, una tarea a la vez.

![TaskFlow](docs/screenshot.png)

🌐 **Demo en vivo:** https://taskflow-project-ten.vercel.app/

---

## Descripción

TaskFlow es una aplicación web de gestión de tareas construida con HTML, CSS y JavaScript vanilla en el frontend, y Node.js con Express en el backend. El proyecto evolucionó desde una app con LocalStorage hasta una arquitectura cliente-servidor completa con API REST.

---

## Características

- ✅ Añadir, editar y eliminar tareas
- ✅ Prioridad por tarea: Alta, Media o Baja
- ✅ Filtros: Todas, Pendientes, Completadas
- ✅ Búsqueda de tareas en tiempo real
- ✅ Completar todas las tareas de un clic
- ✅ Borrar todas las completadas
- ✅ Estadísticas: total, completadas, pendientes y porcentaje
- ✅ Modo oscuro con detección automática del sistema
- ✅ API REST con Express
- ✅ Estados de carga y error en la interfaz
- ✅ Diseño responsive para móvil, tablet y escritorio

---

## Tecnologías utilizadas

| Tecnología | Uso |
|------------|-----|
| HTML5 | Estructura semántica |
| CSS3 | Estilos propios, variables CSS, Flexbox |
| Tailwind CSS (CDN) | Clases utilitarias y modo oscuro |
| JavaScript (ES6+) | Lógica del frontend |
| Node.js | Entorno de ejecución del servidor |
| Express | Framework del servidor HTTP |
| CORS | Gestión de acceso entre dominios |
| dotenv | Variables de entorno |
| nodemon | Recarga automática en desarrollo |
| Git & GitHub | Control de versiones |
| Vercel | Despliegue en producción |

---

## Arquitectura del proyecto

```
taskflow-project/
├── index.html              # Estructura HTML semántica
├── style.css               # Estilos propios y variables CSS
├── app.js                  # Lógica del frontend
├── src/
│   └── api/
│       └── client.js       # Capa de comunicación con la API
├── server/                 # Backend completo
│   ├── .env                # Variables de entorno (no se sube a GitHub)
│   ├── package.json
│   └── src/
│       ├── index.js        # Punto de entrada del servidor
│       ├── config/
│       │   └── env.js      # Validación de variables de entorno
│       ├── routes/
│       │   └── task.routes.js      # Enrutamiento de la API
│       ├── controllers/
│       │   └── task.controller.js  # Controladores HTTP
│       └── services/
│           └── task.service.js     # Lógica de negocio
├── docs/
│   ├── backend-api.md      # Documentación de herramientas backend
│   ├── screenshot.png      # Captura de la interfaz
│   ├── design/
│   │   └── wireframe.html  # Wireframe inicial
│   └── ai/
│       ├── ai-comparison.md
│       ├── cursor-workflow.md
│       ├── prompt-engineering.md
│       ├── experiments.md
│       └── reflection.md
└── README.md
```

---

## Arquitectura por capas del backend

El backend sigue el patrón de arquitectura por capas con separación estricta de responsabilidades:

**Capa de enrutamiento** (`routes/`) — Escucha las peticiones HTTP y las dirige al controlador correspondiente. No contiene lógica.

**Capa de controladores** (`controllers/`) — Extrae los datos de la petición, valida el formato y llama al servicio. Formatea la respuesta HTTP con el código de estado correcto.

**Capa de servicios** (`services/`) — Contiene la lógica de negocio pura. No conoce la existencia de Express ni de HTTP.

---

## API REST

Base URL: `http://localhost:3000/api/v1`

| Método | Endpoint | Descripción | Código de éxito |
|--------|----------|-------------|-----------------|
| GET | /tasks | Obtener todas las tareas | 200 |
| POST | /tasks | Crear una nueva tarea | 201 |
| DELETE | /tasks/:id | Eliminar una tarea | 204 |

### Ejemplo de petición POST

```json
POST /api/v1/tasks
Content-Type: application/json

{
  "titulo": "Comprar pan",
  "prioridad": 1
}
```

### Ejemplo de respuesta

```json
{
  "id": 1,
  "titulo": "Comprar pan",
  "completada": false,
  "prioridad": 1
}
```

### Errores

| Código | Motivo |
|--------|--------|
| 400 | Datos inválidos (título muy corto o prioridad incorrecta) |
| 404 | Tarea no encontrada |
| 500 | Error interno del servidor |

---

## Middlewares

El servidor usa los siguientes middlewares en orden:

- `cors()` — Permite peticiones desde el frontend en otro origen
- `express.json()` — Parsea el cuerpo de las peticiones como JSON
- Logger personalizado — Registra método, URL, código de estado y tiempo de respuesta
- Manejador global de errores — Captura errores no controlados y devuelve respuestas semánticas

---

## Instalación y uso

### Frontend
```bash
git clone https://github.com/AlejandroQuintanilla/taskflow-project.git
cd taskflow-project
# Abre index.html con Live Server
```

### Backend
```bash
cd server
npm install
# Crea un archivo .env con PORT=3000
npm run dev
```

La API estará disponible en `http://localhost:3000/api/v1/tasks`

---

## Accesibilidad

Puntuación Lighthouse: **92/100**

- HTML semántico con `<header>`, `<main>`, `<aside>`, `<footer>`
- Labels asociados a todos los campos
- `aria-label` en botones sin texto descriptivo
- `aria-live` en la lista de tareas
- Navegación completa por teclado

---

## Despliegue

El frontend está desplegado en **Vercel** con integración continua desde GitHub.

🌐 https://taskflow-project-ten.vercel.app/

---

*Proyecto desarrollado durante las prácticas en Corner Studio — 2025*
