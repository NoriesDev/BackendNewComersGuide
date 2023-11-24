import express from 'express';
import {translateText} from '../controllers/translationController.js';

const translateRouter = express.Router();

translateRouter.post('/', translateText);

export default translateRouter;