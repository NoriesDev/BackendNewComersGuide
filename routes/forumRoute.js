import verifyToken from "../middleware/verifyToken.js";
import express from 'express';
import {     
    createPost,
    onePost,
    allPosts,
    commentPost
} from '../controllers/forumCon.js';


const forumRouter = express.Router();

forumRouter.use(express.json());

forumRouter.route('/create').post(verifyToken, createPost);
forumRouter.route('/comment').post(verifyToken, commentPost);
forumRouter.route('/one').get(onePost);
forumRouter.route('/all').get( allPosts);


export default forumRouter;