const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/env');
const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const inicio = Date.now();
  res.on('finish', () => {
    console.log('[' + req.method + '] ' + req.originalUrl + ' - ' + res.statusCode + ' (' + (Date.now() - inicio) + 'ms)');
  });
  next();
});

app.use('/api/v1/tasks', taskRoutes);

app.use((err, req, res, next) => {
  if (err.message === 'NOT_FOUND') return res.status(404).json({ error: 'Tarea no encontrada' });
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => console.log('Servidor corriendo en puerto ' + PORT));
