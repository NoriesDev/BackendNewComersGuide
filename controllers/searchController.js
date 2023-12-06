import ErrorStatus from "../utils/errorStatus.js";
import ArticleCollection from "../models/articleModel.js";

const filterContent = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query) {
      const allArticles = await ArticleCollection.find();
      return res.json(allArticles);
    }

    const allArticles = await ArticleCollection.find({
      $or: [
        { headline: { $regex: query, $options: "i" } },
        { paragraph: { $regex: query, $options: "i" } },
      ],
    });

    return res.json(allArticles);
  } catch (error) {
    next(error);
  }
};

export { filterContent };
