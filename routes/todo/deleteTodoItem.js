const express = require('express')
const handleDeleteTodo = require('../../controllers/deleteTodoController')

const router = express.Router()


router.post('/',handleDeleteTodo);

module.exports = router
