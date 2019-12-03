var express = require('express');
var router = express.Router();

const position = require('../controllers/position') 
router.route('/')
      .get(position.findAll)
      .post(position.save)
      .patch(position.update)
router.route('/findOne')
      .get(position.findOne)

// router.get('/findAll',position.findAll)
// router.post('/save',position.save)

module.exports = router