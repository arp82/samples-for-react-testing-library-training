let messages = [
  {id: 0, subject: 'Hello world', body: 'Hello world'},
  {id: 1, subject: 'Hello world again', body: 'Hello world again'},
]

export const getMessages= () => {
  return Promise.resolve(messages);
}

export const addMessage = (newMessage) =>{
  newMessage['id'] = messages.length,
  messages.push(newMessage);
  return Promise.resolve(messages);
}

