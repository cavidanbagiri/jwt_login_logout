
const { ItemServiceCreateItem, ItemServiceFetchAllItems, UploadImage } = require("../services/itemsService");

const tryCatch = require('../utils/tryCatch');

class ItemsController {

    // Create New Product
    static async createItem(req, res, next) {
        const data = req.body;
        // data.userId = req.user.id;
        data.userId = 10;
        const file = req.file;
        tryCatch(
            await ItemServiceCreateItem.createItem(data, file)
            .then((respond)=>{
                return res.status(201).json({msg:"Item Successfully Created"});
            }).catch((err)=>{
                console.log('Create new Item Controller Error : ', err);
                next(err);
            })
        )
    }

    // Upload Image To Storage
    static async uploadImage(req, res, next){
        if (!req.file) {
            return res.status(400).send('No files were uploaded.');
        }
        const file = req.file;
        const data = req.body;
        data.userId = req.user.id;
        tryCatch(
            await UploadImage.uploadImage(file)
            .then((respond)=>{
                return res.status(201).json({msg:"Image Successfully Upload"});
            }).catch((err)=>{
                console.log('Create new Product Controller Error : ', err);
                next(err);
            })
        )
    }

    // Fetch All Products
    static async fetchAllItems(req, res, next){
        tryCatch(
            await ItemServiceFetchAllItems.fetchItems()
            .then((respond)=>{
                return res.status(200).json(respond);
            }).catch((err)=>{
                console.log('Create new Product Controller Error : ', err);
                next(err);
            })
        )
    }

}


module.exports = ItemsController;