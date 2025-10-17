// src/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware'); 

// Importar rotas
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Montar rotas
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Rota de teste
app.get('/', (req, res) => {
    res.send('API To-Do App está funcionando!');
});

// Middleware de Erros 
app.use(errorHandler); 

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));