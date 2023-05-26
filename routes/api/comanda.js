const { Router } = require('express')
const Comanda = require('../../models/comanda')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const comandaList = await Comanda.findOne({
            numero: 2
        });
        if (!comandaList) throw new Error('Nenhuma comanda encontrada')
        res.status(200).json(comandaList)
        // res.status(200).json({item: "itens", valor: 25.99})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const newComanda = new Comanda(req.body)
        console.log(req.body);
        const comanda = await newComanda.save()
        console.log("--- Teste ---");
        if (!comanda) throw new Error('Erro ao salvar a comanda')
        res.status(200).json(comanda)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await Comanda.findByIdAndDelete(id)
        if (!removed) throw Error('Algo deu errado ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router