// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // <-- NOVO ESTADO para controlar o carregamento

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true); // <-- INICIA o carregamento aqui

        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao fazer login');
        } finally {
            // O bloco 'finally' executa SEMPRE, seja no sucesso (try) ou no erro (catch)
            setLoading(false); // <-- PARA o carregamento aqui
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                {/* O botão agora é dinâmico */}
                <button type="submit" disabled={loading}>
                    {loading ? 'Carregando...' : 'Login'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default LoginPage;