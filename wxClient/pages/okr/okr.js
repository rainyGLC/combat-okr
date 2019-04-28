const Objective = require('./../../models/objective.js');

Page({
  data:{
    objectives:[]
  },
  onShow:function(){
    Objective.showObjective({}).then(res=>{
      // console.log(res.data.objectives)
      this.setData({objectives:res.data.objectives})
    })
    
    // Objective.showObjective({status:0}).then(res=>{
    //   // console.log(res.data.objectives)
    //   this.setData({objectives:res.data.objectives})
    // })
  },
  showObjectiveArry:function(event){
    let id =event.currentTarget.dataset.id;
    // console.log(id);
    let index =event.currentTarget.dataset.index;
    // console.log(index);
    let that = this;
    wx.showActionSheet({
      itemList: ['查看', '编辑', '已完成','删除'],
      success:(res)=> {
        // console.log(res.tapIndex);
        let tapIndex = res.tapIndex;
        if(tapIndex==0){
          wx.navigateTo({url:'/pages/okr_detail/okr_detail?id=' +id})
          return
        }else if(tapIndex==1){
          wx.navigateTo({url:'/pages/okr_edit/okr_edit?id=' +id})
        }else if(tapIndex==2){
          Objective.updateObjective(id,{status:1}).then(res=>{
            // console.log(res)
            if(res.code==200){
              wx.showToast({
                title: '标记成功',
                icon: 'success',
                duration: 2000
              })
              let objectives = that.data.objectives;
              objectives.splice(index,1);
              that.setData({objectives})
            }
          })
        }else if(tapIndex==3){

          wx.showModal({
            title: '提示',
            content: '是否删除该任务',
            success:(res) =>{
              if (res.confirm) {
                console.log('用户点击确定');
                Objective.deleteObjective(id).then(res=>{
                  if(res.code==200){
                    let objectives=that.data.objectives;
                    objectives.splice(index,1)
                    that.setData({objectives})
                  }
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  }
})