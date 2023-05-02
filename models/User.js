const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    todoItems: {
        type: Array,
        default: [],
        required: false
    },
    refreshToken: String
})

module.exports = mongoose.model('User', userSchema);