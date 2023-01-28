const express = require('express');
const router = express.Router();
const frienshipController = require('../controllers/friendship_controller');

router.get('/add/:id', frienshipController.add);
router.get('/remove/:id', frienshipController.remove);

module.exports = router;