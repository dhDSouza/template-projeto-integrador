import { Router } from "express"
import { UsuarioController } from '../controllers/usuario-controller.js'

const router = Router()

router.get('/usuarios', UsuarioController.index)
router.get('/usuarios/:id', UsuarioController.buscarPorId)
router.post('/usuarios', UsuarioController.register)

export default router