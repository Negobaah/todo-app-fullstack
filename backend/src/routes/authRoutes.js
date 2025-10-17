// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { body } = require('express-validator'); // <-- 1. Importe o 'body'

// Adicionamos um array de middlewares de validação na rota de registro
router.post('/register', [
    body('name', 'O nome é obrigatório').not().isEmpty(),
    body('email', 'Por favor, inclua um email válido').isEmail(),
    body('password', 'A senha precisa ter 6 ou mais caracteres').isLength({ min: 6 })
], register); // <-- 2. A validação roda ANTES do controlador 'register'

router.post('/login', login);

module.exports = router;