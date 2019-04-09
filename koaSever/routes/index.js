const router = require('koa-router')({
  prefix: '/api'
})

const indexController = require('../controllers/index.js')
const textController = require('./../controllers/test.js')


router.get('/', indexController.indexRender)
router.get('/test',textController.textInfo);


module.exports = router