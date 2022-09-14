const express = require('express')
const LocalClass = require('../controllers/localController')
const route = express.Router()

route.get('/weapons', LocalClass.getWeapon)
route.get('/armors', LocalClass.getArmor)
route.get('/shields', LocalClass.getShield)

module.exports = route