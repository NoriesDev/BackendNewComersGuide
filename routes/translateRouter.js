import express from 'express';
import {translateText, allLanguages, translateDocument} from '../controllers/translationController.js';
import upload from '../middleware/multerUpload.js';

const translateRouter = express.Router();

translateRouter.post('/', translateText);

translateRouter.get('/', allLanguages);

translateRouter.post('/document', upload.single('translateDocument'), translateDocument);

export default translateRouter;