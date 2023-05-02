const express = require('express')
require('dotenv').config()
var cookies = require("cookie-parser");
const mongoose = require('mongoose')
const connectDB = require('./config/dbConnection')
var bodyParser = require('body-parser')

connectDB()

const app = express()
app.use(cookies())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/register',require('./routes/auth/registerUser'))
app.use('/login',require('./routes/auth/loginUser'))
app.use('/logout',require('./routes/auth/logout'))
app.use('/addItem',require('./routes/todo/addTodoItem'))
app.use('/editItem',require('./routes/todo/editTodoItem'))
app.use('/deleteItem',require('./routes/todo/deleteTodoItem'))



mongoose.connection.once('open',() => {
    console.log('Connected to Mongo DB')
    app.listen(process.env.PORT, () => {
        console.log(`Server running on ${process.env.PORT}`)
    })
})
