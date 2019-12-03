var express = require('express');
var router = express.Router();

/* GET users listing. */
const {signup,checkUser,signin,isSignin,isSignout} = require('../controllers/users')
router.post('/signup',checkUser ,signup);
router.post('/signin',signin);
router.get('/isSignin',isSignin);
router.get('/isSignout',isSignout);

module.exports = router;
