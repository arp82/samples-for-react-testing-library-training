import expect from 'expect';
import * as actions from './MessagesActions';
import * as BEApi from '../../API/myBackEndApiEndpoint'


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

    it('should add Message return newMessage in its payload', () => {
        BEApi.addMessage(newMessage).then(response => {
            let result = {
                type: actions.ADD_MESSAGE,
                payload: response,
            }

            expect(actions.addMessage(newMessage)).toBe(result);
        })
    })
});