const express = require('express');
const login = require('../controller/UserController/Login');
const signup = require('../controller/UserController/SignUp');
const verification = require('../controller/UserController/userVerification');
const password = require('../controller/UserController/setPassword');
const router = express.Router();

// const authMiddleware = require('../auth/user_auth');

router.get('/',(req,res)=>{
    res.send("<h1>This is User router</h1>")
});

router.post('/login',login);
router.post('/signup',signup);
router.post('/otp',verification);
router.put('/password',password);


module.exports = router;