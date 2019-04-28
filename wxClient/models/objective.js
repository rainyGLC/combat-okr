const request = require('./request.js');
const api = require('./api.js');

module.exports = {
  showObjective(params) {
    return request({
      url:api.objective,
      method:'get',
      data:params
    })
  },
  updateObjective(id,params) {
    return request({
      url:api.objectiveId(id),
      method:'put',
      data:params
    })
  },
  deleteObjective(id) {
    return request({
      url:api.objectiveId(id),
      method:'delete'
    })
  }
}