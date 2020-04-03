import * as React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';
const middlewares = [ReduxThunk];
const mockStore = configureStore(middlewares);

import { TodoEntity } from "../../model/todo";
import { TodosAreaContainer } from '..';

describe('TodosAreaContainer', () => {
  it('debe pintar TodoAreaComponent cuando tenemos todos', () => {
    const todos: TodoEntity[] = [
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

    const store = mockStore({
      sessionReducer: {
        todos,
      },
    });

    const component = mount(
      <Provider store={store}>
        <TodosAreaContainer />
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });
});
