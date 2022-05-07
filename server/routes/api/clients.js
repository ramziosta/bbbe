const express = require("express");
const router = express.Router();
const path = require("path");
const clientsController = require("../../controllers/clientsController");

const data = {};

data.clients = require("../../data/clients.json");

router.route("/")
  .get(clientsController.getAllClients)
  .post(clientsController.createNewClient)
  .put(clientsController.updateClient)
  .delete(clientsController.deleteClient);

router.route("/:email").get(clientsController.getClient);

module.exports = router;
