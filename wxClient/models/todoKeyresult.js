const request = require('./request.js')
const api = require('./api.js')

module.exports =  {
  insert(id,params){
    return request ({
      url:api.todoKeyresult(id),
      method:'post',
      data:params
    })
  },
  delete(id,params) {
    return request({
      url:api.todoKeyresult(id),
      method:'delete',
      data:params
    })
  }
}