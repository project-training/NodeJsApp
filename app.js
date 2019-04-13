require('./configs/config')

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const rtsUser = require('./routes/user.route')

const app = express()
app.use(express.json())
app.use(cors())
app.use('/user', rtsUser)

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) { console.log('MongoDB connection succeeded. ') }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)) }
})

app.listen(process.env.PORT, () => {
    console.log(`Server started at port : ${process.env.PORT}`)
})