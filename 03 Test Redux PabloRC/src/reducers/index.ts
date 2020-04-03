import { combineReducers} from 'redux';
import { todoReducer, todoState } from './todoReducer';

export interface State {
  todoReducer : todoState;
};

export const reducers = combineReducers<State>({
  todoReducer,
});