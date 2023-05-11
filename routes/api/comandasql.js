const express = require("express");
const router = express.Router();
const controller = require("../../controladora");
router.get("/", controller.getAll);
router.get("/:numero", controller.numero.getComanda);
router.post("/", controller.comanda.criarComanda);
router.put("/", controller.comanda.editarComanda);
router.delete("/", controller.user.deletarComanda);
module.exports = router;