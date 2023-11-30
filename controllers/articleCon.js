import ErrorStatus from '../utils/errorStatus.js';
import ArticleCollection from '../models/articleModel.js';
import CategoryCollection from '../models/categorySchema.js'

const allArticle = async (req, res, next) => {
    try {
        const dbArticle = await CategoryCollection.find();
        return res.json(dbArticle);
    } catch (error){
        next (error);
    }
};

const oneArticle = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id.match(/^[a-f\d]{24}$/i)) throw new ErrorStatus('Can not find Id', 400);
        const findArticle = await CategoryCollection.findById(id);
        return res.json(findArticle)
    } catch (error) {
        next(error);
    }
};

const createArticle = async (req, res, next) => {
    try {
        req.body.forEach( async ( { headline, paragraph } ) => {
            const newArticle = await ArticleCollection.create({
                headline,
                paragraph
            });
        })
        return res.json('Articles created');
    } catch (error) {
        next(error)
    }
}

const createCategory = async (req, res, next) => {
    try {
        req.body.forEach( async ( { title, imgSrc, article, usefulLinks } ) => {
            const category = await CategoryCollection.create({
                title, imgSrc, article, usefulLinks
            });
        })
        return res.json('category created');
    } catch (error) {
        next(error)
    }
}



export {
    allArticle,
    oneArticle,
    createArticle,
    createCategory
}