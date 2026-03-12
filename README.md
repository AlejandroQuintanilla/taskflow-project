# TaskFlow

Aplicación web para gestionar tareas personales de forma sencilla y visual.

## 🎯 ¿Qué hace la app?

TaskFlow permite al usuario organizar su día añadiendo, completando y eliminando tareas, con una vista de estadísticas en tiempo real que muestra el progreso.

## 🖼️ Diseño de la interfaz

El diseño se divide en cuatro secciones principales:

### ① Cabecera
Contiene el logo de la aplicación, los filtros de vista (Todas / Pendientes / Completadas) y un botón para activar el modo oscuro.

### ② Formulario de nueva tarea
Área principal de entrada con un campo de texto para escribir la tarea, un selector de prioridad (Alta / Media / Baja) y un botón para añadirla a la lista.

### ③ Lista de tareas
Muestra todas las tareas creadas. Cada tarea incluye:
- Checkbox para marcarla como completada (con tachado visual)
- Badge de prioridad con código de color
- Botón ✎ para editar el título (también con doble clic en escritorio)
- Botón ✕ para eliminarla

### ④ Panel de estadísticas
Panel lateral con métricas en tiempo real:
- Total de tareas creadas
- Número y porcentaje de tareas completadas (barra de progreso)
- Tareas pendientes
- Botón para completar todas las tareas
- Botón para borrar las completadas

## ✅ Acciones del usuario

| Acción | Descripción |
|---|---|
| Añadir tarea | Escribe un texto, elige prioridad y pulsa "Añadir" |
| Marcar completada | Pulsa el checkbox de la tarea |
| Eliminar tarea | Pulsa el botón ✕ de la tarea |
| Editar tarea | Pulsa el botón ✎ o haz doble clic en el texto |
| Filtrar tareas | Usa los filtros debajo del título de la lista |
| Buscar tareas | Escribe en el campo de búsqueda |
| Completar todas | Botón en el panel de estadísticas |
| Borrar completadas | Botón en el panel de estadísticas |
| Modo oscuro | Botón 🌙/☀️ en la cabecera |

## 🧪 Testing manual

Resultados de las pruebas realizadas sobre la aplicación:

| Prueba | Resultado |
|---|---|
| App con lista vacía | ✅ Muestra mensaje "No hay tareas que mostrar" |
| Añadir tarea sin título | ✅ El formulario no se envía (campo requerido) |
| Añadir tarea con título muy largo | ✅ El texto hace salto de línea correctamente |
| Marcar varias tareas como completadas | ✅ Se tachan y las estadísticas se actualizan |
| Eliminar varias tareas | ✅ Desaparecen y las estadísticas se actualizan |
| Recargar la página | ✅ Los datos persisten gracias a LocalStorage |
| Filtro "Pendientes" | ✅ Solo muestra tareas sin completar |
| Filtro "Completadas" | ✅ Solo muestra tareas completadas |
| Búsqueda por texto | ✅ Filtra las tareas en tiempo real |
| Editar tarea (botón ✎) | ✅ Funciona en escritorio y móvil |
| Editar tarea (doble clic) | ✅ Funciona en escritorio |
| Completar todas | ✅ Marca todas las tareas y actualiza estadísticas |
| Borrar completadas | ✅ Elimina solo las completadas |
| Modo oscuro | ✅ Cambia el tema y recuerda la preferencia al recargar |
| Responsive en móvil | ✅ El layout se adapta correctamente |

## 📁 Estructura del proyecto

```
taskflow-project/
├── docs/
│   └── design/
│       └── wireframe.html   # Wireframe interactivo de la interfaz
├── index.html               # Estructura HTML semántica
├── style.css                # Estilos con variables CSS + Tailwind CDN
├── app.js                   # Lógica JavaScript + LocalStorage
├── README.md
└── .gitignore
```

## 🛠️ Tecnologías

- HTML5 semántico
- CSS3 con variables y Flexbox
- Tailwind CSS (CDN) con modo oscuro
- JavaScript vanilla
- LocalStorage para persistencia de datos
