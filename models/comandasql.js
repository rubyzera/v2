const sequelize = require("sequelize");
const db = require("../banco");
var comanda = db.define(
    "comanda",
    {
        numero: { type: sequelize.INTEGER, primaryKey: true },
        itens: { type: sequelize.STRING },
        valor: { type: sequelize.INTEGER },        
    },
    {
        // freeze name table not using *s on name
        freezeTableName: true,
        // dont use createdAt/update
        timestamps: false,
    }
);
module.exports = comanda;