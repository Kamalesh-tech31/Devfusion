const express = require("express");
const router = express.Router();
const {
  getDeliveryAgents,
  createDeliveryAgent,
} = require("../controllers/deliveryAgentController");

router.get("/", getDeliveryAgents);
router.post("/", createDeliveryAgent);

module.exports = router;
