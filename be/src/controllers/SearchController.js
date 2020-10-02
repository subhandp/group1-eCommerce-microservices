const models = require('../models')
const response = require('../helpers/response')
const pagination = require('../helpers/pagination')
const Op = require('sequelize').Op

class Controller {
    static async find(req, res) {
        try {
            const count = await models.Product.findAndCountAll({
                where: {
                   [Op.or] : [
                       {
                            name: {
                                [Op.like] : `%${req.query.query}`
                            }
                       },
                       {
                           description: {
                                [Op.like] : `%${req.query.query}%`
                           }
                       }
                   ]
                },
                include: [
                    {
                        model: models.Admin,
                        attributes: ['id', 'username', 'email']
                    }
                ]
            })
            
            return res
                .status(200)
                .json(response('Success', 'Search concluded', count))
        } catch (error) {
            return res
            .status(500)
            .json(response('Success', error.message))
        }
    }
}

module.exports = Controller