const pool = require('../config/db');

const postConta = async (nome, email, senha_hash)=>{
    const sql = `INSERT INTO contas (nome, email, senha_hash) values ($1, $2, $3) RETURNING id, nome, email`;
    const resultado = await pool.query(sql, [nome, email, senha_hash]);
    return resultado.rows[0];
}  

const getContaByEmail = async (email)=>{
    const sql = 'SELECT * FROM contas WHERE email = $1';
    const resultado = await pool.query(sql, [email]);
    return resultado.rows[0];
}

const getContaById = async (id)=>{
    const sql = 'SELECT * FROM contas WHERE id = $1';
    const resultado = await pool.query(sql [id]);
    return resultado.rows[0];
}

module.exports = { postConta, getContaByEmail, getContaById}