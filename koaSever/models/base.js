const knex = require('./knex');
class Base {
  constructor(props) {
    this.table = props;
  }

  all(){
    return new Promise((reslove,reject)=>{
      knex(this.table).select().then( res => {
        reslove(res)
      }).catch( err => {
        reject(err)
      })
    })
  }

  select(params) {
    return new Promise((reslove,reject)=>{
      knex(this.table).select().where(params)
      .then( res => {
        reslove(res)
      }).catch( err => {
        reject(err)
      })
    })
  }
  selectIn(params) {
    return knex(this.table).whereIn(params.key,params.value).select()
  }

  where(params){
    return knex(this.table).where(params)
  }

  insert(params){
    return new Promise((reslove,reject)=>{
      knex(this.table).insert( params )
      .then( res => {
        reslove(res)
      }).catch( err => {
        reject(err)
      })
    })
  }

  update(id, params ){
    return new Promise((reslove,reject)=>{
      knex(this.table).where('id', '=', id).update( params )
      .then( res => {
        reslove(res)
      }).catch( err => {
        reject(err)
      })
    })
  }

  delete(id){
    return new Promise((reslove,reject)=>{
      knex(this.table).where('id', '=', id).del()
      .then( res => {
        reslove(res)
      }).catch( err => {
        reject(err)
      })
    })
  }
}

module.exports = Base;