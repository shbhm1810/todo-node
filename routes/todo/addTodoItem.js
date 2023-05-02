const express = require('express')
const handleAddTodo = require('../../controllers/addTodoController')

const router = express.Router()


router.post('/',handleAddTodo);

module.exports = router
