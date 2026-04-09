const serverService = require('../services/serverService');

/**
 * Server Controller
 * Returns server monitoring stats
 */

const getStatus = async (req, res) => {
  try {
    const status = serverService.getStatus();
    res.json(status);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getStatus };
