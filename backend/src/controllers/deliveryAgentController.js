const DeliveryAgent = require("../models/DeliveryAgent");

const getDeliveryAgents = async (req, res, next) => {
  try {
    const agents = await DeliveryAgent.find().lean();
    res.status(200).json({ success: true, count: agents.length, data: agents });
  } catch (error) {
    next(error);
  }
};

const createDeliveryAgent = async (req, res, next) => {
  try {
    const { name, contact, vehicle, isAvailable } = req.body;

    if (!name || !contact) {
      return res
        .status(400)
        .json({ success: false, message: "Name and contact are required" });
    }

    const agent = await DeliveryAgent.create({
      name,
      contact,
      vehicle: vehicle || "",
      isAvailable: typeof isAvailable === "boolean" ? isAvailable : true,
    });

    res.status(201).json({ success: true, data: agent });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDeliveryAgents,
  createDeliveryAgent,
};
//hi
