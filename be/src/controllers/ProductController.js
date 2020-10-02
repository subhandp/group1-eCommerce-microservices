const models = require('../models')
const response = require('../helpers/response')
const conf = require('../config/cloudinary-config')
const pagination = require('../helpers/pagination')

const cloudinary = require('cloudinary').v2
cloudinary.config(conf)

class Controller {
    static async create(req, res) {
        try {
            const { adminId, name, price, weight, description, tags, stock, category, color, size, material } = req.body

            const upload = req.files.picture

            const image = await cloudinary.uploader.upload(
                upload.tempFilePath, (err, result) => {
                    if (result == undefined) {
                        throw new Error(`Error uploading to cloudinary: ${err.message}`)
                    }
                }   
            )

            const product = await models.Product.create({
                adminId,
                name,
                price,
                weight,
                description,
                tags,
                stock,
                imageId: image.public_id,
                imageName: image.secure_url
            })

            await models.Category.create({
                productId: product.id,
                categoryName: category
            })

            await models.Variation.create({
                productId: product.id,
                color,
                size,
                material
            })

            return res
                .status(200)
                .json(response('Success', 'Product has been created'))
        } catch (error) {
            return res
                .status(500)
                .json(response('Fail', error.message))
        }
    }

    static async update(req, res) {
        try {
            const { name, price, weight, description, tags, stock, category, color, size, material } = req.body
            if (req.files.picture) {
                const product = await models.Product.findByPk(req.params.id)
                await cloudinary.uploader.destroy(product.imageId,
                    function(error, result) {
                        if(error) {
                            throw new Error(`Error deleting cloudinary: ${error.message}`)
                        }
                    }
                )
                const upload = req.files.picture
                
                const image = await cloudinary.uploader.upload(
                    upload.tempFilePath, (err, result) => {
                        if (result == undefined) {
                            throw new Error(`Error uploading to cloudinary: ${err.message}`)
                        }
                    }   
                )

                await models.Product.update({
                    imageId: image.public_id,
                    imageName: image.secure_url
                }, {
                    where: {
                        id: req.params.id
                    }
                })
            }

            await models.Product.update({
                name,
                price,
                weight,
                description,
                tags,
                stock,
            }, {
                where: {
                    id: req.params.id
                }
            })

            await models.Category.update({
                categoryName: category,
            }, {
                where: {
                    productId: req.params.id
                }
            })

            await models.Variation.update({
                color,
                size,
                material
            }, {
                where: {
                    productId: req.params.id
                }
            })

            return res
                .status(200)
                .json(response('Success', 'Data has been updated'))
        } catch (error) {
            return res
                .status(500)
                .json(response('Fail', error.message))
        }
    }

    static async find(req, res) {
        try {
            const product = await models.Product.findByPk(req.params.id,{
                include: [
                    {
                        model: models.Admin,
                        attributes: ['id', 'address', 'idCity', 'city']
                    },
                    {
                        model: models.Category,
                        attributes: ['categoryName']
                    },
                    {
                        model: models.Variation,
                        attributes: ['color','size','material']
                    }
                ]
            })
            
            return res
                .status(200)
                .json(response('Success', 'Data has been retrieved', product))

        } catch (error) {
            return res
                .status(500)
                .json(response('Fail', error.message))
        }
    }

    static async show(req, res) {
        const count = await models.Product.count()

        const page = pagination({
            limit: req.query.limit,
            page: parseInt(req.query.page),
            count: count,
        })

        const show = await models.Product.findAll({
            limit: page.limit,
            offset: page.offset,
            include: [
                {
                    model: models.Admin,
                    attributes: ['id', 'username', 'email']
                }
            ]
        })
        
        return res
            .status(200)
            .json(response('Success', 'All data has been retrieved', {
                Product: show,
                totalItems: page.totalItems,
                totalPages: page.totalPages,
                currentPage: page.currentPage,
            }))
    }

    static async delete(req, res) {
        try {
            const product = await models.Product.destroy({
                where: {
                    id: req.params.id
                }
            })

            if(!product) {
                throw new Error(error.message)
            }
            
            return res
                .status(200)
                .json(response('Success', 'Product has been deleted'))

        } catch (error) {
            return res
                .status(500)
                .json(response('Fail', error.message)   )
        }
    }
}

module.exports = Controller