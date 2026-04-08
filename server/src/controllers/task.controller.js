const taskService = require('../services/task.service');

const obtenerTareas = (req, res) => {
  res.json(taskService.obtenerTodas());
};

const crearTarea = (req, res) => {
  const { titulo, prioridad } = req.body;
  if (!titulo || typeof titulo !== 'string' || titulo.trim().length < 3) {
    return res.status(400).json({ error: 'El titulo es obligatorio y debe tener al menos 3 caracteres.' });
  }
  if (typeof prioridad !== 'number' || prioridad < 1) {
    return res.status(400).json({ error: 'La prioridad debe ser un numero positivo.' });
  }
  const tarea = taskService.crearTarea({ titulo: titulo.trim(), prioridad });
  res.status(201).json(tarea);
};

const eliminarTarea = (req, res) => {
  taskService.eliminarTarea(req.params.id);
  res.status(204).send();
};

module.exports = { obtenerTareas, crearTarea, eliminarTarea };