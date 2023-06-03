const { Router } = require('express')
const Funcionario = require('../../models/funcionario')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const funcList = await Funcionario.findOne({
            numero: 2
        });
        if (!funcList) throw new Error('Nenhum funcionario encontrado')
        res.status(200).json(funcList)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const newFuncionario = new Funcionario(req.body)
        console.log(req.body);
        const Funcionario = await newFuncionario.save()
        console.log("--- Teste ---");
        if (!Funcionario) throw new Error('Erro ao salvar o Funcionario')
        res.status(200).json(Funcionario)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await Funcionario.findByIdAndDelete(id)
        if (!removed) throw Error('Algo deu errado ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router