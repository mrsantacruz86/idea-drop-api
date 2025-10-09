import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ideaRouter from './routes/ideaRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import connectDB from './config/db.js';
import { default as logger } from 'morgan';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(logger('dev'));

// Database connection
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/ideas', ideaRouter);

// 404 Fallback
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
