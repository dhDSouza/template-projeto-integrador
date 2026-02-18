export function errorMiddleware(err, req, res, next) {
    const status = err.statusCode || 500
    console.error(`Erro: ${err.message}\nHorário: ${new Date()}`)
    res.status(status).json({ mensagem: 'Algo deu errado. Tente novamente mais tarde.' })
}