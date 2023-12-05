import ErrorStatus from "../utils/errorStatus.js";
import LawModel from '../models/lawModel.js';
import { OldAPIClient } from '../utils/oldpApi.js'

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

const getLawById = (req, res) => {
    const lawId = req.params.id;
    const apiInstance = new OldAPIClient.LawsApi();
    const callback = (error, data) => {
    if (error) {
        res.status(error.status || 500).json({error: error.response.text});
    } else {
        res.json(data);
    }
};
apiInstance.lawsRead(lawId, callback);
};


const getBookById = (req, res) => {
    const bookId = req.params.id;
    const apiInstance = new OldAPIClient.LawsApi();
    const options = {
        bookId
    };
    const callback = (error, data) => {
        if (error) {
            res.status(error.status || 500).json({error: error.response.text});
        } else {
            res.json(data);
        }
    };
    apiInstance.lawsList(options, callback)
}

export {
    allLaws,
    oneLaw,
    createLaw,
    getBookById,
    getLawById
}