import express from 'express'
import cors from 'cors'
import { PORT } from './config/env-config.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.listen(PORT, ()=> {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})