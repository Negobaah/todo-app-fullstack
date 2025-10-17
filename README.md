# To-Do / Task Manager Full-Stack (Stack MERN)

![Prévia da Aplicação](./screenshot.png)

## 📝 Descrição

Este é um projeto de uma aplicação de gerenciamento de tarefas (To-Do list) completo, construído com a stack MERN (MongoDB, Express.js, React, Node.js). O projeto inclui autenticação de usuário com JWT, permitindo que cada usuário gerencie sua própria lista de tarefas de forma segura.

Este projeto foi desenvolvido como um desafio técnico para demonstrar competências em desenvolvimento full-stack, desde a criação da API REST até a construção de uma interface reativa e funcional, seguindo as melhores práticas de mercado como validação de entrada, tratamento de erros centralizado e feedback visual para o usuário.

## ✨ Funcionalidades Principais

-   **Autenticação de Usuário:** Sistema completo de Registro e Login com tokens JWT.
-   **Segurança:** Rotas de tarefas protegidas, acessíveis apenas por usuários autenticados.
-   **CRUD de Tarefas:** Usuários podem Criar, Ler, Atualizar (marcar como concluída) e Deletar suas próprias tarefas.
-   **Validação Robusta:** Validação de dados de entrada no back-end para garantir a integridade das informações.
-   **Feedback de UI/UX:** Indicadores de carregamento e mensagens de erro claras para uma melhor experiência do usuário.
-   **Interface Reativa:** Front-end construído com React para uma experiência de usuário fluida e dinâmica.

## 🚀 Tecnologias Utilizadas

### **Back-end**
-   **Runtime:** Node.js
-   **Framework:** Express.js
-   **Banco de Dados:** MongoDB com Mongoose ODM
-   **Autenticação:** JSON Web Token (JWT)
-   **Segurança:** `bcryptjs` para hashing de senhas
-   **Validação:** `express-validator`
-   **Tratamento de Erros:** Middleware centralizado com `express-async-handler`

### **Front-end**
-   **Biblioteca:** React
-   **Roteamento:** React Router
-   **Cliente HTTP:** Axios
-   **Estilização:** CSS Básico

## 🔧 Como Executar o Projeto Localmente

Siga os passos abaixo para configurar e rodar o projeto no seu ambiente local.

### Pré-requisitos
-   Node.js (v18 ou superior)
-   Conta no MongoDB Atlas
-   Gerenciador de pacotes `npm`

### 1. Clonar o Repositório
```bash
git clone [https://github.com/](https://github.com/)[SEU-USUARIO-GITHUB]/[NOME-DO-REPOSITORIO].git
cd [NOME-DO-REPOSITORIO]