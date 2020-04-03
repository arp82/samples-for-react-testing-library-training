import configureStore from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';
const middlewares = [ReduxThunk];
const mockStore = configureStore(middlewares);

import { todoAPI } from './todo';

describe('todo API', () => {
  it('se realiza la llamada', async () => {
    const todos = [
        {
            userId: 1,
            id: 1,
            title: 'Hacer la compra',
            completed: true,
        },
        {
            userId: 1,
            id: 2,
            title: 'Ir al gimnasio',
            completed: false,
        }
    ]
    const spyedTodos = jest.spyOn(todoAPI, 'getAllTodos').mockResolvedValue(todos)

    const response = await todoAPI.getAllTodos()

    expect(spyedTodos).toHaveBeenCalled()
    expect(response).toEqual(todos)
  });
});
