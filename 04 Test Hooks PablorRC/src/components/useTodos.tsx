import * as React from 'react';
import Axios from 'axios'

export const getTodos = (setTodos)  => 
    React.useEffect(() => {
        Axios.get('https://jsonplaceholder.typicode.com/todos?userId=1')
            .then(response => setTodos(response.data));
    }, []);

export const useTodos = (todosData = []) => {
    const [ todos, setTodos] = React.useState(todosData);

    getTodos(setTodos)

	const addTodo = (todo) => {
		todo.id = todos[todos.length - 1].id + 1
		setTodos([ ...todos, todo ])
    }
    
    const deleteTodo = id => {
		setTodos(todos.filter(todo => todo.id !== id))
    }

	const updateTodo = (id, updatedTodo) => {
		setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)))
    }
    
    return {
        todos,
        setTodos,
        getTodos,
        addTodo,
        deleteTodo,
        updateTodo,
    }
}