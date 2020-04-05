import * as React from 'react';
import { TodosTable } from './components';
import { useTodos } from './components/useTodos';

export const App = () => {
    // // Data *-*-*- ELIMINAR
	// const todosData = [
	// 	{ userId: 1, id: 1, title: 'Comprar', completed: true },
	// 	{ userId: 1, id: 2, title: 'Tirar la basura', completed: false },
	// 	{ userId: 1, id: 3, title: 'Ir al gimnasio', completed: false },
	// ]
	
	// const todosData = [
	// 	{ userId: 1, id: 1, title: 'Comprar', completed: true },
	// ]
	
	const {todos, deleteTodo, addTodo, updateTodo} = useTodos()

	return (
		<div className="App">
			<h1>Tareas</h1>
			<TodosTable todos={todos} deleteTodo={deleteTodo} addTodo={addTodo} updateTodo={updateTodo} />
		</div>
	)
}