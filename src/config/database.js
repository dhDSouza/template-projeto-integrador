import mysql from 'mysql2/promise'
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from './env-config.js'


export const conn = mysql.createPool({
    host: DB_HOST,
    port: parseInt(DB_PORT || '3306'),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10
})