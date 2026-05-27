const express = require('express');
const {
  getAllDeliveries,
  getActiveDeliveries,
  getHistoryDeliveries,
  getDashboard,
  getEarnings,
  updateDeliveryStatus,
  createDelivery,
  updateDelivery,
  deleteDelivery,
} = require('../controllers/deliveryController.js');

const router = express.Router();

// Dashboard
router.get('/dashboard', getDashboard);

// Earnings
router.get('/earnings', getEarnings);

// History
router.get('/history', getHistoryDeliveries);

// All deliveries
router.get('/', getAllDeliveries);

// Create delivery
router.post('/', createDelivery);

// Update whole delivery (PUT)
router.put('/:id', updateDelivery);

// Delete delivery
router.delete('/:id', deleteDelivery);

// Update delivery status
router.patch('/:id/status', updateDeliveryStatus);

module.exports = router;
