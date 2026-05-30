const express = require("express");
const {
  getAllDeliveryAgents,
  getDeliveryAgentById,
  createDeliveryAgent,
  updateDeliveryAgent,
  deleteDeliveryAgent,
} = require("../controllers/deliveryAgentController");

const router = express.Router();

router.get("/", getAllDeliveryAgents);
router.get("/:id", getDeliveryAgentById);
router.post("/", createDeliveryAgent);
router.put("/:id", updateDeliveryAgent);
router.delete("/:id", deleteDeliveryAgent);

module.exports = router;
