// src/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator'); 

// Função auxiliar para gerar o token JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // O token expira em 30 dias
    });
};

// @desc    Registrar um novo usuário
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            // Se o email já existe, retorna um erro
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        // Cria o novo usuário no banco de dados
        const user = await User.create({ name, email, password });

        if (user) {
            // Se o usuário foi criado com sucesso, retorna os dados e o token
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Dados de usuário inválidos' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
};

// @desc    Autenticar um usuário (login)
// @route   POST /api/auth/login
// @access  Public

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Procura o usuário pelo email e inclui a senha na busca
        const user = await User.findOne({ email }).select('+password');

        // Verifica se o usuário existe E se a senha bate com a do banco
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            // Se o usuário não existe ou a senha está errada
            res.status(401).json({ message: 'Email ou senha inválidos' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
};