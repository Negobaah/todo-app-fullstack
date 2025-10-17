// src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor, adicione um nome'],
    },
    email: {
        type: String,
        required: [true, 'Por favor, adicione um email'],
        unique: true, // Garante que não haverá dois emails iguais
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Por favor, adicione um email válido',
        ],
    },
    password: {
        type: String,
        required: [true, 'Por favor, adicione uma senha'],
        minlength: 6,
        select: false, // Faz com que a senha não seja retornada em buscas por padrão
    },
}, {
    timestamps: true // Adiciona automaticamente os campos createdAt e updatedAt
});

// Middleware: Executa ANTES de salvar o usuário no banco
UserSchema.pre('save', async function (next) {
    // Se a senha não foi modificada, não faz o hash novamente
    if (!this.isModified('password')) {
        next();
    }

    // Gera o "salt" e faz o hash da senha
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Método para comparar a senha digitada no login com a senha no banco
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);