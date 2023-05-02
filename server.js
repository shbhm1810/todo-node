const express = require('express')
require('dotenv').config()
var cookies = require("cookie-parser");
const mongoose = require('mongoose')
const connectDB = require('./config/dbConnection')
var bodyParser = require('body-parser')

connectDB()
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookies())

app.use('/register',require('./routes/registerUser'))
app.use('/login',require('./routes/loginUser'))
app.use('/logout',require('./routes/logout'))



mongoose.connection.once('open',() => {
    console.log('Connected to Mongo DB')
    app.listen(process.env.PORT, () => {
        console.log(`Server running on ${process.env.PORT}`)
    })
})
