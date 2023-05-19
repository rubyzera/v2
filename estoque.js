const Sequelize = require('sequelize');
const database = require('./sqlite');

const Estoque = database.define('estoque', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preco: {
        type: Sequelize.DOUBLE
    }
})

module.exports = Estoque;