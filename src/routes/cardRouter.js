
const express = require('express');
const CardController = require('../controllers/cardController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Fetch All Cards 
// router.get('/', authMiddleware, CardController.fetchCards);
router.get('/', CardController.fetchCards);

// Create new Card
router.post('/addcards', authMiddleware, CardController.addCard);

module.exports = router;