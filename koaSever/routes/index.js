const router = require('koa-router')({
  prefix: '/api'
})

const indexController = require('../controllers/index.js')
const textController = require('./../controllers/test.js')
const loginController = require('./../controllers/login.js')
const todoController = require('./../controllers/todo.js')
const objectiveController = require('./../controllers/objective.js')
const KeyresultControll = require('./../controllers/keyresult.js')
const okrContronller = require('./../controllers/okr.js');
const todoKeyresultController = require('./../controllers/todoKeyresult.js');

router.get('/', indexController.indexRender);
router.get('/test',textController.textInfo);
router.get('/text',textController.textMessage);
router.post('/login', loginController.login);

router.post('/todo',todoController.insert);
router.get('/todo',todoController.showTodo);
router.put('/todo/:id', todoController.update);
router.delete('/todo/:id', todoController.delete);

router.get('/objective',objectiveController.showObjection);
router.put('/objective/:id',objectiveController.update);
router.delete('/objective/:id',objectiveController.delete);

router.post('/okr',okrContronller.insert);
router.get('/okr/:id',okrContronller.showOkrId);
router.put('/okr/:id',okrContronller.updateOkrId);
router.get('/okr',okrContronller.showOkr);

router.delete('/keyresult/:id',KeyresultControll.deleteKeyresult);
router.put('/keyresult/:id',KeyresultControll.updateKeyresult);

router.post('/todo/:id/keyresult',todoKeyresultController.insert);
router.delete('/todo/:id/keyresult',todoKeyresultController.delete);



module.exports = router