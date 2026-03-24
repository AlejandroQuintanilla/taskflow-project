# Flujo de trabajo con Cursor

En este documento se documenta la experiencia usando Cursor como IDE asistido por IA: atajos de teclado más útiles, uso del chat contextual y ejemplos concretos donde Cursor mejoró el código del proyecto TaskFlow.

---

## Qué es Cursor

Cursor es un editor de código basado en VS Code que integra inteligencia artificial directamente en el flujo de desarrollo. Permite hacer preguntas sobre el código, generar funciones, refactorizar y añadir documentación sin salir del editor.

---

## Atajos de teclado más usados

| Atajo | Función |
|-------|---------|
| `Ctrl+Shift+E` | Abrir el explorador de archivos |
| `Ctrl+F` | Buscar texto dentro de un archivo |
| `Ctrl+K` | Edición inline con IA en el punto del cursor |
| `Ctrl+L` | Abrir el chat de IA |
| `Ctrl+Shift+P` | Abrir la paleta de comandos |
| `Ctrl+End` | Ir al final del archivo |
| `Tab` | Aceptar sugerencia del autocompletado |

---

## Chat contextual

El chat de Cursor tiene acceso al código del proyecto completo. Cuando se le hace una pregunta sobre una función, analiza el archivo y responde con contexto real del proyecto, no con ejemplos genéricos.

**Prompt usado:**
```
Explícame qué hace la función addTask en app.js
```

**Respuesta de Cursor:**

Cursor identificó que `addTask(title, priority)` realiza los siguientes pasos:

1. Valida que el título no esté vacío con `title.trim()`
2. Crea el objeto tarea llamando a `createTask(title, priority)`
3. Añade la tarea al array global `tasks`
4. Persiste los datos en LocalStorage con `saveTasks()`
5. Actualiza la interfaz con `renderTasks()`
6. Actualiza las estadísticas con `updateStats()`

La explicación fue precisa y útil para entender la arquitectura del proyecto.

---

## Edición inline con Ctrl+K

La edición inline permite pedirle a la IA que modifique una función concreta sin abrir el chat. Se coloca el cursor dentro de la función, se pulsa `Ctrl+K` y se escribe la instrucción.

**Ejemplo — Añadir comentario JSDoc a addTask:**

Con el cursor dentro de la función `addTask`, se pulsó `Ctrl+K` y se escribió:
```
Añade un comentario JSDoc a esta función
```

Cursor generó automáticamente:
```javascript
/**
 * Añade una nueva tarea a la lista
 * @param {string} title - El título de la tarea
 * @param {string} priority - La prioridad de la tarea (alta, media, baja)
 */
function addTask(title, priority) {
  if (!title.trim()) return;
  const task = createTask(title, priority);
  tasks.push(task);
  saveTasks();
  renderTasks();
  updateStats();
}
```

Los cambios se aceptaron con `Ctrl+Shift+Y`.

---

## Autocompletado inteligente

Cursor sugiere código automáticamente mientras se escribe. Basta con escribir un comentario que describa lo que se quiere hacer y esperar unos segundos.

**Ejemplo:**

Se escribió al final de `app.js`:
```javascript
// Función que borra todas las tareas completadas
```

Cursor sugirió en gris la implementación completa de la función. Al pulsar `Tab` se aceptó la sugerencia. En este caso la función ya existía en el proyecto, por lo que se descartó, pero sirvió para comprobar que el autocompletado funciona correctamente con el contexto del proyecto.

---

## Composer / Chat con múltiples archivos

En la versión de Cursor instalada, el chat integrado ya incorpora las funciones que antes tenía Composer, permitiendo hacer cambios que afectan a varios archivos desde el mismo panel.

**Prompt usado:**
```
Añade comentarios JSDoc a todas las funciones principales de app.js
```

Cursor propuso los cambios para todo el archivo de una vez, mostrando en verde las líneas añadidas. Se revisaron manualmente antes de aceptarlos.

---

## Conclusión

Cursor mejora significativamente el flujo de desarrollo al permitir entender, modificar y documentar el código sin salir del editor. Las funciones más útiles para este proyecto fueron el chat contextual para entender la arquitectura y la edición inline para documentar funciones rápidamente.
