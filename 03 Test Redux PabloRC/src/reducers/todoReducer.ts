import {actionsEnums} from '../common/actionsEnums';
import {TodoEntity} from '../model/todo';

export type todoState =  TodoEntity[];

export const todoReducer =  (state : todoState = [], action) => {
  switch (action.type) {
    case actionsEnums.TODO_REQUEST_COMPLETED:
      return handleTodoRequestCompletedAction(state, action.payload);
  }

  return state;
};

const handleTodoRequestCompletedAction = (state : todoState, todos) => {
  return todos;
}