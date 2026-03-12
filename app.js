/* ============================================================
   TASKFLOW — app.js
   Puntos 6 y 7: Lógica completa + persistencia con LocalStorage
   ============================================================ */

// ── 1. ESTADO Y REFERENCIAS AL DOM ───────────────────────────

let tasks = [];
let currentFilter = 'all';
let searchQuery = '';

const taskForm        = document.getElementById('task-form');
const taskInput       = document.getElementById('task-input');
const taskPriority    = document.getElementById('task-priority');
const taskList        = document.getElementById('task-list');
const taskTemplate    = document.getElementById('task-template');
const searchInput     = document.getElementById('search-input');
const filterBtns      = document.querySelectorAll('.filter-btn');
const btnCompleteAll  = document.getElementById('btn-complete-all');
const btnClearDone    = document.getElementById('btn-clear-completed');

const statTotal       = document.getElementById('stat-total');
const statCompleted   = document.getElementById('stat-completed');
const statPending     = document.getElementById('stat-pending');
const statPercent     = document.getElementById('stat-percent');
const progressFill    = document.getElementById('progress-fill');

// ── 2. LOCALSTORAGE ───────────────────────────────────────────

/**
 * Guarda las tareas en LocalStorage.
 */
function saveTasks() {
  localStorage.setItem('taskflow-tasks', JSON.stringify(tasks));
}

/**
 * Carga las tareas desde LocalStorage.
 * Si no hay datos guardados, devuelve un array vacío.
 */
function loadTasks() {
  const stored = localStorage.getItem('taskflow-tasks');
  return stored ? JSON.parse(stored) : [];
}

// ── 3. CREAR TAREA ────────────────────────────────────────────

/**
 * Devuelve un objeto tarea con la estructura definida.
 * @param {string} title - Texto de la tarea
 * @param {string} priority - 'alta' | 'media' | 'baja'
 * @returns {Object} tarea
 */
function createTask(title, priority) {
  return {
    id:          crypto.randomUUID(),
    title:       title.trim(),
    completed:   false,
    priority:    priority,
    createdAt:   new Date().toISOString(),
  };
}

// ── 4. RENDERIZAR TAREAS ──────────────────────────────────────

/**
 * Filtra y busca las tareas según el estado actual.
 * @returns {Array} tareas filtradas
 */
function getFilteredTasks() {
  return tasks.filter(task => {
    const matchesFilter =
      currentFilter === 'all' ||
      (currentFilter === 'completed' && task.completed) ||
      (currentFilter === 'pending'   && !task.completed);

    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });
}

/**
 * Renderiza todas las tareas filtradas en el DOM.
 */
function renderTasks() {
  taskList.innerHTML = '';

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

/**
 * Crea el nodo DOM de una tarea a partir del <template>.
 * @param {Object} task
 * @returns {HTMLElement}
 */
function renderTaskNode(task) {
  const clone = taskTemplate.content.cloneNode(true);
  const li       = clone.querySelector('.task-item');
  const checkbox = clone.querySelector('.task-checkbox');
  const text     = clone.querySelector('.task-text');
  const badge    = clone.querySelector('.task-priority');
  const delBtn   = clone.querySelector('.task-delete');

  li.dataset.id = task.id;
  if (task.completed) li.classList.add('completed');

  checkbox.checked = task.completed;
  checkbox.setAttribute('aria-label', `Marcar "${task.title}" como completada`);

  text.textContent = task.title;

  badge.textContent = task.priority;
  badge.classList.add(task.priority);

  delBtn.setAttribute('aria-label', `Eliminar "${task.title}"`);

  // Eventos
  checkbox.addEventListener('change', () => toggleTask(task.id));
  delBtn.addEventListener('click',    () => deleteTask(task.id));
  text.addEventListener('dblclick',   () => startEdit(task.id, text));

  return clone;
}

// ── 5. ACCIONES SOBRE TAREAS ──────────────────────────────────

/**
 * Añade una nueva tarea al array y actualiza la UI.
 * @param {string} title
 * @param {string} priority
 */
function addTask(title, priority) {
  if (!title.trim()) return;
  const task = createTask(title, priority);
  tasks.push(task);
  saveTasks();
  renderTasks();
  updateStats();
}

/**
 * Alterna el estado completado de una tarea.
 * @param {string} id
 */
function toggleTask(id) {
  tasks = tasks.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  saveTasks();
  renderTasks();
  updateStats();
}

/**
 * Elimina una tarea por su id.
 * @param {string} id
 */
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
  updateStats();
}

/**
 * Activa el modo edición inline en una tarea.
 * @param {string} id
 * @param {HTMLElement} textEl
 */
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
      saveTasks();
    }
    renderTasks();
    updateStats();
  }

  input.addEventListener('blur',    commitEdit);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter')  { input.blur(); }
    if (e.key === 'Escape') { renderTasks(); }
  });
}

// ── 6. ACCIONES MASIVAS ───────────────────────────────────────

/**
 * Marca todas las tareas como completadas.
 */
function completeAll() {
  tasks = tasks.map(t => ({ ...t, completed: true }));
  saveTasks();
  renderTasks();
  updateStats();
}

/**
 * Elimina todas las tareas completadas.
 */
function clearCompleted() {
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  renderTasks();
  updateStats();
}

// ── 7. ESTADÍSTICAS ───────────────────────────────────────────

/**
 * Actualiza el panel de estadísticas.
 */
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
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
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
  addTask(taskInput.value, taskPriority.value);
  taskForm.reset();
  taskInput.focus();
});

btnCompleteAll.addEventListener('click', completeAll);
btnClearDone.addEventListener('click',   clearCompleted);

// ── 10. INICIALIZACIÓN ────────────────────────────────────────

/**
 * Carga los datos al iniciar la app.
 */
function init() {
  tasks = loadTasks();
  renderTasks();
  updateStats();
}

init();
