import * as React from 'react';
import { render } from '@testing-library/react';
import { App } from './app';

describe('App', () => {

    it('debe cargar el título', () => {
        const { getByText } = render(<App />);

        const element = getByText('Tareas');
        expect(element).not.toBeNull();
        expect(element.tagName).toEqual('H1');
    });

    it('debe cargar la tabla', () => {
        const { getByText, getByTestId } = render(<App />);

        const headerId = getByText('Id');
        expect(headerId).not.toBeNull();
        expect(headerId.tagName).toEqual('TH');

        const headerTitle = getByText('Título');
        expect(headerTitle).not.toBeNull();
        expect(headerTitle.tagName).toEqual('TH');

        const headerCompleted = getByText('Completada');
        expect(headerCompleted).not.toBeNull();
        expect(headerCompleted.tagName).toEqual('TH');

        const headerActions = getByText('Acciones');
        expect(headerActions).not.toBeNull();
        expect(headerActions.tagName).toEqual('TH');

        const newTodo = getByText('Nueva tarea:');
        expect(newTodo).not.toBeNull();
        expect(newTodo.tagName).toEqual('TD');

        const inputElement = getByTestId('todo-input') as HTMLInputElement;
        expect(inputElement.value).toEqual('')

        const newTodoButton = getByText('Agregar tarea');
        expect(newTodoButton).not.toBeNull();
        expect(newTodoButton.tagName).toEqual('BUTTON');
    });
});