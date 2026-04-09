const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// CRUD
router.get('/', projectController.getAll);
router.post('/', projectController.create);
router.delete('/:id', projectController.remove);

// Docker control
router.post('/:id/start', projectController.start);
router.post('/:id/stop', projectController.stop);
router.post('/:id/restart', projectController.restart);

// Logs
router.get('/:id/logs', projectController.getLogs);

// Nginx config
router.get('/:id/nginx-config', projectController.getNginxConfig);

module.exports = router;
