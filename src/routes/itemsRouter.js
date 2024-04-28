
const express = require('express');
const ItemsController = require('../controllers/itemsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

const upload = require('../middleware/multerMiddleware');

// Fetch All product
// router.get('/', authMiddleware, ItemsController.fetchAllItems);
router.get('/', ItemsController.fetchAllItems);

// Create New product
// router.post('/create', authMiddleware, upload.single('image'), ItemsController.createItem);
router.post('/create', ItemsController.createItem);

// Update Image For product
router.post('/uploadimage', authMiddleware, upload.single('image'), ItemsController.uploadImage);



module.exports = router;


