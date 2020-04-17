import * as BEApi from './myBackEndApiEndpoint';
import { Message } from '../model';

export const getListOfMessages = (): Promise<Message[]> => {
  return BEApi.getMessages()
    .then(resolveMessages)
    .catch(handleError);
}

export const setMessage = (message : Message) : Promise<Message[]> => {
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