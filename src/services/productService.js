
const { ProductModels, ImageModels } = require('../..//models');
const s3 = require('../storage/storage');

class ProductServiceCreateProduct {

    // Create New Product
    static async createProduct(data, file) {

        // 1 - Create New Product
        const new_product = await ProductModels.create({
            product_name: data.product_name,
            amount: data.amount,
            unit: data.unit,
            price: data.price,
            currency: data.currency,
            comment: data.comment,
            status: true,
            categoryId: data.categoryId,
            userId: data.userId,
            countryId: data.countryId,
        });

        // Save Image To Cloud and get location
        const location = await UploadImage.uploadImage(file);

        // Save Cloud-Image-Location to Database
        const image_intance = await UploadImage.createImageInstance(location, new_product.id)

        return new_product;
    }

}

class UploadImage {
    
    // Upload Image To Bucket and take location
    static async uploadImage(file) {
        const upload = await s3.Upload({
            buffer: file.buffer
        },
            '/omarket_images'
        )
        console.log('file uploaded: ', upload.Location);
        return upload.Location;
    }

    // Create Instance and save in imagemodels
    static async createImageInstance (url, productId){
        const result = await ImageModels.create({
            image:url,
            productId: productId
        });
        return result;
    }

}

// Fetch All products
class FetchAllProducts {

    static async fetchProducts() {
        const products = await ProductModels.findAll();
        return products;
    }

}

module.exports = {
    ProductServiceCreateProduct,
    FetchAllProducts,
    UploadImage: UploadImage
}