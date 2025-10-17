// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // <-- Adicionado estado de loading

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true); // <-- Inicia o carregamento

        try {
            const response = await api.post('/auth/register', { name, email, password });
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/');
        } catch (err) {
            // Se o erro vier da nossa validação, ele estará em err.response.data.errors
            const errorMsg = err.response?.data?.errors ? err.response.data.errors[0].msg : err.response?.data?.message;
            setError(errorMsg || 'Erro ao registrar');
        } finally {
            setLoading(false); // <-- Para o carregamento
        }
    };

    return (
        <div>
            <h2>Registrar</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                    required
                />
                {/* Botão dinâmico */}
                <button type="submit" disabled={loading}>
                    {loading ? 'Registrando...' : 'Registrar'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default RegisterPage;