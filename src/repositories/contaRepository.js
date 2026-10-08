const pool = require('../config/db');

const postConta = async (nome, email, senha_hash)=>{
    const sql = `INSERT INTO conta (nome, email, senha_hash) values ($1, $2, $3) RETURNING id, nome, email`;
    const resultado = await pool.query(sql, [nome, email, senha_hash]);
    return resultado.rows[0];
}  

const getContaByEmail = async (email)=>{
    const sql = 'SELECT * FROM conta WHERE id = $1';
    const resultado = await pool.query(sql);
    return resultado.rows[0];
}

module.exports = { postConta, getContaByEmail }