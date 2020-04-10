import expect from 'expect';
import * as actions from './MessagesActions';
import * as BEApi from '../../API/myBackEndApiEndpoint'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const newMessage = { body: 'Important appointment', subject: 'Urgent' }

describe('MessagesActions', () => {
    let store;
    beforeEach(() => {
        store = mockStore({ messages: [] })
    })

    it('should messages Actions constants be created', () => {
        expect(actions.GET_ALL).toBe('GET_MESSAGES');
        expect(actions.ADD_MESSAGE).toBe('ADD_MESSAGE');
    })

    it('should get all messages returns all messages', () => {
        return store.dispatch(actions.getAllMessages()).then(() => {
            const getAllMessageAction = store.getActions()[0];
            expect(getAllMessageAction.type).toBe(actions.GET_ALL);
            expect(getAllMessageAction.payload).toHaveLength(2);
        })
    })

    it('should add Message return newMessage in its payload', () => {
        BEApi.addMessage(newMessage).then(response => {
            const result = {
                type: actions.ADD_MESSAGE,
                payload: response[response.length - 1],

            }
            store.dispatch(actions.addMessage(newMessage)).then(() => {
                expect(store.getActions()).toContainEqual(result);
            })
        })
    })
});