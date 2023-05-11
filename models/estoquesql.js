const sequelize = require("sequelize");
const db = require("../banco");
var estoque = db.define(
    "estoque",
    {
        nome: { type: sequelize.STRING, primaryKey: true },
        quantidade: { type: sequelize.INTEGER },   
    },
    {
        // freeze name table not using *s on name
        freezeTableName: true,
        // dont use createdAt/update
        timestamps: false,
    }
);
module.exports = estoque;