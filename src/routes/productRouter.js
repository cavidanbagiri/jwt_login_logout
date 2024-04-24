
const express = require('express');
const ProductController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

const upload = require('../middleware/multerMiddleware');

// Fetch All product
router.get('/', authMiddleware, ProductController.fetchAllProducts);

// Create New product
router.post('/create', authMiddleware, upload.single('image'), ProductController.createProduct);

// Update Image For product
router.post('/uploadimage', authMiddleware, upload.single('image'), ProductController.uploadImage);



module.exports = router;


