module.exports = {
  login:'http://localhost:3000/api/login',
  test:'http://localhost:3000/api/test',
  todo:'http://localhost:3000/api/todo',
  todoId:(id) =>`http://localhost:3000/api/todo/${id}`,
  okr:'http://localhost:3000/api/okr',
  okrId:(id)=>`http://localhost:3000/api/okr/${id}`,
  objective:'http://localhost:3000/api/objective',
  objectiveId:(id) =>`http://localhost:3000/api/objective/${id}`,
  keyresult:(id)=>`http://localhost:3000/api/keyresult/${id}`,
  todoKeyresult:(id)=>`http://localhost:3000/api/todo/${id}/keyresult`
}