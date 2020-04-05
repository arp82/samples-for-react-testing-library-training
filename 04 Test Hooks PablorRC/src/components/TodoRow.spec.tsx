import * as React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { TodoRow } from '.';

describe('TodoRow', () => {

  it('si se le pasa una tarea completada, se debe de pintar Completada', () => {
    const todo = { userId: 1, id: 1, title: 'Comprar', completed: true };

    const { getByText } = render(<TodoRow todo={todo} />);

    const textCompleted = getByText('Completada');
    expect(textCompleted).not.toBeNull();
    expect(textCompleted.tagName).toEqual('TD');
  });

  it('si se le pasa una tarea no completada, se debe de pintar Pendiente', () => {
    const todo = { userId: 1, id: 1, title: 'Comprar', completed: false };

    const { getByText } = render(<TodoRow todo={todo} />);

    const textCompleted = getByText('Pendiente');
    expect(textCompleted).not.toBeNull();
    expect(textCompleted.tagName).toEqual('TD');
  });

  it('si no se está editando, la tarea tiene que mostrarse como texto', () => {
    const todo = { userId: 1, id: 1, title: 'Comprar', completed: false };

    const { getByText } = render(<TodoRow todo={todo} />);

    const textCompleted = getByText('Pendiente');
    expect(textCompleted).not.toBeNull();
    expect(textCompleted.tagName).toEqual('TD');

    const textTitle = getByText('Comprar');
    expect(textTitle).not.toBeNull();
    expect(textTitle.tagName).toEqual('TD');
  });

  it('la función deleteTodo es llamada correctamente', async () => {      
    const deleteTodo = jest.fn();
    const todo = { userId: 1, id: 1, title: 'Comprar', completed: true };

    const { getByTestId } = render(<TodoRow key={todo.id} todo={todo} deleteTodo={deleteTodo} />);

    const deleteTodoButton = await waitForElement(() => getByTestId('deleteTodo-button')) as HTMLButtonElement;

    fireEvent.click(deleteTodoButton)

    expect(deleteTodo).toHaveBeenCalledTimes(1)
  });

  // it('la función updateTodo es llamada correctamente', async () => {      
  //   const updateTodo = jest.fn();
  //   const todo = { userId: 1, id: 1, title: 'Comprar', completed: true };

  //   const { getByTestId } = render(<TodoRow key={todo.id} todo={todo} updateTodo={updateTodo} />);

  //   const updateTodoButton = await waitForElement(() => getByTestId('updateTodo-button')) as HTMLButtonElement;

  //   fireEvent.click(updateTodoButton)

  //   expect(updateTodo).toHaveBeenCalledTimes(1)
  // });

});