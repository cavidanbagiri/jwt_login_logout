
const { CategoryModels } = require('../../models');

class CreateCategoryService{

    // Create Categpry
    static async createCategory(category_name){
        const result = await CategoryModels.create({
            'category_name' : category_name
        }); 
        return result;
    }

}

class FetchCategoriesService{
    
    // Fetch Category
    static async fetchCategories(){
        const result = await CategoryModels.findAll();
        return result;
    }

}

module.exports = {
    CreateCategoryService,
    FetchCategoriesService
}