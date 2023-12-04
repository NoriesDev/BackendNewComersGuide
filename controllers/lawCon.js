import ErrorStatus from "../utils/errorStatus.js";
import LawModel from '../models/lawModel.js';

const allLaws = async (req, res, next) => {
    try {
        const dbLaw = await LawModel.find().populate('article');
        return res.json(dbLaw)
    } catch (error) {
        next(error);
    }
};

const oneLaw = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id.match(/^[a-f\d]{24}$/i)) throw new ErrorStatus('Can not find Id', 400);
        const findLaw = await LawModel.findById(id).populate('article');
        return res.json(findLaw)
    } catch (error) {
        next(error);
    }
};

const createLaw = async (req, res, next) => {
    try {
        const { imgSrc, article } = req.body;
        if ( !imgSrc || !article || !Array.isArray(article))
        throw new ErrorStatus('Please make sure you have all content you need', 400);
        const newLaw = await LawModel.create({
            imgSrc,
            article
        });
        return res.json(newLaw);
    } catch (error) {
        next(error);
    }
};

export {
    allLaws,
    oneLaw,
    createLaw
}