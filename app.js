
// ── 11. MODO OSCURO ───────────────────────────────────────────

const btnDarkMode = document.getElementById('btn-dark-mode');

/**
 * Aplica o quita el modo oscuro y guarda la preferencia en LocalStorage.
 */
function applyDarkMode(isDark) {
  document.documentElement.classList.toggle('dark', isDark);
  btnDarkMode.textContent = isDark ? '☀️ Claro' : '🌙 Oscuro';
  localStorage.setItem('taskflow-dark', isDark ? '1' : '0');
}

// Cargar preferencia guardada al inicio
const savedDark = localStorage.getItem('taskflow-dark');
if (savedDark === '1' || (savedDark === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  applyDarkMode(true);
}

btnDarkMode.addEventListener('click', () => {
  const isDark = document.documentElement.classList.contains('dark');
  applyDarkMode(!isDark);
});
