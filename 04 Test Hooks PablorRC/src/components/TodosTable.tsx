import React, { useState } from 'react'
import { TodoRow } from '.'

export const TodosTable = props => {
  const initialFormState = { userId: 1, id: null, title: '', completed: false }

  const [ todo, setTodo ] = useState(initialFormState)
  
  const handleInputChange = event => {
		const { name, value } = event.target

		setTodo({ ...todo, [name]: value })
	}

	const onAddSubmit = () => {
		if (!todo.title) {
      alert('Rellene la tarea para poder agregarla')
			return
		}

		props.addTodo(todo)
		setTodo(initialFormState)
  }
  
  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Título</th>
          <th>Completada</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {props.todos.length > 0 ? (
          props.todos.map(todo => <TodoRow key={todo.id} todo={todo} updateTodo={props.updateTodo} deleteTodo={props.deleteTodo} />)
        ) : (
          <tr>
            <td colSpan={4}>No existen tareas</td>
          </tr>
        )}
        <tr>
          <td colSpan={3}>
            Nueva tarea:
            <input data-testid="todo-input" type="text" name="title" value={todo.title} onChange={handleInputChange} />
          </td>
          <td>
            <button data-testid="addTodo-button"  onClick={() => onAddSubmit()}>Agregar tarea</button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}