import express from 'express';
import { getLawById, getBookById } from '../controllers/lawCon.js';

const oldRouter = express.Router();

oldRouter.get('/law/:id', getLawById);
oldRouter.get('/book/:id', getBookById);

export default oldRouter;