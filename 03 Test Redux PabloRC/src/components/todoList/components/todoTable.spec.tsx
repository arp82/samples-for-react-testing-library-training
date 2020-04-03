import * as React from 'react';
import { shallow } from 'enzyme';
import { TodoEntity } from '../../../model/todo';
import { TodoTableComponent } from './todoTable';

describe('TodoTableComponent', () => {
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
    
    const component = shallow(
      <TodoTableComponent todos={todos}/>,
    );

    expect(component).toMatchSnapshot();
  });
});
