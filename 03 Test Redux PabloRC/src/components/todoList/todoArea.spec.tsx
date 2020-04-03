import * as React from 'react';
import { shallow } from 'enzyme';
import { TodoAreaComponent } from './todoArea';
import { TodoEntity } from '../../model/todo';

describe('TodoAreaComponent', () => {
  it('should render as expected', () => {
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
            completed: false,
        }
    ]

    const loadTodos = () => { };
    
    const component = shallow(
      <TodoAreaComponent todos={todos} loadTodos={loadTodos}/>,
    );

    expect(component).toMatchSnapshot();
  });
});
