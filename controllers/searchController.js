import ErrorStatus from "../utils/errorStatus.js";
// import articleModel from "../models/articleModel.js";
// import categorySchema from "../models/categorySchema.js";
import { allArticle } from "./articleCon.js";
import CategoryCollection from "../models/categorySchema.js";

const filterContent = async (req, res, next) => {
  try {
    const allContent = async () => {
      try {
        const { query } = req.query;
        if (!query) throw new ErrorStatus("Invalid query", 400);

        try {
          const dbArticle = await CategoryCollection.find().populate("article");
          //   console.log(`Response:\n`, dbArticle);
          const filtered = dbArticle.filter((obj) => {
            const artArr = obj.article;

            // console.log(`OBJ:\n`, obj);
            // console.log(`aaass\n`, artArr);
            console.log(`Title:\n`, obj.title);
            const titlee = obj.title.toLowerCase();
            const queryy = query.toLowerCase();
            if (titlee.includes(queryy) === true) {
              console.log(`Title found!\n`, obj);
              return obj;
            } else {
              artArr.filter((article) => {
                const headlinee = article.headline.toLowerCase();
                const paragraphh = article.paragraph.toLowerCase();
                if (
                  headlinee.includes(queryy) === true ||
                  paragraphh.includes(queryy) === true
                )
                  console.log(`Article found!\n`, article);
                return article;
              });
            }

            // return obj.title.toLowerCase().includes(query.toLowerCase()) ||
            //   artArr.filter((article) => {
            //     console.log(`Headline\n`, article.headline);
            //     console.log(`Paragraph\n`, article.paragraph);
            //     article.headline.toLowerCase().includes(query.toLowerCase()) ||
            //       article.paragraph.toLowerCase().includes(query.toLowerCase());
            //   })
            //   ? obj
            //   : null;

            // artArr.headline.toLowerCase().includes(query.toLowerCase()) ||
            //   artArr.paragraph.toLowerCase().includes(query.toLowerCase());
          });
          //   console.log(`Filtered data:\n`, filtered);

          return res.json(filtered);
        } catch (error) {
          next(error);
        }
      } catch (error) {
        next(error);
      }
    };
    allContent();

    // const dbArticles = await articleModel.find()
    // const dbArticles2 = await categorySchema.find()

    // let filteredArticles = [];

    // for (let category of dbArticles) {
    //   console.log(`article\n`, category);
    //   const filteredData = category.article.filter((article) =>
    //     article.headline.toLowerCase().includes(query.toLowerCase()) ||
    //     article.paragraph.toLowerCase().includes(query.toLowerCase())
    //       ? true
    //       : false
    //   );

    //   const addCategoryId = filteredData.map((article) => {
    //     const parentArray = [...article.__parentArray];
    //     const reshapeParentArray = parentArray.map((finalArticle) => ({
    //       ...finalArticle,
    //       categoryId: category._id,
    //     }));
    //     return reshapeParentArray;
    //   });

    //   console.log(addCategoryId);

    //   if (filteredData.length)
    //     filteredArticles = [...filteredArticles, ...filteredData];
    // }

    // if (!filteredArticles.length)
    //   throw new ErrorStatus("No articles match the search criteria", 404);

    // return res.json(filteredArticles);
  } catch (error) {
    next(error);
  }
};

export { filterContent };
