import express from 'express';
import { allArticle, createArticle, oneArticle, createCategory } from '../controllers/articleCon.js';


const articleRouter = express.Router();

articleRouter.route('/').get(allArticle);
articleRouter.route('/:id').get(oneArticle);
articleRouter.route('/add-category').post(createCategory);
articleRouter.route('/add-article').post(createArticle)

export default articleRouter;