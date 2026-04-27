const API_URL = 'https://taskflow-project-4f6g.vercel.app/api/v1/tasks';

async function obtenerTareas() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener tareas');
  return res.json();
}

async function crearTarea(titulo, prioridad) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, prioridad: Number(prioridad) })
  });
  if (!res.ok) throw new Error('Error al crear tarea');
  return res.json();
}

async function eliminarTarea(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar tarea');
}

export { obtenerTareas, crearTarea, eliminarTarea };