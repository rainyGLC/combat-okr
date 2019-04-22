const router = require('koa-router')({
  prefix: '/api'
})

const indexController = require('../controllers/index.js')
const textController = require('./../controllers/test.js')
const loginController = require('./../controllers/login.js')
const todoController = require('./../controllers/todo.js')
const historyController = require('./../controllers/history.js')


router.get('/', indexController.indexRender);
router.get('/test',textController.textInfo);
router.get('/text',textController.textMessage);
router.post('/login', loginController.login);

router.post('/todo',todoController.insert);
router.get('/todo',todoController.showTodo);
router.put('/todo/:id', todoController.update);
router.delete('/todo/:id', todoController.delete);

router.get('/history', historyController.completedTodoShow);
router.delete('/history/:id',historyController.deleteTodos);



module.exports = router