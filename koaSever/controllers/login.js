const axios = require('axios');
const configs = require('./../config.js');
const UserModel = require('./../models/user.js');
const User = new UserModel();
const authCode = require('./../utils/authCode.js');
const { formateDay } = require('./../utils/date.js');

const loginController = {
  login: async (ctx, next) => {
    let code = ctx.request.body.code;
    // console.log(code);
    if(!code) {
      ctx.state.body = {code:0,msg:'code empty!'}
    }
      const APPID = configs.miniapp.appid;
      const SECRET = configs.miniapp.secret;
      let loginUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`;
      let weixin = await axios.get(loginUrl)
      let open_id = weixin.data.openid;
      const users = await User.select({open_id});
      const user = users[0];
      // console.log(user);
      let id;
      if(!user) {
        const userArr = await User.insert({open_id});
        id = userArr[0];
      }else {
        id = user.id
      }
      let create_time = formateDay(new Date());
      let auth_Code = 'rainy'+'\t'+ create_time + '\t' + id;
      let token = authCode(auth_Code,'ENCODE')
      ctx.state.code = 200;
      ctx.state.data = {token:token}
    } 
}
module.exports = loginController;