// src/models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Um ID de outro objeto no banco
        required: true,
        ref: 'User', // A qual Model este ID se refere? Ao 'User'.
    },
    title: {
        type: String,
        required: [true, 'Por favor, adicione um título'],
        trim: true, // Remove espaços em branco do início e do fim
    },
    description: {
        type: String,
        required: false, // Descrição é opcional
    },
    completed: {
        type: Boolean,
        default: false, // Por padrão, uma nova tarefa não está completa
    },
}, {
    timestamps: true // Adiciona createdAt e updatedAt
});

module.exports = mongoose.model('Task', TaskSchema);