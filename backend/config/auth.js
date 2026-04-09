/**
 * Authentication configuration
 * For v1: hardcoded credentials. Replace with database lookup later.
 */
module.exports = {
  // Hardcoded admin credentials (v1 only)
  credentials: {
    username: 'admin',
    password: 'admin123',
  },

  // JWT configuration
  jwt: {
    secret: 'mectov-hosting-secret-key-change-in-production',
    expiresIn: '24h',
  },
};
