const express = require('express')
const handleUserLogout = require('../../controllers/userLogoutController')

const router = express.Router()

router.get('/',handleUserLogout)

module.exports = router