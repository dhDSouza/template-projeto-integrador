import { Usuario } from "../models/usuario.js"
import { UsuarioRepository } from "../repositories/usuario-repository.js"
import { AppError } from '../errors/error-handler.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config/env-config.js"

export class UsuarioService {

    static async exibirUsuarios() {
        const usuarios = await UsuarioRepository.buscarTodos()

        if (usuarios.length === 0) {
            throw new AppError('Nenhum usuário foi encontrado', 404)
        }

        console.log(usuarios)
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

    static async login(email, senha) {

        if (!email || !senha) {
            throw new AppError('E-mail e senha são obrigatórios!', 400)
        }

        const usuario = await UsuarioRepository.buscarPorEmail(email)

        if (!usuario) {
            throw new AppError('Credenciais inválidas!', 401)
        }

        const passwordCheck = await bcrypt.compare(senha, usuario.senha)

        if (!passwordCheck) {
            throw new AppError('Credenciais inválidas!', 401)
        }

        const token = jwt.sign(
            { id: usuario.id },
            JWT_SECRET,
            { expiresIn: '1h' }
        )

        return { token }

    }

    static async update(id, nome, email, senha) {

        if (isNaN(id)) {
            throw new AppError('ID precisa ser um número!', 400)
        }

        if (!nome && !email && !senha) {
            throw new AppError('É necessário informar ao menos um campo para alteração!', 400)
        }

        const usuarioExist = await UsuarioRepository.buscarPorId(parseInt(id))

        if (!usuarioExist) {
            throw new AppError('Usuário não encontrado!', 404)
        }
        
        const emailExist = await UsuarioRepository.buscarPorEmail(email)
        
        if (emailExist) {
            throw new AppError('Já existe um usuário com este email', 409)
        }

        nome = nome ?? usuarioExist.nome
        email = email ?? usuarioExist.email
        senha = senha ?? usuarioExist.senha

        const usuarioAtualizado = await UsuarioRepository.atualizarUsuario(id, new Usuario(id, nome, email, senha))

        if (!usuarioAtualizado) {
            throw new AppError('Erro ao atualizar usuário', 500)
        }

        return usuarioAtualizado

    }

    static async delete(id) {

        if (isNaN(id)) {
            throw new AppError('ID precisa ser um número!', 400)
        }

        const usuario = await UsuarioRepository.buscarPorId(parseInt(id))
        const deleted = await UsuarioRepository.excluirUsuario(id)

        if (!usuario || !deleted) {
            throw new AppError('Usuário não encontrado', 404)
        }

        return
    }

}