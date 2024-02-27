
const express = require('express');
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();


router.post('/register', UserController.registeruser);

router.post('/login', UserController.userLogin);

router.post('/logout', UserController.userLogout);

router.get('/refresh', UserController.refresh);


router.get('/users', authMiddleware, UserController.fetchUsers);



module.exports = router;