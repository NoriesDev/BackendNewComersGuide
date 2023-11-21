import ErrorStatus from '../utils/errorStatus.js';
import ArticleModel from '../models/articleModel.js';

const allArticle = async (req, res, next) => {
    try {
        const dbArticle = await ArticleModel.find();
        return res.json(dbArticle);
    } catch (error){
        next (error);
    }
};

const oneArticle = async (rew, res, next) => {
    try {
        const { id } = req.params;
        if (!id.match(/^[a-f\d]{24}$/i)) throw new ErrorStatus('Can not find Id', 400);
        const findArticle = await ArticleModel.findById(id);
        return res.json(findArticle)
    } catch (error) {
        next(error);
    }
};

const createArticle = async (req, res, next) => {
    try {
        const { title, imgSrc, article, usefulLinks } = req.body;
        if (!title || !imgSrc || !article || !usefulLinks)
        throw new ErrorStatus('Please make sure you have all content you need', 400);

        const newArticle = await ArticleModel.create({
            title,
            imgSrc,
            article,
            usefulLinks
        });
        return res.json(newArticle);
    } catch (error) {
        next(error)
    }
}

export {
    allArticle,
    oneArticle,
    createArticle
}