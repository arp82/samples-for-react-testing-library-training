import React, { useState } from 'react'

export const TodoRow = props => {
  const [ editing, setEditing ] = useState(false)
  const [ currentTodo, setCurrentTodo ] = useState(props.todo)
  
  const onChangeInput = event => {
    const { value } = event.target

    setCurrentTodo({ ...currentTodo, title: value})
  }
  
  const onCancel = () => {
    setEditing(false)
    setCurrentTodo({ ...currentTodo, title: props.todo.title})
  }

  const onAcept = () => {
    setEditing(false)
    props.updateTodo(id, currentTodo)
  }

  const { id, title, completed } = props.todo
  
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{editing ? (
        <input data-testid="editTodo-input" type="text" name="title" value={currentTodo.title} onChange={onChangeInput} />
      ) : title}</td>
      <td>{completed ? 'Completada' : 'Pendiente'}</td>
      {editing ? (
        <td>
        <button
          data-testid="updateTodo-button"
          onClick={() => onAcept()}
        >
          Aceptar
        </button>
        <button
          onClick={() => onCancel()}
        >
          Cancelar
        </button>
      </td>
      ) : (
        <td>
          <button
            onClick={() => setEditing(true)}
          >
            Editar
          </button>
          <button
            data-testid="deleteTodo-button"
            onClick={() => props.deleteTodo(id)}
          >
            Borrar
          </button>
        </td>
      )}
    </tr>
  )
}
