const express = require('express');
const router = express.Router();
const {registerNewUser, login, logOut, verifyAuth} = require('../controllers/authController');

router.post('/register', registerNewUser);
router.post('/login', login);
router.post('/logout', logOut);
router.post('/verifyAuth', verifyAuth);


module.exports = router;