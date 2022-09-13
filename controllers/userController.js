const { Bookmark, Favorite, User } = require('../models')
const { comparePassword, generateToken, verifyToken } = require('../helper/helper')


class UserClass {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body
      const data = await User.create({ username, email, password })
      res.status(201).json({
        id: data.id,
        email: data.email
      })
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      let data = await User.findOne({ where: { email } })
      if (!data) {
        throw { name: "invalidEmailPassword"}
      }
      
      let validationPassword = comparePassword(password, data.password)
      if (!validationPassword) {
        throw { name: "invalidEmailPassword"}
      }
      
      const payload = { id: data.id }
      const access_token = generateToken(payload)

      res.status(200).json({ access_token })
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  
}

module.exports = UserClass