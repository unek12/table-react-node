const { Router } = require('express')
const router = Router()
const Data = require('../models/data')

router.post('/:id', async (req, res) => {
    const data = await Data.find()
    data[0].data.splice(req.params.id, 1)
    await data[0].save()

    res.json({message: 'fine'})
})

module.exports = router