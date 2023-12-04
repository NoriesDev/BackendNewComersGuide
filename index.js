import express from "express";
import { json } from "express";
import chalkMassage from "./lib/chalk.js";
import "./db/mongooseClient.js";
import cors from 'cors';
import searchRouter from "./routes/searchRoute.js";
import articleRouter from "./routes/articleRoute.js";
import errHandler from './middleware/errHandler.js';
import lawRouter from './routes/lawRouter.js';
import authRouter from "./routes/authRoute.js";
import forumRouter from "./routes/forumRoute.js";
import translateRouter from './routes/translateRouter.js';
import oldRoute from "./routes/oldRoute.js";

const server = express();

server.use(json());

server.use(cors({exposedHeaders: "authorization"}));

const PORT = process.env.PORT || 3000;

server.get('/', (req, res) => {
    return res.send("Success! connected to mongoose");
});

server.use('/translate', translateRouter)
server.use('/search', searchRouter)
server.use('/article', articleRouter);
server.use('/law', lawRouter);
server.use('/auth', authRouter)
server.use('/forum', forumRouter)
server.use('/old', oldRoute);

server.use(errHandler)

server.listen(PORT, () => chalkMassage(`green`, `Server up on port ${PORT}!`));