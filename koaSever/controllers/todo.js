const TodoModel = require('./../models/todo.js');
const Todo = new TodoModel();
// const TodoKeyresultModel = require('./../models/todoKeyresult.js');
// const TodoKeyresul = new  TodoKeyresultModel;
const formate = require('./../utils/date.js');

const todoController = {
  insert:async function(ctx,next){
    let title = ctx.request.body.title;
    // console.log(title);
    let user_id = ctx.state.user_id;
    // console.log(user_id,'ooo');
    let status=0;
    // console.log(status);
    let create_time = new Date();
    // console.log(create_time)
    if(!title || !user_id){
      ctx.state.data={message:"缺少必要参数"} 
      return
    }
    const todos =await Todo.insert({title,status,user_id,create_time});
    // console.log(todos);
    let id = todos[0];
    // console.log(id);
    ctx.state.code=200;
    ctx.state.data = {id:id};//后台返回前台的数据
  },
  showTodo:async function(ctx,next){
    let status = ctx.request.query.status;//获取前台传入进来的参数// api/todo?status=0
    // console.log(status,'ooo')//0//能返回status
    let user_id = ctx.state.user_id;
    // console.log(user_id,'ooo');//0能返回user_id
    if(!user_id){
      ctx.state.data={message:"缺少必要参数"}
    }
    const todos=await Todo.select({status,user_id});
    // let todosArry={};
    todosArry=todos.map(data=>{
      data.create_time=formate.formatTime(data.create_time);
      if(data.finished_time){
        data.finished_time=formate.formatTime(data.finished_time)
      }
      return data
    })
    ctx.state.code=200;//后台返回给前台的数据//{code:200,data:{..}}
    ctx.state.data={todos:todosArry};
  },
  update:async function(ctx,next) {
    let id = ctx.params.id;
    // console.log(id,'ooo');//获取路由ID
    let params = ctx.request.body;
    // console.log(params);
    let status = ctx.request.body.status;//前台传递过来的参数{status:1}
    // console.log(status,'koko');
    if(status==1){
      params.finished_time=new Date();
    }else{
      params.finished_time=null
    }
    // console.log(params);
    const todos = await Todo.update(id,params);
    // console.log(todos);
    ctx.state.code=200;
    ctx.state.data={messsage:'update success'}
    // ctx.state.data={todos:todos};
  },
  delete:async function(ctx,next) {
    let id = ctx.params.id;
    console.log(id)
    const todos = await Todo.delete(id);
    // const todoKeyreults = await TodoKeyresult.select({todo_id: id}).del();
    ctx.state.code=200;
    ctx.state.data={messsage:'delete success'}
  }
}
module.exports = todoController;