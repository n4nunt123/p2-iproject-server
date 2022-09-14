const { Bookmark, Favorite, User, Weapon, Armor, Shield } = require('../models')
const { comparePassword, generateToken, verifyToken } = require('../helper/helper')


class LocalClass {
  static async getWeapon(req, res, next) {
    try {
      const { page } = req.query
      let startingPage = 0

      if(page > 1) {
        startingPage = (page - 1) * 15
      }

      const data = await Weapon.findAll({
        limit: 15,
        offset: startingPage
      })

      const count = await Weapon.count()
      const response = {
        rows: data,
        totalData: Math.ceil(count/15)
      }
      res.status(200).json(response)
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  static async getArmor(req, res, next) {
    try {
      const data = await Armor.findAll()
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  
  static async getShield(req, res, next) {
    try {
      const data = await Shield.findAll()
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}

module.exports = LocalClass