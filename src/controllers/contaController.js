const contaRepository = require('../repositories/contaRepository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registrar = async (req, res)=>{
    try {
        const {nome, email, senha} = req.body;

        const contaExistente = await contaRepository.getContaByEmail(email);

        if (contaExistente) { return res.status(400).json({ mensagem: 'Email já cadastrado.' }); }

        const senha_hash = await bcrypt.hash(senha, 10);

        const novaConta = await contaRepository.postConta(nome, email, senha_hash);

        res.status(201).json(novaConta);

    } catch (error) {
        console.error('Erro ao registrar conta:', error);
        return res.status(500).json({ mensagem: 'Erro interno ao criar conta' })
    }
}

const login = async (req, res)=>{
    try {
        const { email, senha } = req.body;

        const conta  = await contaRepository.getContaByEmail(email);
        if (!conta) {
            return res.status(400).json({mensagem: 'Credenciais inválidas.'});
        }

        const senhaValida = await bcrypt.compare(senha, conta.senha_hash);
        if (!senhaValida) {
            return res.status(400).json({mensagem: 'Credenciais inválidas.'})
        }

        const token = jwt.sign(
            { id: conta.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h'}
        );

        res.json({ mensagem: 'Login realizado com sucesso!', token: token });

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno ao logar conta' });
    }
}

const verPerfil = async (req, res)=>{
    const id = req.usuario_id;
    const dadosUsuario = await contaRepository.getContaById(id);

    res.json(dadosUsuario);
}

module.exports = { registrar, login, verPerfil }
