
const express = require('express');
const ProductController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

const upload = require('../middleware/multerMiddleware');

// router.post('/create', authMiddleware, ProductController.createProduct);
router.post('/create', authMiddleware, upload.single('image'), ProductController.createProduct);

router.post('/uploadimage', authMiddleware, upload.single('image'), ProductController.uploadImage);

router.get('/', authMiddleware, ProductController.fetchAllProducts);


module.exports = router;


