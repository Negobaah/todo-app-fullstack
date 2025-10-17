// src/middleware/errorMiddleware.js
const errorHandler = (err, req, res, next) => {
    // Às vezes, um erro pode vir com um status code (ex: 400, 401).
    // Se o res.statusCode já for um erro (>299), usamos ele.
    // Se for 200 (sucesso), significa que o erro não foi tratado, então usamos 500.
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    // Retorna uma resposta JSON com a mensagem do erro
    res.json({
        message: err.message,
        // O 'stack trace' é o rastreamento detalhado do erro.
        // É uma boa prática de segurança só mostrá-lo em ambiente de desenvolvimento.
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { errorHandler };