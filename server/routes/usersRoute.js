const express = require('express');
const router = express.Router();
const {getMe} = require('../controllers/usersController');

const verifyJWT = require('../middlewares/verifyJWT');

router.get('/getme', verifyJWT, getMe);


module.exports = router;