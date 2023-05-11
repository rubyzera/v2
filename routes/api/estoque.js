const { Router } = require('express')
const Estoque = require('../../models/estoque')

const router = Router()

router.get('/', async (req, res) => {
    try {
    const estoqueList = await Estoque.findOne({
        numero: 2
    });
    if (!estoqueList) throw new Error('Nenhum item no estoque')
    res.status(200).json(estoqueList)
    // res.status(200).json({item: "itens", valor: 25.99})
} catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message })
}
})

router.post('/', async (req, res) => {
    try {
        const newEstoque = new Estoque(req.body)
        console.log(req.body);
        const estoque = await newEstoque.save()
        console.log("--- Teste ---");
        if (!estoque) throw new Error('Erro ao salvar o item')
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