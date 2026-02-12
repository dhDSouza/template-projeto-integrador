import { Usuario } from "../models/usuario.js"
import { UsuarioRepository } from "../repositories/usuario-repository.js"

export class UsuarioController {

    static async index(req, res) {
        const usuarios = await UsuarioRepository.buscarTodos()
        res.status(200).json(usuarios)
    }

    static async buscarPorId(req, res) {
        const id = parseInt(req.params.id)

        const usuario = await UsuarioRepository.buscarPorId(id)

        if (!usuario) {
            res.status(404).send('Usuário não encontrado!')
            return
        }

        res.status(200).json(usuario)
    }

    static async register(req, res) {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            res.status(400).send('Todos os campos são obrigatórios!')
            return
        }

        const usuario = new Usuario(null, nome, email, senha)
        const novoUsuario = await UsuarioRepository.inserirUsuario(usuario)

        res.status(201).json(novoUsuario)
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