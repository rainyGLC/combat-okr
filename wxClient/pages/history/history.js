const Todo = require('./../../models/todo.js');

Page({
  data:{
    todos:[]
  },
  onLoad:function() {
    //生命周期回调－－监听页面加载
    Todo.showTodo({status:1}).then(res=>{
      console.log(res.data.todos);
      this.setData({todos:res.data.todos})
     })  
  },
  shadePopup:function(event) {
    console.log(event);
    let id =event.currentTarget.dataset.id;
    console.log(id);
    let index =event.currentTarget.dataset.index;
    console.log(index);
    let that = this
    wx.showActionSheet({
      itemList: ['修改为未完成', '删除'],
      success(res) {
        console.log(res.tapIndex)
        let tapIndex = res.tapIndex;
        if(tapIndex==0){
          Todo.updateItem(id,{status:0,finished_time:null}).then(res =>{
            console.log(res)
            if(res.code==200){
              wx.showToast({
                title: '标记成功',
                icon: 'success',
                duration: 2000
              })
              let todos = that.data.todos;
              todos.splice(index,1)
              that.setData({todos})
            }
          })
        }else if(tapIndex==1){
          Todo.deleteItem(id).then(res =>{
            console.log(res)
            if(res.code==200) {
              wx.showModal({
                title: '提示',
                content: '是否删除该任务',
                success(res) {
                  if (res.confirm) {
                    console.log('用户点击确定');
                    let todos=that.data.todos;
                    todos.splice(index,1)
                    that.setData({todos})
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
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