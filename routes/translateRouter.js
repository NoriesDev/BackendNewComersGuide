import express from 'express';
import {translateText, allLanguages, translateDocument} from '../controllers/translationController.js';
import upload from '../middleware/multerUpload.js';
import deeplLanguages from '../middleware/deeplLanguages.js';

const translateRouter = express.Router();

translateRouter.post('/', translateText);

translateRouter.get('/languages', deeplLanguages, allLanguages);

translateRouter.post('/document', upload.single('translateDocument'), deeplLanguages, translateDocument);

export default translateRouter;