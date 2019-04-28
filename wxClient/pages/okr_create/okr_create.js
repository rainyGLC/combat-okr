const Okr = require('./../../models/okr.js');

Page({
  data:{
    objective:'',
    keyresults:[{
      title:''
    }]
  },
  inputObjective:function(event){
    // console.log(event)
    let objective=event.detail.value;
    // console.log(objective);
    this.setData({objective});
  },
  addKeyresult:function(event){
    let keyresults = this.data.keyresults;
    keyresults.push({title:''});
    this.setData({keyresults})
  },
  deleteKeyresult:function(event){
    // console.log(event);
    let index = event.currentTarget.dataset.index;
    // console.log(index);
    let keyresults = this.data.keyresults;
    keyresults.splice(index,1);
    this.setData({keyresults});
  },
  inputKeyresult:function(event){
    // console.log(event);
    let index = event.currentTarget.dataset.index;
    // console.log(index)
    let value = event.detail.value;
    // console.log(value);
    let keyresults = this.data.keyresults;
    keyresults[index].title = value;
    this.setData({keyresults});
  },
  increasedOkr:function(event){
    // console.log(event);
    let objective = this.data.objective;
    let keyresults = this.data.keyresults;
    console.log(keyresults);
    if(!objective || !keyresults.length){
      wx.showToast({
        title: '请输入目标和成果',
        icon: 'none',
        duration:1500
      })
      return
    }
    let params = {objective,keyresults}//前台传递给后台的数据 
    Okr.insertOkr(params).then(res=>{
      console.log(res);
       wx.showToast({
        title: '新增成功',
        icon: 'success',
        duration: 1500,
      })
      setTimeout(function(){
        wx.switchTab({
        url: '/pages/okr/okr'
      })
      },2000)
    })
  }
})
















