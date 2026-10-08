const express = require('express');
const cors = require ('cors');

const contaRoutes = require('./src/routes/contaRoutes');

const app = express();

app.use(express.json());
app.use(cors());

// Cadastra a rota base
app.use('/contas', contaRoutes);

module.exports = app;