import * as React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { TodosTable } from './TodosTable';

describe('TodosTable', () => {

  it('si no tenemos tareas, debe de mostrar el texto indicándolo', () => {
    const todos = [];

    const { getByText } = render(<TodosTable todos={todos} />);

    const element = getByText('No existen tareas');
    expect(element).not.toBeNull();
    expect(element.tagName).toEqual('TD');
  });

  it('si se le pasa una tarea, se debe de pintar en la tabla correctamente', () => {
    const todos = [{ userId: 1, id: 1, title: 'Comprar', completed: true }];

    const { getByText } = render(<TodosTable todos={todos} />);

    const elementTitle = getByText('Comprar');
    expect(elementTitle).not.toBeNull();
    expect(elementTitle.tagName).toEqual('TD');

    const editButton = getByText('Editar');
    expect(editButton).not.toBeNull();
    expect(editButton.tagName).toEqual('BUTTON');

    const deleteButton = getByText('Borrar');
    expect(deleteButton).not.toBeNull();
    expect(deleteButton.tagName).toEqual('BUTTON');
  });

  it('al agregar una nueva tarea la función addTodo es llamada correctamente y se limpia el input', async () => {      
    const addTodo = jest.fn();
    const todos = [{ userId: 1, id: 1, title: 'Comprar', completed: true }];

    const { getByTestId } = render(<TodosTable todos={todos} addTodo={addTodo} />);

    const inputElement = getByTestId('todo-input') as HTMLInputElement;
    const newTodoButton = await waitForElement(() => getByTestId('addTodo-button')) as HTMLButtonElement;

    fireEvent.change(inputElement, { target: { value: 'Tirar la basura' }})
    expect(inputElement.value).toEqual('Tirar la basura')

    fireEvent.click(newTodoButton)

    expect(addTodo).toHaveBeenCalledTimes(1)
    expect(inputElement.value).toEqual('')
  });
});