const textController = {
  textInfo: async (ctx, next) => {
    ctx.body = 'Hello Koa!'
  } 
}
module.exports = textController;