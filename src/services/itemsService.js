

const { ProductModels, ImageModels, CountryModels, CategoryModels, ItemsModels, FruitOrVegetableModels } = require('../../models');
const s3 = require('../storage/storage');

class ItemServiceCreateItem {

    // Create New Product
    static async createItem(data, file) {
        // 1 - Create New Product
        const new_item = await ItemsModels.create({
            name: data.name,
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

        // 2 - Create New Item according to new item
        switch(data.categoryId){
            case 1:
                await ProductModels.create({
                    itemsId: new_item.id
                })
                break;
            case 2:
                await FruitOrVegetableModels.create({
                    itemsId: new_item.id
                });
                break;
        };

        // 3 - Save Image To Cloud
        if (file) {
            // Save Image To Cloud and get location
            const location = await UploadImage.uploadImage(file);

            // Save Cloud-Image-Location to Database
            await UploadImage.createImageInstance(location, new_item.id)
        }

        return new_item;
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
    static async createImageInstance(url, productId) {
        const result = await ImageModels.create({
            image: url,
            itemsId: productId
        });
        return result;
    }

}

// Fetch All products
class ItemServiceFetchAllItems {

    static async fetchItems() {
        const respond = await ItemsModels.findAll();
        return respond;
    }

}

module.exports = {
    ItemServiceCreateItem,
    ItemServiceFetchAllItems,
    UploadImage: UploadImage
}