// src/controllers/taskController.js
const Task = require('../models/Task');
const asyncHandler = require('express-async-handler'); 

// 2. Envolva cada função com asyncHandler e remova o try/catch
exports.getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
});

exports.createTask = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    
    // Agora podemos lançar erros de forma mais direta
    if (!title) {
        res.status(400); // Define o status do erro
        throw new Error('O título é obrigatório'); // Lança o erro
    }

    const task = new Task({
        title,
        description,
        user: req.user.id,
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
});

exports.updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(404);
        throw new Error('Tarefa não encontrada');
    }

    if (task.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Não autorizado');
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;

    const updatedTask = await task.save();
    res.json(updatedTask);
});

exports.deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(404);
        throw new Error('Tarefa não encontrada');
    }

    if (task.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Não autorizado');
    }

    await task.deleteOne();
    res.json({ message: 'Tarefa removida' });
});