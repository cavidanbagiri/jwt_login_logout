
const {CardModels, UserModels, CategoryModels} = require('../../models');

class AddCardService {

    static async addCard(data){

        // Add To Card UserId and CategoryId
        const result = await CardModels.create({
            userId: data.userId,
            categoryId: data.categoryId,
            selectedId: data.selectedId
        });
        return result;

    }

}


module.exports = AddCardService;