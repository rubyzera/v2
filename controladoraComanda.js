const model = require("./app");
const { Op } = require("sequelize");
const controller = {};

controller.getAll = async function (req, res) {
    try {
        const comandaData = await model.comanda.findAll();
        if (comandaData.length > 0) {
             res
                .status(200)
                .json({ message: "Sucesso ao conectar", data: userData });
        } else {
            res.status(200).json({ message: "Falha na conexão", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

controller.getComanda = async function (req, res) {
    try {
        var comandaData = await model.comanda.findAll({
        where: { numero: { [Op.like]: `%${req.params.numero}%` } },
        });
        if (comandaData.length > 0) {
            res
            .status(200)
            .json({ message: "Sucesso", data: comandaData });
        } else {
        res.status(200).json({ message: "Falhou", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

controller.criarComanda = async function (req, res) {
    try {
        //   check data has already been created
        const checarComanda = await model.comanda.findAll({
        where: {
            [Op.or]: {
                numero: req.body.numero,
                },
            },
        });
    if (checarComanda.length > 0) {
        res.status(500).json({ message: "Número da comanda já foi utilizado" });
    } else {
        await model.comanda
            .create({
            numero: req.body.numero,
            itens: req.body.itens,
            valor: req.body.valor,
        })
        .then((result) => {
            res.status(201).json({
            message: "Comanda registrada com sucesso",data: {
            numero: req.body.numero,
            itens: req.body.itens,
            valor: req.body.valor,
                },
            });
        });
    }
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

controller.editarComanda = async function (req, res) {
    try {
        await model.comanda
            .findAll({ where: { id: req.body.id } })
            .then(async (result) => {
                if (result.length > 0) {
                    await model.comanda.update(
                       {
                        numero: req.body.numero,
                        itens: req.body.itens,
                        valor: req.body.valor,
                        },
                        { where: { id: req.body.id } }
                    );
                    res.status(200).json({
                        message: "atualizado com uscesso",
                        data: {
                        id: req.body.id,
                        numero: req.body.numero,
                        itens: req.body.itens,
                        valor: req.body.valor,
                        },
                    });
                } else {
                    res.status(500).json({ message: "falha ao atualizar" });
                }
            });
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

controller.deletarComanda = async function (req, res) {
    try {
        await model.comanda
            .findAll({ where: { id: req.body.id } })
            .then(async (result) => {
        if (result.length > 0) {
            await model.comanda.destroy({ where: { id: req.body.id } });
            res.status(200).json({ message: "deletado com sucesso" });
        } else {
            res.status(404).json({ message: "comanda não encontrada" });
            }
        });
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

module.exports = controller;