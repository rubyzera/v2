const sequelize = require("sequelize");
const db = require("../banco");
var func = db.define(
    "func",
    {
        nome: { type: sequelize.STRING, primaryKey: true },
        senha: { type: sequelize.STRING },   
    },
    {
        // freeze name table not using *s on name
        freezeTableName: true,
        // dont use createdAt/update
        timestamps: false,
    }
);
module.exports = func;