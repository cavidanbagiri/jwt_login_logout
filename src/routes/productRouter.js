
const express = require('express');
const ProductController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();



router.post('/create', authMiddleware, ProductController.createProduct);

router.get('/', authMiddleware, ProductController.fetchAllProducts);


module.exports = router;


