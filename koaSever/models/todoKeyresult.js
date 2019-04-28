const Knex = require('./knex');
const Base = require('./base.js');
const TABLE = 'todo_keyresult';
class TodoKeyresult extends Base {
  constructor(props = 'todo_keyresult') {
    super(props);
  }
  selectTodo(params){
    return Knex(TABLE)
    .whereIn('keyresult_id',params)
    .leftJoin('todo','todo_keyresult.todo_id','todo.id')
    .select({id: 'todo.id'},'todo_keyresult.keyresult_id','todo.title','todo.status')
  }
}

module.exports = TodoKeyresult