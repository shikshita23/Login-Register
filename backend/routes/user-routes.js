const express = require('express');
const router = express.Router();
const { createUser,login} = require('../controllers/user-controllers');



router.post('/create-user', createUser);
router.post('/login', login);

// localhost:3002/user/create
// localhost:3002/user/delete
// localhost:3002/todo/create

module.exports = router;
