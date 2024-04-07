
const { CreateCategoryService, FetchCategoriesService } = require('../services/categoryService');
const tryCatch = require('../utils/tryCatch');

class CategoryController {

    // Create New Category Function
    static async createCategory(req, res, next) {
        const category_name = req.body.category_name;
        tryCatch(
            await CreateCategoryService.createCategory(category_name)
                .then((respond) => {
                    return res.status(201).json(respond);
                })
                .catch((err) => {
                    console.log('Create Category Error : ', err);
                    return next(err);
                })
        )
    }

    // Fetch Categories
    static async fetchCategories(req, res, next){
        console.log('fethc categorie4s already work');
        tryCatch(
            await FetchCategoriesService.fetchCategories()
            .then((respond)=>{
                return res.status(200).json(respond);
            })
        )
    }

}


module.exports = CategoryController;