const express = require('express');
const router = express.Router();
const { register, login, updateProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.put('/profile/:userId', authMiddleware, updateProfile);

module.exports = router;
