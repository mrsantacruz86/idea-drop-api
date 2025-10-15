import express from 'express';
const router = express.Router();
import Idea from '../models/Idea.js';
import mongoose from 'mongoose';

// @route             GET /api/ideas
// @description       Get all ideas
// @access             Public
router.get('/', async (req, res, next) => {
  try {
    const ideas = await Idea.find();
    res.json(ideas);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// @route             GET /api/ideas/:id
// @description       Get single idea
// @access             Public
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error('Idea not Found');
    }

    const idea = await Idea.findById(id);

    if (!idea) {
      res.status(404);
      throw new Error('Idea not Found');
    }
    res.json(idea);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// @route             POST /api/ideas
// @description       Create new idea
// @accesss             Private
router.post('/', async (req, res, next) => {
  try {
    console.log('create idea payload', req.body);
    const idea = new Idea(req.body);
    const saved = await idea.save();
    return res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

export default router;
