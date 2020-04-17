import axios from 'axios';

let messages = [];
const API_URL = 'https://my-json-server.typicode.com/Dacalez/demo/messages';

export const getMessages= () => {
  return axios.get(API_URL ).then(response => {
    messages = response.data
    return Promise.resolve(messages);
  })
}

export const addMessage = (newMessage) =>{
  newMessage['id'] = messages.length,
  messages.push(newMessage);
  return Promise.resolve(messages);
}

