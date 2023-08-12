const router = require('express').Router();
const { User, Thought, Reaction } = require('../models');

// GET ALL THOUGHTS //
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET THOUGHT BY ID //
router.get('/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');

    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE THOUGHT / UPDATE THOUGHT ARRAY //
router.post('/', async (req, res) => {
  try {
    const thought = await Thought.create(req.body);

    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { thoughts: thought._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE THOUGHT BY ID //
router.put('/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'No thought with this ID' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE THOUGHT BY ID //
router.delete('/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

    if (!thought) {
      return res.status(404).json({ message: 'No thought with this ID' });
    }

    await User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } }
    );

    res.json({ message: 'Thought successfully deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE NEW REACTION AND ADD //
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'No thought with this ID' });
    }

    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE RECTION BY ID //
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'No thought with this ID' });
    }

    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;