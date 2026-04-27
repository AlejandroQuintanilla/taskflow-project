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

## Estructura del proyecto

```
taskflow-project/
├── index.html              # Estructura HTML semántica
├── style.css               # Estilos propios y variables CSS
├── app.js                  # Lógica del frontend
├── src/
│   └── api/
│       └── client.js       # Capa de comunicación con la API
├── server/                 # Backend completo
│   ├── README.md           # Documentación del backend
│   ├── .env                # Variables de entorno (no se sube a GitHub)
│   ├── package.json
│   └── src/
│       ├── index.js        # Punto de entrada del servidor
│       ├── config/
│       │   └── env.js      # Validación de variables de entorno
│       ├── routes/
│       │   └── task.routes.js
│       ├── controllers/
│       │   └── task.controller.js
│       └── services/
│           └── task.service.js
├── docs/
│   ├── backend-api.md
│   ├── screenshot.png
│   ├── design/
│   │   └── wireframe.html
│   └── ai/
│       ├── ai-comparison.md
│       ├── cursor-workflow.md
│       ├── prompt-engineering.md
│       ├── experiments.md
│       └── reflection.md
└── README.md
```

---

## Cómo descargar el proyecto

```bash
git clone https://github.com/AlejandroQuintanilla/taskflow-project.git
cd taskflow-project
```

---

## Cómo ejecutar en local

### Frontend

1. Abre la carpeta `taskflow-project` en VS Code
2. Instala la extensión **Live Server**
3. Haz clic en **"Go Live"** abajo a la derecha
4. Se abrirá automáticamente en `http://127.0.0.1:5500/index.html`

### Backend

```bash
# Entrar en la carpeta del servidor
cd server

# Instalar dependencias
npm install

# Crear el archivo de variables de entorno
echo "PORT=3000" > .env

# Arrancar el servidor en modo desarrollo
npm run dev
```

El servidor estará disponible en `http://localhost:3000/api/v1/tasks`

> El frontend consume la API en `http://localhost:3000`. Asegúrate de que el servidor está corriendo antes de usar la aplicación.

---

## Cómo desplegar en Vercel con Express

### Frontend

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con GitHub
2. Haz clic en **Add New Project**
3. Importa el repositorio `taskflow-project`
4. Deja el directorio raíz en `./`
5. Haz clic en **Deploy**

### Backend

1. En Vercel crea un nuevo proyecto
2. Importa el mismo repositorio
3. Cambia el **Root Directory** a `server`
4. Añade la variable de entorno `PORT=3000`
5. Añade un archivo `server/vercel.json`:

```json
{
  "version": 2,
  "builds": [{ "src": "src/index.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "src/index.js" }]
}
```

6. Haz clic en **Deploy**

Una vez desplegado, actualiza la URL de la API en `src/api/client.js` con la URL pública de Vercel.

---

## API REST

La documentación completa de la API está en [server/README.md](server/README.md).

Base URL local: `http://localhost:3000/api/v1`

| Método | Endpoint | Descripción | Código |
|--------|----------|-------------|--------|
| GET | /tasks | Obtener todas las tareas | 200 |
| POST | /tasks | Crear una nueva tarea | 201 |
| DELETE | /tasks/:id | Eliminar una tarea | 204 |

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

*Proyecto desarrollado durante las prácticas en Corner Studio — Alejandro Quintanilla — 2026*
