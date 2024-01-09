const express = require('express');
const router = express.Router();
const {getMe, findUser} = require('../controllers/usersController');

const verifyJWT = require('../middlewares/verifyJWT');


router.get('/findUsers',verifyJWT, findUser);
router.get('/getme', verifyJWT, getMe);


module.exports = router;