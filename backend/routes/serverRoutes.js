const express = require('express');
const router = express.Router();
const serverController = require('../controllers/serverController');

// GET /api/server/status — Get server monitoring stats
router.get('/status', serverController.getStatus);

module.exports = router;
