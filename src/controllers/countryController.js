const { CreateCountryService } = require("../services/countryService")

const tryCatch = require('../utils/tryCatch');

class CountryController {

    // Create Countries From List
    static async createCountries(req, res, next){

        tryCatch(
            await CreateCountryService.createCountries()
            .then((respond)=>{
                return res.status(201).json(respond);
            }).catch((err)=>{
                next(err);
            })
        )        


    }

}


module.exports = {

    CountryController

}