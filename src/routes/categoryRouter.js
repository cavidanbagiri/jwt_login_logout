
const express = require('express');
const CategoryController = require('../controllers/categoryController');
const router = express.Router();

router.post('/createcategory', CategoryController.createCategory);

router.get('/', CategoryController.fetchCategories);


module.exports = router;
