// 引入 koa 框架
const Koa = require('koa');
const bodyParser=require('koa-bodyparser');
const router = require('./routes');
const app = new Koa();
const response = require('./middlewares/response');
const auth =require('./middlewares/users') 

// 使用路由，监听3000 端口
app
  .use(bodyParser())
  .use(response)
  .use(auth.decode)
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000)