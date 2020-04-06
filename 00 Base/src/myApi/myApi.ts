import * as BEApi from './myBackEndApiEndpoint';

export const getListOfMessages = (): Promise<Object[]> => {
  return BEApi.getMessages()
    .then(resolveMessages)
    .catch(handleError);
}

export const anotherTest = () => {
}

export const setMessage = (message : Object) : Promise<Object[]> => {
  return BEApi.addMessage(message)
    .then(resolveMessages)
    .catch(handleError);
}




const resolveMessages = (listOfMessages: Object[]) => {
  return listOfMessages;
}

const handleError = () => {
  throw new Error('Something unexpected occurred');
}