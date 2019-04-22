const Base = require('./base.js');

class User extends Base {
  constructor(props = 'user') {
    super(props);
  }
}
module.exports = User