import express from 'express';
import {     
    createUser,
    oneUser,
    loginUser
} from '../controllers/authCon.js';
import verifyToken from '../middleware/verifyToken.js';
import bodyValidation from '../middleware/bodyValidation.js';
import { loginSchema, registerSchema } from '../lib/joiSchema.js';


const authRouter = express.Router();

authRouter.use(express.json());

authRouter.route('/register').post(bodyValidation(registerSchema), createUser);
authRouter.route('/login').post(bodyValidation(loginSchema), loginUser);
authRouter.route('/me').get(verifyToken, oneUser);


export default authRouter;