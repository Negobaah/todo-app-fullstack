// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;

    // Verifica se o token foi enviado no header da requisição e se começa com "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Pega apenas o token (ignora a palavra "Bearer ")
            token = req.headers.authorization.split(' ')[1];

            // Verifica se o token é válido usando o nosso segredo
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Se for válido, busca o usuário pelo ID contido no token
            // e anexa os dados do usuário à requisição (req.user)
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Passa para a próxima função (o controlador da rota)
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Não autorizado, token falhou' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Não autorizado, sem token' });
    }
};