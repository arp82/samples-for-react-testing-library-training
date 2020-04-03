import {TodoEntity } from '../model/todo';
const axios = require('axios').default;

class TodoAPI {

  getAllTodos() : Promise<TodoEntity[]> {
    const todosUrl : string = 'https://jsonplaceholder.typicode.com/todos';

    return axios.get(todosUrl)
      .then((response) => response.data)
  }
  
}

export const todoAPI = new TodoAPI();