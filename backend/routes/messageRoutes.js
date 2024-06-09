const express = require('express');
const router = express.Router();
const { createMessage } = require('../models/messageModel');

router.post('/', async (req, res) => {
  try {
    const { conversationId, direction, content } = req.body;
    const message = await createMessage(conversationId, direction, content);
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
