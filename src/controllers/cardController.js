const { AddCardService, FetchCardCardService } = require("../services/cardService");
const tryCatch = require("../utils/tryCatch");


class CardController {

    // Fetch All Cards
    static async fetchCards(req, res, next) {
        // const user_id = req.user.id;
        const user_id = 10;
        tryCatch(
            await FetchCardCardService.fetchCards(user_id)
                .then((respond) => {
                    return res.status(200).json(respond);
                })
                .catch((err) => {
                    console.log('fetch Card Error : ', err);
                    return next(err);
                })
        );
    }

    // Add To Cards
    static async addCard(req, res, next) {
        const data = req.body;
        data.userId = req.user.id;
        tryCatch(
            await AddCardService.addCard(data)
                .then((respond) => {
                    return res.status(201).json(respond);
                })
                .catch((err) => {
                    console.log('Create Card Error : ', err);
                    next(err);
                })
        )
    }

}

module.exports = CardController;