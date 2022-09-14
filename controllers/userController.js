const { Bookmark, Favorite, User } = require('../models')
const { comparePassword, generateToken, verifyToken } = require('../helper/helper')
const axios = require('axios')
const Mailjet = require('node-mailjet');
const mailjet = Mailjet.apiConnect(process.env.API, process.env.SECRET_API);

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
      if (err.name == 'SequelizeValidationError') {
        res.status(400).json({ message: err.errors[0].message})
      } else if (err.name == 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: 'Email must be unique'})
      } else {
        res.status(500).json({ message: 'Internal server error' })
      }
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      console.log(email, password)
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
      if (err.name == 'invalidEmailPassword') {
        res.status(401).json({ message: 'Invalid email/password' })
      } else if (err.name == 'SequelizeValidationError') {
        res.status(400).json({ message: err.errors[0].message})
      } else { 
        res.status(500).json({ message: 'Internal Server Error' })
      }
    }
  }

  static async findUser(req, res, next) {
    try {
      const { id } = req.user
      let result = await User.findByPk(id, { attributes: { exclude: ['password'] } })
      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }


  static async bookmark(req, res, next) {
    try {
      const data = await Bookmark.findAll({ include: [ User ] })
      
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  static async addBookmark(req, res, next) {
    try {
      const { title, rightHand, leftHand, helmet, chestArmor, gauntlet, legArmor } = req.body
      const UserId = req.user.id

      let urlWeapon =''
      let urlLeg = ''
      let urlGauntlet = ''
      let urlChest = ''
      let urlHelmet = ''
      let urlShield = ''

      if (rightHand) {
        const queryWeapon = `
        query weapon {
          weapon(name: "${rightHand}") {
            image
          }
        }`
        const weapon = await axios({
          method: 'POST',
          url: 'https://eldenring.fanapis.com/api/graphql',
          data: { query: queryWeapon },
        })
        urlWeapon = weapon.data.data.weapon[0].image
      } 
      if (leftHand) {
        const queryShield = `
        query shield {
          shield(name: "${leftHand}") {
            image
          }
        }`
        const shield = await axios({
          method: 'POST',
          url: 'https://eldenring.fanapis.com/api/graphql',
          data: { query: queryShield },
        })
        urlShield = shield.data.data.shield[0].image
      }
      if (helmet) {
        const queryHelmet = `
        query armor {
          armor(name: "${helmet}") {
            image
          }
        }`
        const helm = await axios({
          method: 'POST',
          url: 'https://eldenring.fanapis.com/api/graphql',
          data: { query: queryHelmet },
        })
        urlHelmet = helm.data.data.armor[0].image
      }
      if (chestArmor) {
        const queryChest = `
        query armor {
          armor(name: "${chestArmor}") {
            image
          }
        }`
        const chest = await axios({
          method: 'POST',
          url: 'https://eldenring.fanapis.com/api/graphql',
          data: { query: queryChest },
        })
        urlChest = chest.data.data.armor[0].image
      }
      if (gauntlet) {
        const queryGauntlet = `
        query armor {
          armor(name: "${gauntlet}") {
            image
          }
        }`
        const glove = await axios({
          method: 'POST',
          url: 'https://eldenring.fanapis.com/api/graphql',
          data: { query: queryGauntlet },
        })
        urlGauntlet = glove.data.data.armor[0].image
      }
      if (legArmor) {
        const queryLeg = `
        query armor {
          armor(name: "${legArmor}") {
            image
          }
        }`
        const leg = await axios({
          method: 'POST',
          url: 'https://eldenring.fanapis.com/api/graphql',
          data: { query: queryLeg },
        })
        urlLeg = leg.data.data.armor[0].image
      }
      
      const data = await Bookmark.create({
        title,
        rightHand: urlWeapon,
        leftHand: urlShield,
        helmet: urlHelmet,
        chestArmor: urlChest,
        gauntlet: urlGauntlet,
        legArmor: urlLeg,
        UserId
      })


      const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: {
                Email: "b.hellostereo@gmail.com",
                Name: "Mailjet Pilot"
              },
              To: [
                {
                  Email: req.user.email,
                  Name: "user"
                }
              ],
              Subject: "Your email flight plan!",
              TextPart: "You Have Successfully post your own customization drip",
            }
          ]
        })

      request
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        })
      res.status(201).json(data)
    } catch (err) {
      res.status(404).json({ message: 'Data not found' })
    }
  }

}

module.exports = UserClass