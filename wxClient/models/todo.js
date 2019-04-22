const request = require('./request.js');
const api = require('./api.js');

module.exports =  {
  insertTodo (params) {
    console.log(params);
    return request({
      url:api.todo,
      method:'post',
      data: params
    })
  },
  showTodo (params) {
    console.log(params);
    return request({
      url:api.todo,
      method:'get',
      data:params
    })
  },
  updateItem(id,params) {
    return request({
      url:api.todoId(id),
      method:'put',
      data:params
    })
  },
  deleteItem(id){
    return request({
      url:api.todoId(id),
      method:'delete'
    })
  }
}