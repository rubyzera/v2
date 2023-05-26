const Sequelize = require('sequelize');
const database = require('../sqlite');

const Funcionario = database.define('funcionario', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING
    }
})

module.exports = Funcionario;