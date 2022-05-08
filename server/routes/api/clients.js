const express = require("express");
const router = express.Router();
const clientsController = require("../../controllers/clientsController");
const verifyJWT = require("../../middleware/verifyJWT")

router.route('/')
  .get(verifyJWT, clientsController.getAllClients)
  .post(clientsController.createNewClient)
  .put(clientsController.updateClient)
  .delete(clientsController.deleteClient);

router.route("/:email").get(clientsController.getClient);

module.exports = router;
