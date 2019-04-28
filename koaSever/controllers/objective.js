const ObjectiveModel = require('./../models/objective');
const Objective = new ObjectiveModel();
const KeyresultModel = require('./../models/keyresult');
const Keyresult = new KeyresultModel();
const formate = require('./../utils/date.js');


const objectiveController = {
  showObjection:async function(ctx,next) {
    let user_id = ctx.state.user_id;
    // let status = ctx.request.query.status;
    if(!user_id) {
      ctx.state.data={message:'缺少参数'}
    }
    // const objectives = await Objective.select({status,user_id});
    const objectives = await Objective.select({user_id});

    objectiveArry=objectives.map(data=>{
      data.create_time=formate.formatTime(data.create_time);
       if(data.finished_time){
        data.finished_time=formate.formatTime(data.finished_time)
      }
      return data
    })
    ctx.state.code=200;
    ctx.state.data={objectives:objectiveArry}
  },
  update:async function(ctx,next){
    let id = ctx.params.id;
    console.log(id,'ooo');
    let params = ctx.request.body;
    let status = ctx.request.body.status;
    if(status==1){
      params.finished_time=new Date();
    }else{
      params.finished_time=null
    }
    const objectives=await Objective.update(id,params);
    ctx.state.code=200;
    ctx.state.data={messsage:'update success'}
  },
  delete:async function(ctx,next){
    let id = ctx.params.id;
    const objectives = await Objective.delete(id);
    let keyresults = await Keyresult.where({objective_id:id}).del();
    ctx.state.code=200;
    ctx.state.data={messsage:'delete success'}
  }
}
module.exports = objectiveController;