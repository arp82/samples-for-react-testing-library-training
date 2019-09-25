import * as BEApi from './myBackEndApiEndpoint';

export const getListOfFruit = (): Promise<string[]> => {
  return BEApi.getFruits('http://fruityfruit.com')
    .then(resolveFruits)
    .catch(handleError);
}

const resolveFruits = (fruits: string[]) => {
  return fruits;
}

const handleError = () => {
  throw new Error('Where is my fruit???');
}