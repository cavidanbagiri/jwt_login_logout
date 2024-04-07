

const express = require('express');
const { CountryController } = require('../controllers/countryController');

const router = express.Router();

router.post('/createcountry',CountryController.createCountries);
router.get('/',CountryController.fetchAllCountries);


module.exports = router;