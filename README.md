# TaskFlow

Aplicación web para gestionar tareas personales de forma sencilla y visual.

## 🎯 ¿Qué hace la app?

TaskFlow permite al usuario organizar su día añadiendo, completando y eliminando tareas, con una vista de estadísticas en tiempo real que muestra el progreso.

## 🖼️ Diseño de la interfaz

El diseño se divide en cuatro secciones principales:

### ① Cabecera
Contiene el logo de la aplicación, los filtros de vista (Todas / Pendientes / Completadas) y un resumen rápido del estado actual (tareas completadas vs pendientes).

### ② Formulario de nueva tarea
Área principal de entrada con un campo de texto para escribir la tarea, un selector de prioridad (Alta / Media / Baja) y un botón para añadirla a la lista.

### ③ Lista de tareas
Muestra todas las tareas creadas. Cada tarea incluye:
- Checkbox para marcarla como completada (con tachado visual)
- Badge de prioridad con código de color
- Botón para eliminarla

### ④ Panel de estadísticas
Panel lateral con métricas en tiempo real:
- Total de tareas creadas
- Número y porcentaje de tareas completadas (barra de progreso)
- Gráfico de distribución por prioridad
- Tareas pendientes

## ✅ Acciones del usuario

| Acción | Descripción |
|---|---|
| Añadir tarea | Escribe un texto, elige prioridad y pulsa "Añadir" |
| Marcar completada | Pulsa el checkbox de la tarea |
| Eliminar tarea | Pulsa el botón ✕ de la tarea |
| Filtrar tareas | Usa los filtros de la cabecera o de la lista |
| Ver estadísticas | Panel lateral siempre visible con datos actualizados |

## 📁 Estructura del proyecto

```
taskflow-project/
├── docs/
│   └── design/
│       └── wireframe.html   # Wireframe interactivo de la interfaz
├── README.md
└── .gitignore
```

## 🛠️ Tecnologías previstas

- HTML5, CSS3, JavaScript vanilla
- Sin dependencias externas
