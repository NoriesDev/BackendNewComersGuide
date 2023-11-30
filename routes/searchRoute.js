import express from 'express';
import {filterContent} from '../controllers/searchController.js';

const searchRouter = express.Router();

searchRouter.get('/', filterContent);

export default searchRouter;