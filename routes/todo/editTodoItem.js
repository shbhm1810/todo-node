const express = require('express')
const handleEditTodo = require('../../controllers/editTodoController')

const router = express.Router()


router.post('/',handleEditTodo);

module.exports = router
