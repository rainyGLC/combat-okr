const Okr = require('./../../models/okr.js');
// console.log(Okr);
const Objective = require('./../../models/objective.js');
const Keyresult = require('./../../models/keyresult.js');
// console.log(Keyresult);
const {formatTime} = require('./../../utils/util.js');
Page({
  data:{
    objective:'',
    keyresults:[],
    id:''
  },
  onLoad:function(option) {
    // console.log(option);
    let id = option.id;
    // console.log(id);
    Okr.showokrId(id).then(res=>{
      // console.log(res)
      let objective = res.data.objective;
      // console.log(objective);
      let keyresults =res.data.keyresultsTmp;
      // console.log(keyresults)
      this.setData({objective,keyresults,id})
    })
  },
  objectiveChange(event){
    // console.log(event);
    let id = event.currentTarget.dataset.id;
    console.log(id);//1
    let status = event.currentTarget.dataset.status;
    console.log(status);//1
    let switchStatus = status==1 ? 0 : 1;
    console.log(switchStatus,'ooo');

    let text = status==1 ? '标记未完成' : '标记已完成';
    wx.showActionSheet({
      itemList: [text, '删除'],
      success:(res)=> {
        console.log(res.tapIndex)
        let tapIndex = res.tapIndex;
        if(tapIndex===0){
         Objective.updateObjective(id,{status:switchStatus}).then(res=>{
            // console.log(res)
            if(res.code==200){
              wx.showToast({
                title: '标记成功',
                icon: 'success',
                duration: 2000
              })
              let objective = this.data.objective;
              objective.status = switchStatus;
              if(switchStatus){
                objective.finished_time = formatTime(new Date());
                console.log(objective.finished_time)
              }else{
                objective.finished_time = null
              }
              this.setData({objective})
            }
          })
        }else if(tapIndex===1){
          // wx.showModal({
          //   title: '提示',
          //   content: '是否删除该任务',
          //   success:(res) =>{
          //     if (res.confirm) {
          //       console.log('用户点击确定');
          //       Objective.deleteObjective(id).then(res=>{
          //         if(res.code==200){
          //           let objective=this.data.objective;
          //           objective.splice(index,1)
          //           this.setData({objective})
          //         }
          //       })
          //     } else if (res.cancel) {
          //       console.log('用户点击取消')
          //     }
          //   }
          // })
          // setTimeout(function(){
          //   wx.switchTab({
          //     url: '/pages/okr/okr'
          //   })
          // },2000)
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  keyresultChange(event) {
    // console.log(event);
    let id = event.currentTarget.dataset.id;
    // console.log(id);
    let status = event.currentTarget.dataset.status;
    let switchStatus = status==1 ? 0 : 1;
    // console.log(status);
    let index = event.currentTarget.dataset.index;
    let text = status==1 ? '标记未完成' : '标记已完成';


    // console.log(index);
    wx.showActionSheet({
      itemList: [text, '删除',],
      success:(res)=> {
        console.log(res.tapIndex)
        let tapIndex = res.tapIndex;
        if(tapIndex===0){
          Keyresult.updateKeyresultId(id,{status:switchStatus}).then(res =>{
            console.log(res)
            if(res.code==200){
              wx.showToast({
                title: '标记成功',
                icon: 'success',
                duration: 2000
              })
              let keyresults = this.data.keyresults;
              keyresults[index].status = switchStatus;
              //当前的数组的第几个status为true是页面显示已完成，为否时，显示页面为未完成，
              //前台展示的页面改变，用setData改变里面的值。
              // console.log(keyresults,'ooo');
              // console.log(this,'kkk')
              this.setData({keyresults})
            }
          })
        }else if(tapIndex===1){
          wx.showModal({
            title: '提示',
            content: '是否删除该任务',
            success:(res)=> {
              if (res.confirm) {
                console.log('用户点击确定');
                Keyresult.deleteKeyresultId(id).then(res =>{
                console.log(res)
                  if(res.code==200) {
                    let keyresults = this.data.keyresults;
                    keyresults.splice(index,1);
                    this.setData({keyresults});
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







