const uploadMiddleware = require('../middlewares/upload') 
var express = require('express');
var router = express.Router();

const sound = require('../controllers/sound') 
router.route('/')
      .get(sound.findAll)
      .post(uploadMiddleware,sound.save)
      .patch(sound.update)
      .delete(sound.remove)
router.route('/findOne')
      .get(sound.findOne)
router.post('/search',sound.search)

module.exports = router