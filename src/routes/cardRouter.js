
const express = require('express');
const CardController = require('../controllers/cardController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/addcards', authMiddleware, CardController.addCard);

module.exports = router;