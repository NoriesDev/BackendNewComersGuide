import express from 'express';
import {allLaws, oneLaw, createLaw } from '../controllers/lawCon.js';

const lawRouter = express.Router();

lawRouter.route('/').get(allLaws);
lawRouter.route('/:id').get(oneLaw);
lawRouter.route('/add').post(createLaw);

export default lawRouter;