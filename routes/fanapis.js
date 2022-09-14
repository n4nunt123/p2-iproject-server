const express = require('express')
const axios = require('axios')
const FanapisController = require('../controllers/fanapisController')
const route = express.Router()

route.get('/test', async (req, res, next) => {
  try {
    const { data } = await axios({
      method: 'GET',
      url: 'https://eldenring.fanapis.com/api/weapons',
      params: { name: 'Forked Hatchet' }
    })
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

route.post('/weapon/:category', FanapisController.getCategoryWeapon)
route.post('/armor/:category', FanapisController.getCategoryArmor)
route.post('/shield/:category', FanapisController.getCategoryShield)
route.post('/talisman', FanapisController.getCategoryTalisman)


module.exports = route
