const { Router } = require('express')
const Estoque = require('../../models/comandas')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const estoqueList = await Estoque.find()
        if (!estoqueList) throw new Error('Nenhum item encontrado no estoque')
        res.status(200).json(estoqueList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newEstoque = new Estoque(req.body)
    try {
        const estoque = await newEstoque.save()
        if (!estoque) throw new Error('Erro ao salvar o item no estoque')
        res.status(200).json(estoque)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await Estoque.findByIdAndDelete(id)
        if (!removed) throw Error('Algo deu errado ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router