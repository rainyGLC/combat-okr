const textController = {
  textInfo: async (ctx, next) => {
    console.log(ctx.header.token)
    ctx.state.code = 200;
    ctx.state.data = [1,2,3]
  },
  textMessage:async (ctx,next) =>{
    ctx.state.code =200;
    ctx.state.data =[7,8,9];
  }
}
module.exports = textController;