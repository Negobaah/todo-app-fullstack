// src/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// Aplicamos o middleware 'protect' a todas as rotas de uma vez só.
// Qualquer requisição para a rota raiz ('/') ou para uma com ID ('/:id')
// passará primeiro pelo 'protect' antes de chegar ao controlador.

router.route('/')
    .get(protect, getTasks)       // GET /api/tasks (protegido)
    .post(protect, createTask);    // POST /api/tasks (protegido)

router.route('/:id')
    .put(protect, updateTask)     // PUT /api/tasks/:id (protegido)
    .delete(protect, deleteTask); // DELETE /api/tasks/:id (protegido)

module.exports = router;