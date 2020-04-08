import { setMessage, getListOfMessages } from './myApi';

describe('API test', () => {
    it('should getListOfMessages return a list of Messages', () => {
        expect(getListOfMessages()).resolves.toHaveLength(2);
    })

    it('should set messages return three messages', () => {
        const newMessage = {
            body: 'Hello world 3',
            subject: 'Hello world 3'
        }
        expect(setMessage(newMessage)).resolves.toHaveLength(3);
    })
}) 