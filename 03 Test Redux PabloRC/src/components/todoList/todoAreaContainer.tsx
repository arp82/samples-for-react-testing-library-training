import { connect } from 'react-redux';
import { todoRequest } from '../../actions/todoRequest';
import { TodoAreaComponent } from './todoArea';
import { State } from '../../reducers';

const mapStateToProps = (state  :State) => {
  return{
      todos: state.todoReducer
  };
}

const mapDispatchToProps = dispatch => {
  return {
    loadTodos: () => {return dispatch(todoRequest())}
  };
}

export const TodosAreaContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoAreaComponent);