/* ============================================================
   TASKFLOW — app.js
   Lógica completa + API REST + modo oscuro
   ============================================================ */

import { obtenerTareas, crearTarea, eliminarTarea } from './src/api/client.js';

// ── 1. ESTADO Y REFERENCIAS AL DOM ───────────────────────────

let tasks = [];
let currentFilter = 'all';
let searchQuery = '';
let isLoading = false;
let errorMessage = '';

const taskForm        = document.getElementById('task-form');
const taskInput       = document.getElementById('task-input');
const taskPriority    = document.getElementById('task-priority');
const taskList        = document.getElementById('task-list');
const taskTemplate    = document.getElementById('task-template');
const searchInput     = document.getElementById('search-input');
const filterBtns      = document.querySelectorAll('.filter-btn');
const btnCompleteAll  = document.getElementById('btn-complete-all');
const btnClearDone    = document.getElementById('btn-clear-completed');
const btnDarkMode     = document.getElementById('btn-dark-mode');

const statTotal       = document.getElementById('stat-total');
const statCompleted   = document.getElementById('stat-completed');
const statPending     = document.getElementById('stat-pending');
const statPercent     = document.getElementById('stat-percent');
const progressFill    = document.getElementById('progress-fill');
const listSection     = document.querySelector('.list-section');
const statusMessage   = document.createElement('p');

statusMessage.className = 'text-xs font-mono tracking-wide mb-3 hidden';
listSection.insertBefore(statusMessage, taskList);

// ── 2. API + ESTADO DE UI ─────────────────────────────────────

const PRIORITY_TO_API = { alta: 1, media: 2, baja: 3 };
const API_TO_PRIORITY = { 1: 'alta', 2: 'media', 3: 'baja' };

function normalizeTask(apiTask) {
  return {
    id: String(apiTask.id ?? apiTask._id ?? crypto.randomUUID()),
    title: String(apiTask.titulo ?? apiTask.title ?? '').trim(),
    completed: Boolean(apiTask.completada ?? apiTask.completed ?? false),
    priority: API_TO_PRIORITY[Number(apiTask.prioridad)] ?? 'media',
  };
}

function syncState() {
  renderTasks();
  updateStats();
}

function setLoading(value, message = 'Cargando tareas...') {
  isLoading = value;
  statusMessage.textContent = value ? message : '';
  statusMessage.className = value
    ? 'text-xs font-mono tracking-wide mb-3 text-stone-500 dark:text-stone-400'
    : 'text-xs font-mono tracking-wide mb-3 hidden';
}

function setError(message) {
  errorMessage = message;
  statusMessage.textContent = message;
  statusMessage.className = message
    ? 'text-xs font-mono tracking-wide mb-3 text-red-600 dark:text-red-400'
    : 'text-xs font-mono tracking-wide mb-3 hidden';
}

async function refreshTasks() {
  setError('');
  setLoading(true, 'Cargando tareas...');
  try {
    const apiTasks = await obtenerTareas();
    tasks = Array.isArray(apiTasks) ? apiTasks.map(normalizeTask) : [];
  } catch (error) {
    tasks = [];
    setError(error?.message || 'No se pudieron cargar las tareas desde el servidor.');
  } finally {
    setLoading(false);
    syncState();
  }
}

// ── 3. RENDERIZAR TAREAS ──────────────────────────────────────

const FILTER_FN = {
  all:       () => true,
  completed: task => task.completed,
  pending:   task => !task.completed,
};

function getFilteredTasks() {
  return tasks.filter(task => {
    const matchesFilter = FILTER_FN[currentFilter]?.(task) ?? true;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });
}

function renderTasks() {
  taskList.innerHTML = '';

  if (isLoading) return;

  const filtered = getFilteredTasks();

  if (filtered.length === 0) {
    taskList.innerHTML = '<li class="empty-state">No hay tareas que mostrar.</li>';
    return;
  }

  filtered.forEach(task => {
    const node = renderTaskNode(task);
    taskList.appendChild(node);
  });
}

function renderTaskNode(task) {
  const clone    = taskTemplate.content.cloneNode(true);
  const li       = clone.querySelector('.task-item');
  const checkbox = clone.querySelector('.task-checkbox');
  const text     = clone.querySelector('.task-text');
  const badge    = clone.querySelector('.task-priority');
  const delBtn   = clone.querySelector('.task-delete');

  // Botón editar (visible siempre, útil en móvil)
  const editBtn = document.createElement('button');
  editBtn.type = 'button';
  editBtn.className = 'task-edit';
  editBtn.textContent = '✎';
  editBtn.setAttribute('aria-label', `Editar "${task.title}"`);
  delBtn.before(editBtn);

  li.dataset.id = task.id;
  if (task.completed) li.classList.add('completed');

  checkbox.checked = task.completed;
  checkbox.setAttribute('aria-label', `Marcar "${task.title}" como completada`);

  text.textContent = task.title;

  badge.textContent = task.priority;
  badge.classList.add(task.priority);

  delBtn.setAttribute('aria-label', `Eliminar "${task.title}"`);

  checkbox.addEventListener('change', () => toggleTask(task.id));
  delBtn.addEventListener('click',    () => deleteTask(task.id));
  editBtn.addEventListener('click',   () => startEdit(task.id, text));
  text.addEventListener('dblclick',   () => startEdit(task.id, text));

  return clone;
}

// ── 5. ACCIONES SOBRE TAREAS ──────────────────────────────────

function addTask(title, priority) {
  /**
   * Agrega una nueva tarea con el título y la prioridad especificados.
   * Si el título está vacío o sólo contiene espacios, no se agrega ninguna tarea.
   * @param {string} title - El título/descripción de la tarea.
   * @param {string} priority - La prioridad de la tarea.
   */
  if (!title.trim()) return Promise.resolve(false);
  return (async () => {
    setError('');
    setLoading(true, 'Guardando tarea...');
    try {
      await crearTarea(title.trim(), PRIORITY_TO_API[priority] ?? PRIORITY_TO_API.media);
      await refreshTasks();
      return true;
    } catch (error) {
      setLoading(false);
      setError(error?.message || 'No se pudo crear la tarea.');
      return false;
    }
  })();
}

function toggleTask(id) {
  tasks = tasks.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  syncState();
}

async function deleteTask(id) {
  setError('');
  setLoading(true, 'Eliminando tarea...');
  try {
    await eliminarTarea(id);
    await refreshTasks();
  } catch (error) {
    setLoading(false);
    setError(error?.message || 'No se pudo eliminar la tarea.');
  }
}

function startEdit(id, textEl) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'task-edit-input';
  input.value = task.title;

  textEl.replaceWith(input);
  input.focus();
  input.select();

  function commitEdit() {
    const newTitle = input.value.trim();
    if (newTitle && newTitle !== task.title) {
      tasks = tasks.map(t =>
        t.id === id ? { ...t, title: newTitle } : t
      );
      syncState();
      return;
    }
    renderTasks();
  }

  input.addEventListener('blur',    commitEdit);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter')  { input.blur(); }
    if (e.key === 'Escape') { renderTasks(); }
  });
}

// ── 6. ACCIONES MASIVAS ───────────────────────────────────────

function completeAll() {
  tasks = tasks.map(t => ({ ...t, completed: true }));
  syncState();
}

function clearCompleted() {
  tasks = tasks.filter(t => !t.completed);
  syncState();
}

// ── 7. ESTADÍSTICAS ───────────────────────────────────────────

function updateStats() {
  const total     = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending   = total - completed;
  const percent   = total > 0 ? Math.round((completed / total) * 100) : 0;

  statTotal.textContent     = total;
  statCompleted.textContent = completed;
  statPending.textContent   = pending;
  statPercent.textContent   = `${percent}% completado`;
  progressFill.style.width  = `${percent}%`;
}

// ── 8. FILTROS Y BÚSQUEDA ─────────────────────────────────────

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.toggle('active', b === btn));
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

searchInput.addEventListener('input', e => {
  searchQuery = e.target.value;
  renderTasks();
});

// ── 9. EVENTOS PRINCIPALES ────────────────────────────────────

taskForm.addEventListener('submit', e => {
  e.preventDefault();
  addTask(taskInput.value, taskPriority.value).then(created => {
    if (!created) return;
    taskForm.reset();
    taskInput.focus();
  });
});

btnCompleteAll.addEventListener('click', completeAll);
btnClearDone.addEventListener('click',   clearCompleted);

// ── 10. MODO OSCURO ───────────────────────────────────────────

function applyDarkMode(isDark) {
  document.documentElement.classList.toggle('dark', isDark);
  btnDarkMode.textContent = isDark ? '☀️ Claro' : '🌙 Oscuro';
  localStorage.setItem('taskflow-dark', isDark ? '1' : '0');
}

const savedDark = localStorage.getItem('taskflow-dark');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const isDark = savedDark === '1' || (savedDark === null && prefersDark);
applyDarkMode(isDark);

btnDarkMode.addEventListener('click', () => {
  const isDark = document.documentElement.classList.contains('dark');
  applyDarkMode(!isDark);
});

// ── 11. INICIALIZACIÓN ────────────────────────────────────────

function init() {
  refreshTasks();
}

init();
