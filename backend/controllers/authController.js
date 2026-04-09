const jwt = require('jsonwebtoken');
const { credentials, jwt: jwtConfig } = require('../config/auth');

/**
 * Auth Controller
 * Handles login and token generation
 */

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    // Check credentials
    if (username !== credentials.username || password !== credentials.password) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username, role: 'admin' },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    res.json({
      message: 'Login successful.',
      token,
      user: { username, role: 'admin' },
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = { login };
