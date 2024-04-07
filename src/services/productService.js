
const { ProductModels } = require('../..//models');

class ProductServiceCreateProduct{
    // Create New Product
    static async createProduct(data) {
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
        return new_product;
    }
}

class FetchAllProducts{

    static async fetchProducts(){
        const products = await ProductModels.findAll();
        return products;
    }

}

module.exports = {
    ProductServiceCreateProduct,
    FetchAllProducts
}