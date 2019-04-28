const request = require('./request.js');
const api = require('./api.js');

module.exports = {
  insertOkr(params){
    return request ({
      url:api.okr,
      method:'post',
      data:params
    })
  },
  showokrId(id) {
    return request ({
      url:api.okrId(id),
      method:'get'
    })
  },
  updateOkr(id,params){
    return request({
      url:api.okrId(id),
      method:'put',
      data:params
    })
  },
  showOkr(params){
    return request({
      url:api.okr,
      method:'get',
      data:params
    })
  }
}