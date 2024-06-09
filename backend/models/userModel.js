const pool = require('../db');

const getUserById = async (userId) => {
  const res = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
  return res.rows[0];
};

module.exports = {
  getUserById,
};
