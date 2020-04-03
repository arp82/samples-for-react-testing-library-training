import * as React from 'react';
import { shallow } from 'enzyme';
import { TodoRowComponent } from './todoRow';
import { TodoEntity } from '../../../model/todo';

describe('TodoRowComponent', () => {
  it('should render as expected', () => {
    const todo: TodoEntity = {
        userId: 1,
        id: 1,
        title: 'Hacer la compra',
        completed: true,
    }
    
    const component = shallow(
      <TodoRowComponent todo={todo}/>,
    );

    expect(component).toMatchSnapshot();
  });
});
