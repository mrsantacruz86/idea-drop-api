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
    const { title, summary, description, tags } = req.body;
    if (!title?.trim() || !summary?.trim() || !description?.trim()) {
      res.status(400);
      throw new Error('Title, summary and description are required');
    }

    const newIdea = new Idea({
      title,
      summary,
      description,
      tags:
        typeof tags === 'string'
          ? tags
              .split(',')
              .map((tag) => tag.trim())
              .filter(Boolean)
          : Array.isArray(tags)
          ? tags
          : [],
    });

    console.log('create idea payload', req.body);
    const savedIdea = await newIdea.save();
    return res.status(201).json(savedIdea);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

// @route             DELETE /api/ideas/:id
// @description       Delete single idea
// @access            Public
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error('Idea not Found');
    }

    const idea = await Idea.findByIdAndDelete(id);

    if (!idea) {
      res.status(404);
      throw new Error('Idea not Found');
    }
    res.json({ message: 'Idea deleted succesfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// @route             PUT /api/ideas/:id
// @description       Update idea
// @access            Public
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error('Idea not Found');
    }

    const { title, summary, description, tags } = req.body;
    if (!title?.trim() || !summary?.trim() || !description?.trim()) {
      res.status(400);
      throw new Error('Title, summary and description are required');
    }

    const updatedIdea = await Idea.findByIdAndUpdate(
      id,
      {
        title,
        summary,
        description,
        tags:
          typeof tags === 'string'
            ? tags
                .split(',')
                .map((tag) => tag.trim())
                .filter(Boolean)
            : Array.isArray(tags)
            ? tags
            : [],
      },
      { new: true, runValidators: true }
    );
    if (!updatedIdea) {
      res.status(404);
      throw new Error('Idea not found');
    }
    res.json(updatedIdea);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

export default router;
