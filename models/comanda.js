const Sequelize = require('sequelize');
const database = require('../sqlite');

const Comanda = database.define('comanda', {
    numero: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    itens: {
        type: Sequelize.STRING
    },
    valor: {
        type: Sequelize.DOUBLE
    }
})

module.exports = Comanda;