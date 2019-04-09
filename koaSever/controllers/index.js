const indexController = {
  indexRender: async (ctx, next) => {
    ctx.body = 'Hello Koa!'
  } 
}

module.exports = indexController;