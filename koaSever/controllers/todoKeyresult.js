const KeyresultModel = require('./../models/keyresult');
const Keyresult = new KeyresultModel();
const todoKeyresultModel = require('./../models/todoKeyresult');
const TodoKeyresult = new todoKeyresultModel();

const todoKeyresultController = {
  insert:async function(ctx,next){
    // console.log('123');
    let todo_id = ctx.request.body.todo_id;
    // console.log(todo_id,'ooo');
    let keyresult_id = ctx.request.body.keyresult_id;
    // console.log(keyresult_id,'ooo');
    await TodoKeyresult.insert({todo_id,keyresult_id})
    ctx.state.code =200;
    ctx.state.data={message:"message"};
  },
  delete:async function(ctx,next) {
    let todo_id = ctx.request.body.todo_id;
    // console.log(todo_id,'kkkk');
    let keyresult_id = ctx.request.body.keyresult_id;
    // console.log(keyresult_id,'kkk');
    await TodoKeyresult.where({ todo_id, keyresult_id }).del();
    ctx.state.code=200;
    ctx.state.data={message:"message"};
  }
}
module.exports = todoKeyresultController;