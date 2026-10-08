const contaRepository = require('../repositories/contaRepository');

const criarConta = async (req, res)=>{
    try {
        const {nome, email, senha} = req.body;

        const contaExistente = await contaRepository.getContaByEmail(email);

        if (contaExistente) { return res.status(400).json({ mensagen: 'Email já cadastrado.' }); }

        const senha_hash = await bcrypt.hash(senha, 10);

        const novaConta = await contaRepository.postConta(nome, email, senha_hash);
        res.status(201).json(novaConta);

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno ao criar conta' })
    }
}

module.exports = { criarConta, }