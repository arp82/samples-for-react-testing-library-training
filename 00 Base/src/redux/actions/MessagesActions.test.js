import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import * as actions from './MessagesActions';
import * as BEApi from '../../API/myBackEndApiEndpoint'
import { getListOfMessages, setMessage, } from '../../API'


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const newMessage = {body: 'Important appointment', subject: 'Urgent'}

describe('MessagesActions', () => {
    it('should messages Actions constants be created', () =>{
        expect(actions.GET_ALL).toBe('GET_MESSAGES');
        expect(actions.ADD_MESSAGE).toBe('ADD_MESSAGE');
    })

    it('should get all messages returns all messages', () => {
        BEApi.getMessages().then(response => {
            let result = {
                type: actions.GET_ALL,
                payload: response,
            }

            expect(actions.getAllMessages()).toBe(result);
        })
    })

    it('should get all messages returns all messages', () => {
        BEApi.addMessage(newMessage).then(response => {
            let result = {
                type: actions.ADD_MESSAGE,
                payload: response,
            }

            expect(actions.addMessage(newMessage)).toBe(result);
        })
    })

    // it('should getAllMessages to call getListOfMessages', () =>{
    //     actions.getAllMessages();
    //     expect(getListOfMessages).toHaveBeenCalled();
    // })

    // it('should get all messages to call getListOfMessages', () =>{
    //     actions.addMessage(newMessage);
    //     expect(setMessage).toHaveBeenCalledWith(newMessage);
    // })
});