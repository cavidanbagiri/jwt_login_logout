
const { where } = require('sequelize');
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

class FetchCardCardService {

    static async fetchCards(userId){
        const result = await CardModels.findAll({
            where:{
                userId:userId
            },
            attributes:['id', 'userId'],
            include: [
                {
                    model: UserModels,
                    attributes: ['id', 'username']
                },
                {
                    model: CategoryModels,
                    attributes: [['id', 'categoryId'], 'category_name']
                }
            ]
        });
        // for(let i of result){
        //     console.log('i is : ',i.dataValues);
        // }
        return result;
    }
}

module.exports = {
    AddCardService,
    FetchCardCardService
};