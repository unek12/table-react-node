const {Schema, model} = require('mongoose')

const schema = new Schema({
    data: [Object]
})

module.exports = model('Data', schema)