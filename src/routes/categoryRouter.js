
const express = require('express');
const CategoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, CategoryController.fetchCategories);

router.post('/createcategory', authMiddleware, CategoryController.createCategory);



module.exports = router;
