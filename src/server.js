import express from 'express'
import cors from 'cors'
import { PORT } from './config/env-config.js'
import usuarioRoutes from './routes/usuario-routes.js'
import { errorMiddleware } from './middlewares/error-middleware.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(usuarioRoutes)
app.use(errorMiddleware)

app.listen(PORT, ()=> {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})