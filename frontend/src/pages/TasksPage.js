// src/pages/TasksPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js'; // Lembre-se do .js no final

const TasksPage = () => {
    // Estados para a lista de tarefas, e para os campos do formulário
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    // useEffect: Este código roda assim que o componente é carregado na tela
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            // Se não houver usuário no localStorage, o usuário não está logado.
            // Redirecionamos para a página de login.
            navigate('/login');
        } else {
            // Se o usuário está logado, buscamos as tarefas dele na API.
            fetchTasks();
        }
    }, [navigate]); // O array [navigate] diz ao React para só rodar isso uma vez

    // Função para buscar as tarefas do usuário na API
    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks'); // Faz um GET para /api/tasks
            setTasks(response.data); // Atualiza o estado com as tarefas recebidas
        } catch (error) {
            console.error('Erro ao buscar tarefas', error);
        }
    };

    // Função para lidar com a criação de uma nova tarefa
    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            await api.post('/tasks', { title, description });
            setTitle(''); // Limpa o campo de título
            setDescription(''); // Limpa o campo de descrição
            fetchTasks(); // Re-busca as tarefas para atualizar a lista na tela
        } catch (error) {
            console.error('Erro ao criar tarefa', error);
        }
    };

    // Função para marcar uma tarefa como completa ou incompleta
    const handleToggleComplete = async (task) => {
        try {
            // Faz um PUT para /api/tasks/ID_DA_TAREFA, enviando o estado oposto de 'completed'
            await api.put(`/tasks/${task._id}`, {
                completed: !task.completed,
            });
            fetchTasks(); // Re-busca as tarefas para atualizar a lista
        } catch (error) {
            console.error('Erro ao atualizar tarefa', error);
        }
    };

    // Função para deletar uma tarefa
    const handleDeleteTask = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            fetchTasks(); // Re-busca as tarefas para atualizar a lista
        } catch (error) {
            console.error('Erro ao deletar tarefa', error);
        }
    };

    // Função de Logout
    const handleLogout = () => {
        localStorage.removeItem('user'); // Remove os dados do usuário do localStorage
        navigate('/login'); // Redireciona para a página de login
    };

    return (
        <div>
            <h2>Minhas Tarefas</h2>
            <button onClick={handleLogout} style={{ marginBottom: '20px' }}>Sair</button>

            <form onSubmit={handleCreateTask}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título da tarefa"
                    required
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descrição (opcional)"
                />
                <button type="submit">Adicionar Tarefa</button>
            </form>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {tasks.map((task) => (
                    <li key={task._id} style={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        margin: '10px 0',
                        padding: '10px',
                        border: '1px solid #ccc',
                    }}>
                        <strong>{task.title}</strong>
                        <p>{task.description}</p>
                        <button onClick={() => handleToggleComplete(task)}>
                            {task.completed ? 'Desmarcar' : 'Concluir'}
                        </button>
                        <button onClick={() => handleDeleteTask(task._id)} style={{ marginLeft: '10px' }}>
                            Excluir
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TasksPage;