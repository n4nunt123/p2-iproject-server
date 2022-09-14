const express = require('express')
const User = require('../controllers/userController')
const authentification = require('../middlewares/authentication')
const route = express.Router()

route.post('/register', User.register)
route.post('/login', User.login)
route.get('/bookmark', User.bookmark)

route.get('/user', authentification, User.findUser)
route.post('/bookmark', authentification, User.addBookmark)

module.exports = route