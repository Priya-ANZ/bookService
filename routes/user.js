const UserController = require('../controllers/user.controller.js')
const express = require('express');
const router = express.Router()

router.post('/register', UserController.register)
router.post('/login',UserController.login)

module.exports = router