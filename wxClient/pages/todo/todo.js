const Todo = require('./../../models/todo.js');
const {formatTime} = require('./../../utils/util.js');

Page({
  data:{
    todos:[],
    value:'',
  },
  onShow:function(){
  //生命周期回调—监听页面显示
     Todo.showTodo({status:0}).then(res=>{
      // console.log(res.data.todos);
      this.setData({todos:res.data.todos})
     })  
  },
  valueInput:function(event){
    let value = event.detail.value;
    this.setData({value})
  },
  valueInsert:function(event){
    let title = event.detail.value;
    // console.log(title);
    Todo.insertTodo({title}).then(res => {
      // console.log(res) //{code:200,data:{id:id}}
      let create_time = formatTime(new Date());
      // console.log(create_time);
      let id = res.data.id;//前台接收后台返回的数据id
      // console.log(id)
      let todos = this.data.todos;
      todos.push({id,title,create_time})
      this.setData({value:'',todos})
    })
  },
  shadePopup:function(event){
    let id =event.currentTarget.dataset.id;
    console.log(id);
    let index =event.currentTarget.dataset.index;
    console.log(index);
    let that = this;//(这里的this整个事件的数据Page({}))
    wx.showActionSheet({
      itemList: ['关联', '完成', '删除'],
      success(res) {
        // console.log(res.tapIndex)
        let tapIndex = res.tapIndex;
        if(tapIndex==0){
          wx.navigateTo({url:'/pages/todo_keyresult/todo_keyresult?id=' +id})
          return
        }else if(tapIndex==1){
          // return that.updateTodo(id,index);
          Todo.updateItem(id,{status:1}).then(res =>{
            console.log(res)
            if(res.code==200){
              wx.showToast({
                title: '标记成功',
                icon: 'success',
                duration: 2000
              })
              // console.log(this);//undefined(这里的this为showActionSheet)
              // console.log(that);//为整个事件的数据
              let todos = that.data.todos;
              todos.splice(index,1)
              that.setData({todos})
            }
          })
        }else if(tapIndex==2){
          wx.showModal({
            title: '提示',
            content: '是否删除该任务',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定');
                Todo.deleteItem(id).then(res =>{
                console.log(res)
                  if(res.code==200) {
                    let todos=that.data.todos;
                    todos.splice(index,1)
                    that.setData({todos})
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