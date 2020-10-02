const router = require('express').Router()
const AddressController = require("../controllers/AddressController");
const { runValidation, validationCreate } = require("../controllers/validation/address")

router.get("/", AddressController.read);

router.post("/", runValidation, validationCreate, AddressController.create);

router.get("/:id", AddressController.find);

router.patch("/:id", AddressController.update);

router.delete("/:id", AddressController.delete);

module.exports = router
