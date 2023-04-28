const { Router } = require('express')
const Comanda = require('../../models/comandas')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const comandaList = await Comanda.find()
        if (!comandaList) throw new Error('Nenhuma comanda encontrada')
        res.status(200).json(comandaList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newComanda = new Comanda(req.body)
    try {
        const comanda = await newComanda.save()
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