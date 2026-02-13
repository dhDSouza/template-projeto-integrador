import { Usuario } from "../models/usuario.js"
import { UsuarioRepository } from "../repositories/usuario-repository.js"
import { AppError } from '../errors/error-handler.js'
import bcrypt from 'bcryptjs'

export class UsuarioService {

    static async exibirUsuarios() {
        const usuarios = await UsuarioRepository.buscarTodos()

        if (usuarios.length === 0) {
            throw new AppError('Nenhum usuário foi encontrado', 404)
        }

        return usuarios
    }

    static async exibirUsuario(id) {

        if (isNaN(id)) {
            throw new AppError('ID precisa ser um número!', 400)
        }

        const usuario = await UsuarioRepository.buscarPorId(parseInt(id))

        if (!usuario) {
            throw new AppError('Nenhum usuário foi encontrado', 404)
        }

        return usuario
    }

    static async registrarUsuario(nome, email, senha) {

        if (!nome || !email || !senha) {
            throw new AppError('Todos os campos são obrigatórios!', 400)
        }

        const emailExiste = await UsuarioRepository.buscarPorEmail(email)

        if (emailExiste) {
            throw new AppError('Já existe um usuário com este email', 409)
        }

        const senhaHash = await bcrypt.hash(senha, 10)
        const usuario = new Usuario(null, nome, email, senhaHash)

        const novoUsuario = await UsuarioRepository.inserirUsuario(usuario)

        return novoUsuario
    }

}