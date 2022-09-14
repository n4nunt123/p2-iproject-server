const express = require('express')
const user = require('./user')
const localD = require('./local')
const eldenRingAPI = require('./fanapis')
const route = express.Router()

route.use(user)
route.use('/erapi', eldenRingAPI)
route.use('/local', localD)

module.exports = route