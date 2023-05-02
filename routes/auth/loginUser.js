const express = require('express')
const handleUserLogin = require('../../controllers/userLoginController')

const router = express.Router()

router.post('/',handleUserLogin)

module.exports = router