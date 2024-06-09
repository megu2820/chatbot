const pool = require('../db');

const getConversationById = async (conversationId) => {
  try {
    const conversation = await pool.query('SELECT * FROM conversations WHERE conversation_id = $1', [conversationId]);
    const messages = await pool.query('SELECT * FROM messages WHERE conversation_id = $1 ORDER BY timestamp', [conversationId]);
    return { conversation: conversation.rows[0], messages: messages.rows };
  } catch (err) {
    // If there's an error, throw it so it can be caught by the caller
    throw new Error('Internal Server Error');
  }
};

module.exports = {
  getConversationById,
};
