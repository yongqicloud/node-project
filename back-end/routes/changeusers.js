const uploadMiddleware = require('../middlewares/upload') 
var express = require('express');
var router = express.Router();

const changeusers = require('../controllers/changeusers')
router.route('/')
  .post(changeusers.findUser)
  .patch(uploadMiddleware,changeusers.update)
// router.route('/update')
//   .post()

module.exports = router;