
const { ProductServiceCreateProduct, FetchAllProducts, UploadImage } = require("../services/productService");

const tryCatch = require('../utils/tryCatch');

class ProductController {

    // Create New Product
    static async createProduct(req, res, next) {
        const data = req.body;
        data.userId = req.user.id;
        const file = req.file;
        tryCatch(
            await ProductServiceCreateProduct.createProduct(data, file)
            .then((respond)=>{
                return res.status(201).json({msg:"Successfully Created"});
            }).catch((err)=>{
                console.log('Create new Product Controller Error : ', err);
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
    static async fetchAllProducts(req, res, next){
        tryCatch(
            await FetchAllProducts.fetchProducts()
            .then((respond)=>{
                return res.status(200).json(respond);
            }).catch((err)=>{
                console.log('Create new Product Controller Error : ', err);
                next(err);
            })
        )
    }

}


module.exports = ProductController;