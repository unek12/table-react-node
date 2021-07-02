const { Router } = require('express')
const router = Router()
const Data = require('../models/data')

router.get('/', async (req, res) => {
    const data = await Data.find()
    if ( !data[0] ) {
        const newGroup = new Data({data: []})
        await newGroup.save()
        return res.status(204).json({message: 'created'})
    }
    res.json(data[0].data)
})

module.exports = router
