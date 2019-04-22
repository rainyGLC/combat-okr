module.exports = {
  login:'http://localhost:3000/api/login',
  test:'http://localhost:3000/api/test',
  todo:'http://localhost:3000/api/todo',
  todoId:(id) =>`http://localhost:3000/api/todo/${id}`
}