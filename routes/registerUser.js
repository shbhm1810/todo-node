const express = require('express')
const handleRegisterUser = require('../controllers/registerUserController')

const router = express.Router()

router.post('/',(handleRegisterUser))

module.exports = router