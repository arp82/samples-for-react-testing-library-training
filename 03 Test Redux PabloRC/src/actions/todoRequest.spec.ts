import configureStore from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';
const middlewares = [ReduxThunk];
const mockStore = configureStore(middlewares);

import { TodoEntity } from "../model/todo";
import { todoRequestCompletedAction } from "./todoRequest";
import { actionsEnums } from "../common/actionsEnums";

describe('todoRequestCompletedAction', () => {
  it('debe devolver acción cuando el tipo sea TODO_REQUEST_COMPLETED', () => {
    const todoResponse: TodoEntity[] = [
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
            completed: false
        }
    ]

    const result = todoRequestCompletedAction(todoResponse);

    expect(result.type).toBe(actionsEnums.TODO_REQUEST_COMPLETED);
    expect(result.payload).toBe(todoResponse);
  });

  it('se realiza la llamada para obtener los todos', () => {
    const todoResponse: TodoEntity[] = [
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
            completed: false
        }
    ]

    const store = mockStore();
    store.dispatch(todoRequestCompletedAction(todoResponse))

    expect(store.getActions()[0].type).toBe(actionsEnums.TODO_REQUEST_COMPLETED);
    expect(store.getActions()[0].payload).toBe(todoResponse);
  });
});