import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// @route             POST /api/ideas
// @description       Create new idea
// @accesss           Private
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email) {
      res.status(400);
      throw new Error('All fields are required');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// @route             GET /api/ideas
// @description       Get all ideas
// @access            Public
// query              _limit (Optional limit for the ideas returned)

// router.get('/', async (req, res, next) => {
//   try {
//     const limit = parseInt(req.query._limit);
//     const query = Idea.find().sort({ createdAt: -1 });

//     if (!isNaN(limit)) {
//       query.limit(limit);
//     }

//     const ideas = await query.exec();
//     res.json(ideas);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

// // @route             GET /api/ideas/:id
// // @description       Get single idea
// // @access            Public
// router.get('/:id', async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       res.status(404);
//       throw new Error('Idea not Found');
//     }

//     const idea = await Idea.findById(id);

//     if (!idea) {
//       res.status(404);
//       throw new Error('Idea not Found');
//     }
//     res.json(idea);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

// // @route             DELETE /api/ideas/:id
// // @description       Delete single idea
// // @access            Public
// router.delete('/:id', async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       res.status(404);
//       throw new Error('Idea not Found');
//     }

//     const idea = await Idea.findByIdAndDelete(id);

//     if (!idea) {
//       res.status(404);
//       throw new Error('Idea not Found');
//     }
//     res.json({ message: 'Idea deleted succesfully' });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

// // @route             PUT /api/ideas/:id
// // @description       Update idea
// // @access            Public
// router.put('/:id', async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       res.status(404);
//       throw new Error('Idea not Found');
//     }

//     const { title, summary, description, tags } = req.body;
//     if (!title?.trim() || !summary?.trim() || !description?.trim()) {
//       res.status(400);
//       throw new Error('Title, summary and description are required');
//     }

//     const updatedIdea = await Idea.findByIdAndUpdate(
//       id,
//       {
//         title,
//         summary,
//         description,
//         tags:
//           typeof tags === 'string'
//             ? tags
//                 .split(',')
//                 .map((tag) => tag.trim())
//                 .filter(Boolean)
//             : Array.isArray(tags)
//             ? tags
//             : [],
//       },
//       { new: true, runValidators: true }
//     );
//     if (!updatedIdea) {
//       res.status(404);
//       throw new Error('Idea not found');
//     }
//     res.json(updatedIdea);
//   } catch (err) {
//     console.error(err);
//     return next(err);
//   }
// });

export default router;
