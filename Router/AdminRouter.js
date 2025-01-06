const express = require('express');
const signup = require('../controller/AdminController/SignUp');
const createProperty = require('../controller/AdminController/CreateProperty');

const router = express.Router();

const authMiddleware = require('../model/Auth/AdminAuth');

router.get('/',(req,res)=>{
    res.send("<h1>This is Admin router</h1>")
});
router.post('/signup',signup);
router.post('/createproperty',createProperty);


module.exports = router;