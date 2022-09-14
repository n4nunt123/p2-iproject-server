const { Bookmark, Favorite, User, Weapon } = require('../models')
const axios = require('axios')


class FanapisController {
  static async getCategoryWeapon (req, res, next) {
    try {
      const { category } = req.params

      const graphqlQuery = `
      query weapon {
        weapon(category:"${category}" page: 0, limit:100) {
          id,
          name,
          image,
          description
          attack{
            amount,
            name
          },
          defence{
            amount,
            name
          },
          scalesWith{
            scaling,
            name
          },
          requiredAttributes{
            amount,
            name
          },
          category,
          weight
        }
      }`
      const { data } = await axios({
        method: 'POST',
        url: 'https://eldenring.fanapis.com/api/graphql',
        data: { query: graphqlQuery },
      })
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  
  static async getCategoryArmor (req, res, next) {
    try {
      const { category } = req.params

      const graphqlQuery = `
      query armor {
        armor(category:"${category}" page: 0, limit:100) {
          id,
          name,
          image,
          description,
          category,
          weight
        }
      }`
      const { data } = await axios({
        method: 'POST',
        url: 'https://eldenring.fanapis.com/api/graphql',
        data: { query: graphqlQuery },
      })
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
  
  
  static async getCategoryShield (req, res, next) {
    try {
      const { category } = req.params

      const graphqlQuery = `
      query shield {
        shield(category:"${category}" page: 0, limit:100) {
          id,
          name,
          image,
          description,
          category,
          weight
        }
      }`
      const { data } = await axios({
        method: 'POST',
        url: 'https://eldenring.fanapis.com/api/graphql',
        data: { query: graphqlQuery },
      })
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
  
  
  static async getCategoryTalisman (req, res, next) {
    try {
      const { page } = req.query
      console.log(page)

      const graphqlQuery = `
      query talisman {
        talisman(page: ${page}, limit:15) {
          id,
          name,
          image,
          description,
          effect
        }
      }`
      const { data } = await axios({
        method: 'POST',
        url: 'https://eldenring.fanapis.com/api/graphql',
        data: { query: graphqlQuery },
      })
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}

module.exports = FanapisController