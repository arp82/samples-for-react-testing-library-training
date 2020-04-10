import * as BEApi from './myBackEndApiEndpoint';

export interface Message{
  id : number,
  subject: string,
  body: string,
}

export const getListOfMessages = (): Promise<Message[]> => {
  return BEApi.getMessages()
    .then(resolveMessages)
    .catch(handleError);
}

export const setMessage = (message : Object) : Promise<Message[]> => {
  return BEApi.addMessage(message)
    .then(resolveMessages)
    .catch(handleError);
}

const resolveMessages = (listOfMessages: Message[]) => {
  return listOfMessages;
}

const handleError = () => {
  throw new Error('Something unexpected occurred');
}