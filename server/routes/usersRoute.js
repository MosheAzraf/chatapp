const express = require('express');
const router = express.Router();
const {getMe, findUsers,getCurrentUserChatList} = require('../controllers/usersController');

const verifyJWT = require('../middlewares/verifyJWT');

router.get('/findUsers',verifyJWT, findUsers);
router.get('/getme', verifyJWT, getMe);


module.exports = router;