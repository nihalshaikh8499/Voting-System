const express = require('express');
const Poll = require('../models/Polls.js');
const auth = require('../middleware/auth.js');
const router = express.Router();
// Get all polls, include whether current user already voted
router.get('/', auth, async (req, res) => {
  const polls = await Poll.find().sort({ createdAt: -1 });
  const result = polls.map(p => {
    const pObj = p.toObject();
    const voteRecord = pObj.voters.find(v => v.user.toString() === req.user.id);
    pObj.userVote = voteRecord ? voteRecord.option : null;
    delete pObj.voters;
    return pObj;
  });
  res.json(result);
});

// Create a new poll
router.post('/', auth, async (req, res) => {
  const { question, options } = req.body;
  const poll = new Poll({
    question,
    options: options.map(text => ({ text })),
    createdBy: req.user.id
  });
  await poll.save();
  res.json(poll);
});

module.exports = router;