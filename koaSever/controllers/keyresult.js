const KeyresultModel = require('./../models/keyresult');
const Keyresult = new KeyresultModel();
const todoKeyresultModel = require('./../models/todoKeyresult');
const TodoKeyresult = new todoKeyresultModel();

const keyresultController = {
  deleteKeyresult:async function(ctx,next) {
    let id = ctx.params.id;
    // console.log(id,'oook');
    const keyresult  =  await Keyresult.delete(id);
    const todoKeyresult = await TodoKeyresult.where({keyresult_id:id}).del();
    ctx.state.code=200;
    ctx.state.data={message:'delete success'}
  },
  updateKeyresult:async function(ctx,next) {
    let id = ctx.params.id;
    console.log(id,'pppk');
    let params = ctx.request.body;
    console.log(params);
    let status = ctx.request.body.status;
    if(status ==1){
      params.finished_time = new Date();
    }else{
      params.finished_time = null;
    }
    // params.finished_time = 
    await Keyresult.update(id,params);
    // console.log(Keyresult);
    ctx.state.code = 200;
    ctx.state.data = {message:'update success'}
  }
}
module.exports = keyresultController;

