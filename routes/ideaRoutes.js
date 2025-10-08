import express from 'express';
const router = express.Router();

// @route             GET /api/ideas
// @description       Get all ideas
// @access             Public
router.get('/', (req, res) => {
  const ideas = [
    { id: 1, title: 'Idea 1', description: 'this is idea 1' },
    { id: 2, title: 'Idea 2', description: 'this is idea 2' },
    { id: 3, title: 'Idea 3', description: 'this is idea 3' },
    { id: 4, title: 'Idea 4', description: 'this is idea 4' },
  ];

  res.send(ideas);
});

// @route             POST /api/ideas
// @description       Create new idea
// @accesss             Private
router.post('/', (req, res) => {
  console.log('response', req.body);
  res.send('Processed');
});

export default router;
