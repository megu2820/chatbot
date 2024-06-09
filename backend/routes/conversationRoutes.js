const express = require('express');
const router = express.Router();
const { getConversationById } = require('../models/conversationModel');

router.get('/:id', async (req, res) => {
  try {
    const conversation = await getConversationById(req.params.id);
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
