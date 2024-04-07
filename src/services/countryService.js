
const { CountryModels } = require('../../models')
const path = require('path');
const countries = require('../../countries');

class  CreateCountryService {
    static async createCountries(){
        // for(let i of countries){
        //     console.log(`${i.name}`);
        //     await CountryModels.create({
        //         country_name: i.name,
        //         code_name: i.code
        //     })
        // }
        return 'Countries Created';
    }
}

class FetchAllCountryService {
    static async fetchAllCountries(){
        const respond = await CountryModels.findAll();
        return respond;
    }
}

module.exports = {
    CreateCountryService,
    FetchAllCountryService,
}