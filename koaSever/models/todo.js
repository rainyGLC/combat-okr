const Base = require('./base.js');

class Todo extends Base {
  constructor(props = 'todo') {
    super(props);
  }
}
module.exports = Todo