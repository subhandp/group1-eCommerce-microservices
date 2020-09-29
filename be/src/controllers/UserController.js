const models = require('../models')
const response = require('../helpers/response')

const att = ['id', 'username', 'lastName', 'firstName', 'email', 'phoneNumber']

class Controller {
    static async update(req, res) {
        try {
            await models.User.update({
                firstName: req.body.data.first_name,
                lastName: req.body.data.last_name,
                email: req.body.data.email,
                phoneNumber: req.body.data.phone_number
            }, {
                where: {
                    id: req.params.id
                }
            })

            return res
                .status(200)
                .json(response('Success', 'Profile has been updated'))

        } catch (error) {
            return res
                .status(500)
                .json(response('Fail', error.message))
        }
    }

    static async find(req, res) {
        try {
            const user = await models.User.findByPk(req.params.id, {
                attributes: att
            })
            return res
                .status(200)
                .json(response('Success', 'Data has been retrieved', user))

        } catch (error) {
            return res
                .status(500)
                .json(response('Fail', error.message))
        }
    }
}

module.exports = Controller