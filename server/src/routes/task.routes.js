const express = require('express');
const router = express.Router();
const { obtenerTareas, crearTarea, eliminarTarea } = require('../controllers/task.controller');

router.get('/', obtenerTareas);
router.post('/', crearTarea);
router.delete('/:id', eliminarTarea);

module.exports = router;
