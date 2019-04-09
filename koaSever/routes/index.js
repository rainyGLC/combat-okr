const router = require('koa-router')({
  prefix: '/'
})

const indexController = require('../controllers/index.js')
const textController = require('./../controllers/test.js')


router.get('/', indexController.indexRender)
router.get('api/test',textController.textInfo);


module.exports = router