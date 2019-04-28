const request = require('./request.js');
const api = require('./api.js');

module.exports = {
  deleteKeyresultId(id) {
    return request({
      url:api.keyresult(id),
      method:'delete'
    })
  },
  updateKeyresultId(id,params) {
    return request({
      url:api.keyresult(id),
      method:'put',
      data:params
    })
  }
}