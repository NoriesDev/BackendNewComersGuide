import ErrorStatus from '../utils/errorStatus.js';
import ArticleModel from '../models/articleModel.js';

const filterContent = async (req, res, next) => {
    try {
        const { query } = req.query;

        if (!query) throw new ErrorStatus('Invalid query', 400)

        const dbArticles = await ArticleModel.find();

        let filteredArticles = [];

        for (let category of dbArticles) {
            const filteredData = category.article.filter(article => article.headline.toLowerCase().includes(query.toLowerCase()) || article.paragraph.toLowerCase().includes(query.toLowerCase()) ? true : false)
            // const addCategoryId = filteredData.map(article => {
            //     const parentArray = [...article.__parentArray]
            //     const reshapeParentArray = parentArray.map(finalArticle => ({...finalArticle, categoryId: category._id}))
            //     return reshapeParentArray
            // })

            // console.log(addCategoryId)

            if (filteredData.length) filteredArticles = [...filteredArticles, ...filteredData]
        }

        if (!filteredArticles.length) throw new ErrorStatus('No articles match the search criteria', 404)

        return res.json(filteredArticles)
    } catch (error) {
        next(error)
    }
}

export { filterContent }