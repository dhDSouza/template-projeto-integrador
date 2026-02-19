import { Usuario } from "../models/usuario.js"
import { UsuarioRepository } from "../repositories/usuario-repository.js"
import { UsuarioService } from "../services/usuario-service.js"

export class UsuarioController {

    static async index(req, res) {
        const usuarios = await UsuarioService.exibirUsuarios()
        res.status(200).json(usuarios)
    }

    static async buscarPorId(req, res) {
        const { id } = req.params

        const usuario = await UsuarioService.exibirUsuario(id)
        res.status(200).json(usuario)
    }

    static async register(req, res) {
        const { nome, email, senha } = req.body;

        const novoUsuario = await UsuarioService.registrarUsuario(nome, email, senha)
        res.status(201).json(novoUsuario)
    }

    static async login(req, res) {
        const { email, senha } = req.body
        
        const { token } = await UsuarioService.login(email, senha)

        res.status(200).json({ token })
    }

    static async update(req, res) {
        const id = req.params.id
        const { nome, email, senha } = req.body
        const usuarioAtualizado = await UsuarioService.update(id, nome, email, senha)
        res.status(200).json(usuarioAtualizado)
    }

    static async delete(req, res) {
        const id = parseInt(req.params.id)
        await UsuarioService.delete(id)
        res.status(204).send()
    }

}