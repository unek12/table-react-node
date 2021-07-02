const { Router } = require('express')
const router = Router()
const Data = require('../models/data')

router.post('/', async (req, res) => {
    try {
        const data = await Data.find()
        const form = JSON.parse(req.headers.form)
        data[0].data.push(form)
        await data[0].save()
        res.json({message: 'ok'})
    } catch (e) {
        res.json({message: 'bad'})
    }

})

module.exports = router
