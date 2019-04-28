const Okr = require('./../../models/okr.js');
const TodoKeyresult = require('./../../models/todoKeyresult.js')
Page({
  data:{
    okr:[],
    id:''
  },
  onLoad:function(option){
    console.log(option);
    let id = option.id;
    console.log(id);
    Okr.showOkr({id,status:0}).then(res =>{
      console.log(res.data.okr);
      this.setData({id,okr:res.data.okr})      
    })
  },
  keyresultHighlight:function(event){
    console.log(event);
    let todo_id = this.data.id;
    let okr = this.data.okr;
    let objective_index =event.currentTarget.dataset.objective_index;
    console.log(objective_index);
    let keyresult_index = event.currentTarget.dataset.keyresult_index;
    console.log(keyresult_index);
    let keyresult_id = event.currentTarget.dataset.keyresult_id;
    console.log(keyresult_id);
    let title = event.currentTarget.dataset.title;
    console.log(title);
    let active = okr[objective_index].keyresults[keyresult_index].active ? true : false;
    okr[objective_index].keyresults[keyresult_index].active = !active;
    this.setData({okr});
    console.log(!active);
    if(!active){
      TodoKeyresult.insert(todo_id,{todo_id,keyresult_id}).then(res=>{
        okr[objective_index].keyresults[keyresult_index].active= !active;
        this.setData({okr})
      })
    }else{
      TodoKeyresult.delete(todo_id,{todo_id,keyresult_id}).then(res=>{
        okr[objective_index].keyresults[keyresult_index].active= !active;
        this.setData({okr})
      })
    }
  }
})
