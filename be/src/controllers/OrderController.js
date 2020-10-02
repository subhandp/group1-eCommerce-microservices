const models = require('../models')
const response = require('../helpers/response')
const core = require('../config/core')
const billing = require('../helpers/payment/billing')
const shipping = require('../helpers/payment/shipping')
const pagination = require('../helpers/pagination')

class Controller {
    static async create(req, res) {
        try {
            const order = await models.Order.create({
                userId: req.user_id,
                discountId: req.body.data.discountId,
                courierName: req.body.data.courierName,
                courierService: req.body.data.courierService,
                courierPrice: req.body.data.courierPrice,
                totalPayment: req.body.data.totalPayment
            })

            if (!order) {
                throw new Error(error.message)
            }
            
            req.body.data.items.forEach( async (val) => {
                await models.Order_Item.create({
                    orderId: order.id,
                    productId: val.productId,
                    quantity: val.quantity
                })
            })

            const user = await models.User.findByPk(req.user_id)
            const admin = await models.Admin.findByPk(req.body.data.items[0].adminId)

            const parameter = {
                "payment_type": "bank_transfer",
                
                "customer_details" : {
                    "first_name": user.firstName,
                    "last_name": user.lastName,
                    "email": user.email,
                    "phone": user.phoneNumber,
                    "billing_address": billing(user.firstName, user.lastName, user.phoneNumber, user.address, user.city, user.zipCode),
                    "shipping_address": shipping(admin.firstName, admin.lastName, admin.phoneNumber, admin.address, admin.city, admin.zipCode)
                },

                "transaction_details": {
                    "gross_amount": req.body.data.totalPayment,
                    "order_id": `order-${order.id}-${new Date().getTime()}`,
                },

                "bank_transfer":{
                    "bank": req.body.data.bank
                }
            };
            core.charge(parameter)
                .then( async (chargeResponse) => {
                    const payment = await models.Payment.create({
                        orderId: order.id,
                        token: chargeResponse.transaction_id,
                        paymentHeader: chargeResponse.order_id
                    })
                    return res
                        .status(200)
                        .json(response('Success', 'Order Created', { order_id: payment.paymentHeader, transaction_id: payment.token }))
                })
                .catch((e)=>{
                    throw new Error(e.message)
                });

        } catch (error) {
            return res
                .status(500)
                .json(response('Fail', error.message))
        }
    }

    static async find(req, res) {
        try {
            const payment = await models.Payment.findByPk(req.params.id, {
                include: [
                    {
                        model: models.Order,
                        include: [{
                            model: models.Order_Item,
                            include: [{
                                model: models.Product
                            }]
                        }]
                    }
                ]
            })
            
            if(!payment) {
                throw new Error(error.message)
            }

            return res
                .status(200)
                .json(response('Success', 'Data has been retrieved', payment))

        } catch (error) {
            return res
                .status(500)
                .json(response('Fail', error.message))
        }
    }

    static async show(req, res) {
        try {
            const count = await models.Payment.count()

            const page = pagination({
                limit: req.query.limit,
                page: parseInt(req.query.page),
                count: count,
            })

            const show = await models.Payment.findAll({
                limit: page.limit,
                offset: page.offset,
                include: [
                    {
                        model: models.Order,
                        include: [{
                            model: models.Order_Item,
                            include: [{
                                model: models.Product
                            }]
                        }]
                    }
                ]   
            })

            if (!show) {
                throw new Error(error.message)
            }

            return res
                .status(200)
                .json(response('Success', 'Data has been retrieved', {
                    Payment: show,
                    totalItems: page.totalItems,
                    totalPages: page.totalPages,
                    currentPage: page.currentPage,
                }))
            
        } catch (error) {
            return res
                .status(500)
                .json(response('Fail', error.message))
        }
    }

    static async update(req, res) {
        core.transaction.notification(req.body)
            .then(async (statusResponse)=>{
                    // console.log(statusResponse);
                    // let orderId = statusResponse.order_id;
                    // let transactionStatus = statusResponse.transaction_status;
                    // let fraudStatus = statusResponse.fraud_status;
            
                    // console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

                    await models.Payment.update({
                        status: statusResponse.transaction_status
                    }, {
                        where: {
                            paymentHeader: statusResponse.order_id
                        }
                    })

                    return res
                        .status(200)
                        .json(response('Success', 'Order Created', { statusResponse }))
                })
                .catch((error) => {
                    return res
                        .status(500)
                        .json(response('Fail', 'error occured', error.message))
                })
    }

    static async delete(req, res) {
        try {
            const payment = await models.Payment.destroy({
                where: {
                    id: req.params.id
                }
            })

            if(!payment) {
                throw new Error(error.message)
            }
            
            return res
                .status(200)
                .json(response('Success', 'Payment has been deleted'))

        } catch (error) {
            return res
                .status(500)
                .json(response('Fail', error.message)   )
        }
    }
}

module.exports = Controller