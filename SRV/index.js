const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())
app.use('/api/getData', require('./router/getData'))
app.use('/api/addData', require('./router/addData'))
app.use('/api/deleteData', require('./router/deleteData'))
app.use('/api/editData', require('./router/editData'))
app.use('/api/auth', require('./router/auth'))


const PORT = process.env.PORT || 80

async function start() {
    try {
        await mongoose.connect("mongodb+srv://egor:<password>@cluster0.vlxx1.mongodb.net/test_task?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()

app.listen(PORT, () => {
    console.log(`App has been started on port ${PORT}`)
})