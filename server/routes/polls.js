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

// Vote on an option (one per user)
router.post('/:id/vote', auth, async (req, res) => {
  const { optionId } = req.body;
  const poll = await Poll.findById(req.params.id);
  if (!poll) return res.status(404).json({ msg: 'Poll not found' });

  if (poll.voters.some(v => v.user.toString() === req.user.id)) {
    return res.status(400).json({ msg: 'You have already voted' });
  }

  const option = poll.options.id(optionId);
  if (!option) return res.status(400).json({ msg: 'Option not found' });

  option.votes++;
  poll.voters.push({ user: req.user.id, option: optionId });
  await poll.save();

  const pObj = poll.toObject();
  pObj.userVote = optionId;
  delete pObj.voters;
  res.json(pObj);
});

module.exports = router;