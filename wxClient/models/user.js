const request = require('./request.js')
const api = require('./api.js')

module.exports =  {
  login(code) {
    return request({
      // url:'http://localhost:3000/api/login',
      url: api.login,
      method:'post',
      data: { code }
    })
  },
  test() {
    return request({
      // url: 'http://localhost:3000/api/test',
      url:api.test
    })
  }
}