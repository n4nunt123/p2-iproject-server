const express = require('express')
const User = require('../controllers/userController')
const route = express.Router()

route.post('/register', User.register)
route.post('/login', User.login)

module.exports = route