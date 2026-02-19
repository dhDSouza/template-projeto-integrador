export function errorMiddleware(err, req, res, next) {
    const status = err.statusCode || 500
    const isOperational = err.isOperational || false

    res.status(status).json({ mensagem: isOperational ? err.message : "Erro inexperado. Tente novamente mais tarde" })
}