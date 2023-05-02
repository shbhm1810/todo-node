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
    todoItems: [{
        title: {
            type: String,
            required: true
        },
        isCompleted: {
            type: Boolean,
            required: false
        },
        itemId: { type: Schema.ObjectId , auto: true }
    }],
    refreshToken: String
})

module.exports = mongoose.model('User', userSchema);