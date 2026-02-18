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
        
        await UsuarioService.login(email, senha)

        res.status(200).json({ message: 'Usuário logado com sucesso!' })
    }

    static async update(req, res) {
        const id = parseInt(req.params.id)
        const { nome, email, senha } = req.body

        const usuario = new Usuario(id, nome, email, senha)
        const usuarioAtualizado = await UsuarioRepository.atualizarUsuario(id, usuario)

        if (!usuarioAtualizado) {
            res.status(404).send('Usuário não encontrado')
            return
        }

        res.status(200).json(usuarioAtualizado)

    }

    static async delete(req, res) {
        const id = parseInt(req.params.id)

        const removido = await UsuarioRepository.excluirUsuario(id)

        if (!removido) {
            res.status(404).send('Usuário não encontrado')
            return
        }

        res.status(204).send()

    }

}