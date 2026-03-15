# TaskFlow

TaskFlow es una aplicación web de gestión de tareas pensada para ser simple, rápida y fácil de usar.
Desde la interfaz puedes añadir tareas, organizarlas por prioridad, marcarlas como hechas, editarlas o eliminarlas cuando quieras.

Este proyecto nace como ejercicio práctico para afianzar conocimientos de **HTML, CSS y JavaScript**, así como el uso de **Git, GitHub y LocalStorage** en un proyecto real.

---

# Planificación y diseño

Antes de escribir una sola línea de código, se definió la estructura visual de la aplicación mediante un wireframe.

El prototipo fue elaborado en HTML y está disponible en el repositorio en la ruta:

```
docs/design/wireframe.html
```

La interfaz quedó dividida en cuatro bloques:

- **Cabecera:** nombre de la app y acceso rápido al modo oscuro
- **Formulario:** campo de texto y selector de prioridad para añadir tareas
- **Lista de tareas:** vista principal con filtros y buscador integrado
- **Panel lateral:** estadísticas actualizadas en tiempo real

---

# Qué puede hacer la aplicación

### Tareas

- Añadir una tarea con título y nivel de prioridad (Alta, Media o Baja)
- Marcar una tarea como completada
- Editar el título de cualquier tarea usando el botón ✎ o haciendo doble clic sobre el texto
- Eliminar tareas de forma individual

### Filtros y búsqueda

- Ver todas las tareas, solo las pendientes o solo las completadas
- Buscar tareas por palabras clave mientras se escribe

### Operaciones en bloque

- Marcar todas las tareas como completadas de una sola vez
- Eliminar de golpe todas las tareas que ya están completadas

### Estadísticas

El panel lateral muestra siempre:

- El número total de tareas
- Las tareas completadas, con barra de progreso y porcentaje
- Las tareas que quedan pendientes

### Guardado automático

Todo se guarda en **LocalStorage** sin necesidad de hacer nada. Al recargar la página, las tareas siguen ahí exactamente igual que se dejaron.

Más información sobre LocalStorage:
https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

### Modo oscuro

Se puede cambiar entre tema claro y oscuro desde el botón de la cabecera. La elección se recuerda entre sesiones y también respeta la configuración del sistema operativo del usuario.

### Adaptación a móvil

El diseño se reorganiza automáticamente en pantallas pequeñas: el formulario se apila en columna y el panel de estadísticas pasa a mostrarse debajo de la lista.

---

# Tecnologías

- **HTML5** — estructura semántica con etiquetas como `header`, `main`, `aside` y `footer`
- **CSS3** — variables, Flexbox y media queries para el responsive
- **Tailwind CSS** — clases de utilidad cargadas por CDN, con soporte de modo oscuro mediante `dark:`
- **JavaScript vanilla** — toda la lógica sin frameworks ni librerías externas
- **LocalStorage** — persistencia de tareas y preferencias del usuario
- **Git y GitHub** — control de versiones y repositorio remoto

---

# Estructura de archivos

```
taskflow-project/
│
├── index.html          ← estructura HTML semántica
├── style.css           ← estilos propios + integración con Tailwind
├── app.js              ← lógica completa de la aplicación
├── README.md
├── .gitignore
│
└── docs/
    └── design/
        └── wireframe.html  ← prototipo visual de la interfaz
```

---

# Pruebas realizadas

Se ha comprobado manualmente el funcionamiento de todas las partes de la aplicación.

### Añadir tareas

| Caso | Resultado |
|---|---|
| Añadir una tarea con título normal | ✅ Aparece en la lista con el badge de prioridad correcto |
| Añadir una tarea con un texto muy largo | ✅ El texto se adapta sin romper el diseño |
| Intentar enviar el formulario vacío | ✅ No se envía, el campo es obligatorio |

### Gestión de tareas

| Caso | Resultado |
|---|---|
| Marcar una tarea como completada | ✅ Se tacha visualmente y las estadísticas se actualizan |
| Editar con el botón ✎ | ✅ Funciona tanto en escritorio como en móvil |
| Editar haciendo doble clic | ✅ Funciona en escritorio |
| Pulsar Escape al editar | ✅ Se cancela la edición sin guardar |
| Eliminar una tarea | ✅ Desaparece y el panel de estadísticas se actualiza |

### Filtros y búsqueda

| Caso | Resultado |
|---|---|
| Cambiar entre filtros | ✅ La lista se actualiza correctamente en cada cambio |
| Escribir en el buscador | ✅ Las tareas se filtran en tiempo real |
| Combinar filtro y búsqueda | ✅ Ambos funcionan juntos sin conflictos |

### Operaciones en bloque

| Caso | Resultado |
|---|---|
| Completar todas | ✅ Todas las tareas se marcan y las estadísticas reflejan el cambio |
| Borrar completadas | ✅ Solo se eliminan las tareas ya completadas |

### Persistencia

| Caso | Resultado |
|---|---|
| Recargar la página | ✅ Las tareas siguen guardadas en LocalStorage |
| Recargar con modo oscuro activo | ✅ El tema se mantiene igual que se dejó |

### Responsive

Se probó la aplicación en distintos tamaños de pantalla usando las herramientas de desarrollo del navegador. La interfaz se adapta bien tanto en tablet como en móvil.

---

# Accesibilidad

Se han tenido en cuenta las siguientes buenas prácticas:

- HTML semántico en toda la estructura de la página
- Cada `input` tiene su `label` correctamente vinculada
- Solo existe un `h1`, y los encabezados siguen un orden jerárquico lógico
- Todos los botones tienen texto visible o un `aria-label` descriptivo
- La lista de tareas usa `aria-live` para notificar cambios a lectores de pantalla
- Todos los elementos interactivos son accesibles con el teclado
- El foco es visible al navegar con Tab

Más información sobre accesibilidad web:
https://www.w3.org/WAI/fundamentals/accessibility-intro/

---

# Despliegue

La aplicación se desplegará en **Vercel** conectando directamente el repositorio de GitHub. Cada vez que se suba un cambio a la rama `main`, Vercel redesplegará automáticamente.

Documentación de Vercel:
https://vercel.com/docs/deployments/git

La URL pública se añadirá aquí una vez completado el despliegue.

---

# Autor

Proyecto desarrollado como parte de las prácticas en **Corner Studio**.

## 🌐 Demo en vivo
https://taskflow-project-ten.vercel.app/

## Capturas de pantalla

