const models = require('../models')
const response = require('../helpers/response');


class AddressController{
    static async create(req,res) {
        const {
            body: { adminId, userId, addressName, city, zipcode, address },
          } = req;
      
          try {
            const insert = await models.Address.create({
              adminId,
              userId,
              addressName,
              city,
              zipcode,
              address
            });
            response.data = insert;
            response.message = "Succes save data";
      
            res.status(201).json(response);
          } catch (error) {
            response.data = [];
            response.message = "failed save data";
            res.status(400).json(response);
          }
    }
    
    static async read(req, res) {
        try {
            const data = await models.Address.findAll({ attributes: ["adminId", "userId", "addressName","city","zipcode", "address"],
            });
            response.data = data
            response.message = "Data is successfully retrieved"
            response.status = "Success"
            response.address = req.address;
            res.status(200).json(response);
        } catch(error) {
            response.status = "Fail",
            response.message = error.message,
            res.status(400).json(response)
        }
     }

     static async find(req, res) {
        const { id } = req.params;
        const addressdetail = await models.Address.findByPk(id);
        try {
          if (!addressdetail) throw new Error("Addres not found");
          response.data = addressdetail;
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
            if (req.params.id != req.addressId) {
                return res.status(401).json("Address not found")
            }
            const data = await models.Address.findByPk(req.addressId)
            await models.Address.update(req.body, {
                where: {
                    id: req.addressId,
                },
            })
            response.data = {
                "New Data" : req.body,
                "Old Data" : {
                    address_name: data.dataValues.addressName,
                    city: data.dataValues.city,
                    zipcode: data.dataValues.zipcode,
                    address: data.dataValues.address
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
        const data = await models.Address.destroy({ 
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

module.exports = AddressController;