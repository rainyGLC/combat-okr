const KeyresultModel = require('./../models/keyresult');
const Keyresult = new KeyresultModel();
const ObjectiveModel = require('./../models/objective');
const Objective = new ObjectiveModel();
const todoKeyresultModel = require('./../models/todoKeyresult');
const TodoKeyresult = new todoKeyresultModel();
const formate = require('./../utils/date.js');

const okrController = {
  insert:async function(ctx,next) {
    let title = ctx.request.body.objective;//后台获取前台传递过来的参数
    console.log(title);
    let keyresults = ctx.request.body.keyresults;
    console.log(keyresults);
    let status=0;
    let user_id = ctx.state.user_id;
    let create_time = new Date();
    if(!title || !keyresults.length || !user_id){
      ctx.state.data = {message:"缺少必要参数"}
      return
    }
    let objective = await Objective.insert({title,user_id,status,create_time});
    let objective_id =objective[0]
    console.log(objective_id);
    keyresults.forEach(async(data)=>{
      let title = data.title;
      await Keyresult.insert({objective_id,title,status,create_time})
    })
    ctx.state.code=200;
    ctx.state.data={message:"insert success"}
  },
  showOkrId:async function(ctx,next) {
    let id = ctx.params.id;
    // console.log(id,'oook');
    let user_id = ctx.state.user_id;
    if(!user_id){
      ctx.state.data={message:"缺少必要参数"}
    }
    const objectives = await Objective.select({id});
    let objective=objectives[0];
    objective.create_time = formate.formatTime(objective.create_time);
    // console.log(objective.create_time);
    if(objective.finished_time){
      objective.finished_time = formate.formatTime(objective.finished_time);
    }
    // console.log(objective);
    let keyresult = await Keyresult.select({objective_id:id});
    // console.log(keyresult);
    let keyresult_id = keyresult.map(data=>data.id); 
    // console.log(keyresult_id);//[1,2]
    let todoKeyresult = await TodoKeyresult.selectTodo(keyresult_id);
    // console.log(todoKeyresult);


    let keyresultsTmp = {};
    keyresult.forEach(data => {
      data.todos=[]
      keyresultsTmp[data.id] = data;
    })
    todoKeyresult.forEach(data => {
      keyresultsTmp[data.keyresult_id].todos.push(data);
    })
    keyresultsTmp=Object.values(keyresultsTmp);
    // console.log(keyresultsTmp);

    ctx.state.code=200;
    ctx.state.data={objective:objective,keyresults:keyresult,keyresultsTmp:keyresultsTmp}
  },
  updateOkrId:async function(ctx,next){
    let id = ctx.params.id;
    console.log(id,'koko');
    let title = ctx.request.body.objectiveTitle;
    console.log(title,'ooo');
    let keyresults = ctx.request.body.keyresults;
    console.log(keyresults,'123')
    let create_time = new Date();
    await Objective.update(id,{title,create_time});
    keyresults.forEach(async(data) => {
      if(data.id) {
        await Keyresult.update(data.id,{title:data.title})
      }else{
        await Keyresult.insert({objective_id:id,title:data.title,status:0,create_time})
      }
    })
    ctx.state.code = 200;
    ctx.state.data={message:'update seccess'}
  },
  showOkr:async function(ctx,next) {
    let todo_id = ctx.request.query.id;
    // console.log(todo_id,'ooo'); //3
    let status = ctx.request.query.status;
    console.log(status);
    let user_id = ctx.state.user_id;
    console.log(user_id);
    if(!user_id){
      ctx.state.data={message:"缺少必要参数"}
    }
    let params = {user_id};
    if(status) {
      params.status = status
    }
    let objective = await Objective.select(params);
    // console.log(objective);
    let objective_id = objective.map(data=>data.id);
    console.log(objective_id);
    let keyresults = await Keyresult.selectIn({
      key:'objective_id',
      value:objective_id
    });
    // console.log(keyresults);
    let objectiveTiltle = objective.map(data=>{
      return {
        id:data.id,
        title:data.title
      }
    });
    // console.log(objectiveTiltle);
    let okr ={};
    objectiveTiltle.forEach(data=>{
      data.keyresults=[];
      okr[data.id] = data;
    });
    keyresults.forEach(data=>{
      okr[data.objective_id].keyresults.push(data)
    })
    okr=Object.values(okr);
    // console.log(okr,'oooo');
    ctx.state.code = 200;
    ctx.state.data={okr:okr}
  }
}
module.exports = okrController;
