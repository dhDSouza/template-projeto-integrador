import { conn } from "../config/database.js"
import { Usuario } from "../models/usuario.js"

export class UsuarioRepository {

    static async buscarTodos() {
        const [results] = await conn.query('SELECT * FROM usuarios');
        return results.map(u => new Usuario(u.id, u.nome, u.email, u.senha))
    }

    static async buscarPorId(id) {
        const [result] = await conn.query('SELECT * FROM usuarios WHERE id = ?', [id])

        if (result.length === 0) return null

        const u = result[0]
        return new Usuario(u.id, u.nome, u.email, u.senha)
    }

    static async buscarPorEmail(email) {
        const [result] = await conn.query('SELECT * FROM usuarios WHERE email = ?', [email])

        if (result.length === 0) return null

        const u = result[0]
        return new Usuario(u.id, u.nome, u.email, u.senha)
    }    

    static async inserirUsuario(usuario) {
        const { nome, email, senha } = usuario

        const [result] = await conn.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha])

        return new Usuario(result.insertId, nome, email, senha)
    }

    static async atualizarUsuario(id, usuario) {
        const { nome, email, senha } = usuario

        const [result] = await conn.query('UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?', [nome, email, senha, id])

        if (result.affectedRows === 0) return null

        return new Usuario(id, nome, email, senha)
    }

    static async excluirUsuario(id) {
        const [result] = await conn.query('DELETE FROM usuarios WHERE id = ?', [id])
        return result.affectedRows > 0
    }
}

