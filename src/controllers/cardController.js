const AddCardService = require("../services/cardService");
const tryCatch = require("../utils/tryCatch");


class CardController {

    // Add To Cards
    static async addCard(req, res, next){

        const data = req.body;
        data.userId = req.user.id;
        
        tryCatch(
            await AddCardService.addCard(data)
            .then((respond)=>{
                return res.status(201).json(respond);
            })
            .catch((err)=>{
                console.log('Create Card Error : ',err);
                next(err);
            })
        )
        
    }

}

module.exports = CardController;