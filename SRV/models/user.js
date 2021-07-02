const {Schema, model} = require('mongoose')

const schema = new Schema({
    email: {type: String, unique: true},
    password: String,
    admin: {type: Number, default: 0}
})

module.exports = model('User', schema)