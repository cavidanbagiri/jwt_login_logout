
const { where } = require('sequelize');
const {CardModels, UserModels, ItemsModels} = require('../../models');

class AddCardService {

    static async addCard(data){
        // Add To Card UserId and CategoryId
        const result = await CardModels.create({
            userId: data.userId,
            itemsId: data.itemsId
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
            attributes:['id', 'userId', 'itemsId'],
            include: [
                {
                    model: UserModels,
                    attributes: ['username',]
                },
                {
                    model: ItemsModels,
                    attributes: ['name', 'amount', 'unit']
                }
            ]
        });
        return result;
    }
}

module.exports = {
    AddCardService,
    FetchCardCardService
};