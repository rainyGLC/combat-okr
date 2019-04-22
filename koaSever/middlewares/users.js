const authCode = require('./../utils/authCode.js')

const auth = {
  decode:async function(ctx,next) {
    let token = ctx.headers.token
    // console.log(token)
    if(token) {
      let token_Code=authCode(token,'DECODE');//解密
      // console.log(token_Code);
      let authArr= token_Code.split('\t');
      // console.log(authArr); //['rainy','2019/04/16','1']
      let rainy=authArr[0];
      let create_time=authArr[1];
      let id=authArr[2];
      if(rainy && id){
        ctx.state.user_id = Number(id);//用来给中间件保存数据
        // console.log(ctx.state.user_id);
      }
    }
    await next()
  }
}
module.exports = auth;