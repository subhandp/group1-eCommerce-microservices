const models = require('../models')
const response = require('../helpers/response');


class DiscountController{
    static async create (req, res) {
        try {
            const insert = await models.Discount.create({ ...req.body })
            res.status(201).json(response('success', 'discount created', insert))
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }

    static async show(req, res) {
        const data = await models.Discount.findAll();
        response.data = data;
        response.message = "Succes get data";
    
        res.json(response);
    }

    static async find(req, res) {
        const { id } = req.params;
        const data = await models.Discount.findByPk(id);
        try {
            if (!data) throw new Error("Discount not found");
            response.data = data;
            response.status = "success";
            res.json(response);
        } catch (error) {
            response.message = error.message;
            response.data = {};
            response.status = "fail";
            res.status(404).json(response);
        }
    }

    static async update(req, res) {
        try {
            if (req.params.id != req.discountId) {
                return res.status(401).json("Discount not found")
            }
            const data = await models.Discount.findByPk(req.discountId)
            await models.Discount.update(req.body, {
                where: {
                    id: req.discountId,
                },
            })
            response.data = {
                "New Data" : req.body,
                "Old Data" : {
                    address_name: data.dataValues.discountName,
                    city: data.dataValues.expired,
                    zipcode: data.dataValues.total
                }
            }
            response.message = "Data is successfully updated";
            response.status = "Success"
            res.status(201).json(response);
        } catch(error) {
            response.status = "Fail",
            response.message = error.message,
            res.status(400).json(response)
        }
    }

    static async delete(req, res) {
        const { id } = req.params;
        const data = await models.Discount.destroy({ 
            where: {
                id: id
            }
        });

        try {
            if (data) {
            response.message = "Delete succes";
            res.status(200).json(response);
        }
        } catch (err) {
            response.status = "Data tidak ada";
            response.message = err.message;
            res.status(400).json(response);
        }
    }
    

}

module.exports = DiscountController
