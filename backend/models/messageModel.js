const pool = require('../db');

const createMessage = async (conversationId, direction, content) => {
  try {  
     // Fetch the next value from the sequence for message_id
    const nextMessageId = await pool.query('SELECT nextval(\'messages_message_id_seq\')');

    // Extract the next message ID from the query result
    const messageId = nextMessageId.rows[0].nextval;

    // Insert user's message
    const userMessage = await pool.query(
      'INSERT INTO messages (message_id, conversation_id, direction, content) VALUES ($1, $2, $3, $4) RETURNING *',
      [messageId, conversationId, direction, content]
    );

     // Update the last updated timestamp of the conversation
     await pool.query(
      'UPDATE conversations SET last_updated = CURRENT_TIMESTAMP WHERE conversation_id = $1',
      [conversationId]
    );
    
    // Fetch the count of previous bot responses to determine the next response
    const botMessageCount = await pool.query(
      'SELECT COUNT(*) FROM messages WHERE conversation_id = $1 AND direction = $2',
      [conversationId, 'out']
    );

    const nextBotResponseIndex = parseInt(botMessageCount.rows[0].count) + 1;

    // Fetch the next bot response from the database based on sequence_number
    const botResponse = await pool.query(
      'SELECT content FROM messages WHERE direction = $1 AND sequence_number = $2',
      ['out', nextBotResponseIndex]
    );

    if (botResponse.rows.length > 0) {
      // Update the timestamp and conversation_id of the next bot response
      await pool.query(
        'UPDATE messages SET timestamp = CURRENT_TIMESTAMP, conversation_id = $1 WHERE direction = $2 AND sequence_number = $3',
        [conversationId, 'out', nextBotResponseIndex]
      );
  
      // Fetch the updated bot response
      const updatedBotResponse = await pool.query(
        'SELECT * FROM messages WHERE conversation_id = $1 AND direction = $2 AND sequence_number = $3',
        [conversationId, 'out', nextBotResponseIndex]
      );

      return [userMessage.rows[0], updatedBotResponse.rows[0]];

    } else {
      return [userMessage.rows[0]];
    }
  } catch (err) {
    console.error(err.message);
    throw new Error('Internal Server Error');
  }
  
};

module.exports = {
  createMessage,
};
