import * as React from 'react';
import {TodoTableComponent} from './components/todoTable';
import {TodoEntity} from '../../model/todo'

interface Props {
  todos: Array<TodoEntity>;
  loadTodos: () => any;
}

export class TodoAreaComponent extends React.Component<Props> {

  componentDidMount() {
    this.props.loadTodos()
  }

  render() {
    const { todos } = this.props

    if(todos && todos.length === 0) {
      return <p>Cargando datos...</p>
    }

    return (
      <TodoTableComponent todos={todos}/>
    )
  }
}