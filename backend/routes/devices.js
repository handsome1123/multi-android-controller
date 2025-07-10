const express = require('express');
const router = express.Router();
const { getDevices, sendCommand } = require('../controllers/adbController');

router.get('/', getDevices); // GET /api/devices
router.post('/:id/command', sendCommand); // POST /api/devices/<device-id>/command

module.exports = router;
