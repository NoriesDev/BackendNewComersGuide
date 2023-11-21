import express from 'express';
import { allArticle, createArticle, oneArticle } from '../controllers/articleCon.js';

const articleRouter = express.Router();

articleRouter.route('/').get(allArticle);
articleRouter.route('/:id').get(oneArticle);
articleRouter.route('/add').post(createArticle)

export default articleRouter;