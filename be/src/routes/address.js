const router = require('express').Router()
const AddressController = require("../controllers/AddressController");

router.get("/", AddressController.read);

router.post("/", AddressController.create);

router.get("/:id", AddressController.find);

router.patch("/:id", AddressController.update);

router.delete("/:id", AddressController.delete);

module.exports = router
