import {MessagesReducer} from './MessagesReducer';
import { GET_ALL, ADD_MESSAGE } from '../actions/MessagesActions';
import expect from 'expect';


const getAllAction = {
  type: GET_ALL,
  payload: [
    {
      id: 0,
      subject: 'Hello world',
      body: 'Hello world'
    }
  ]
};

const addMessageAction = {
  type: ADD_MESSAGE,
  payload: {
    id: 1,
    subject: 'Hello world again',
    body: 'Hello world again'
  }
};

describe('Messages Reducer', () =>{
  it('should return initial state', () =>{
    expect(MessagesReducer(undefined, {})).toEqual({messages: []});
  });

  it('should GET_ALL action retrieves all messages in payload', () =>{
    const initialState = {
      messages: [],
    };

    expect(MessagesReducer(initialState, getAllAction)).toEqual({messages: getAllAction.payload});
  });
    
  it('should add a new message with ADD_MESSAGE data', () =>{
    const messages = getAllAction.payload;
    expect(MessagesReducer({messages: messages}, addMessageAction ).messages).toHaveLength(2);
  });
});


