const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get('/', inventoryController.getInventory);
router.get('/low', inventoryController.getLowStock);
router.put('/:productId', inventoryController.updateStock);

module.exports = router;
