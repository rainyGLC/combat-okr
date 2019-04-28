const Okr = require('./../../models/okr.js');
const Keyresult = require('./../../models/keyresult.js');

Page({
  data: {
    objectiveTitle:'',
    keyresults:[],
    id:''
  },
  onLoad: function(option) {
    console.log(option)//获取页面参数
    let id = option.id;
    // console.log(id);
    Okr.showokrId(id).then(res=>{
      let objective = res.data.objective;
      // console.log(objective)
      let objectiveTitle = objective.title;
      // console.log(objectiveTitle)
      let keyresults = res.data.keyresults;
      // console.log(keyresults)
      this.setData({objectiveTitle,keyresults,id})
    })
  },
  updateObjective:function(event){
    // console.log(event);
    let value=event.detail.value;
    console.log(value);
    this.setData({objectiveTitle:value});
  },
  addKeyresult:function(event){
    let keyresults = this.data.keyresults;
    keyresults.push({title:''});
    this.setData({keyresults})
  },
  updateKeyresult:function(event){
    // console.log(event);
    let index=event.currentTarget.dataset.index;
    let value = event.detail.value;
    // console.log(value);
    let keyresults = this.data.keyresults;
    keyresults[index].title=value;
    this.setData({keyresults});
  },
  deleteKeyresult:function(event){
    // console.log(event);
    let index = event.currentTarget.dataset.index;
    let id = event.currentTarget.dataset.id;
    // console.log(id);
    // console.log(index);
    let keyresults = this.data.keyresults;
    Keyresult.deleteKeyresultId(id).then(res=>{
      console.log(res);
      keyresults.splice(index,1);
      this.setData({keyresults});
    })
  },
  updateOkr:function(event) {
    // console.log(event);
    let objectiveTitle = this.data.objectiveTitle;
    let keyresults = this.data.keyresults;
    // console.log(keyresults)
    if(!objectiveTitle || !keyresults.length){
      wx.showToast({
        title: '请输入目标和成果',
        icon: 'none',
        mask: true,
        duration:1500
      })
      return
    }
    let id = this.data.id;
    console.log(id);
    let params = {objectiveTitle,keyresults};
    Okr.updateOkr(id,params).then(res => {
      console.log(res)
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 1000,
        mask: true
      })
      setTimeout(function(){
        wx.switchTab({
          url: '/pages/okr/okr'
        })
      },2000)
    })
  }
})








