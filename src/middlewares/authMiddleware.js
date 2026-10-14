const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({ mensagem: 'Acesso negado. Cadê o seu crachá (Token)?' });
    }

    const token = authHeader.split(' ')[1];

    try {
        
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario_id = payload.id;
        next();

    } catch (error) {
        return res.status(401).json({ mensagem: 'Crachá inválido ou vencido!'});
    }
};

module.exports = verificarToken;