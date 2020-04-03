import {actionsEnums} from '../common/actionsEnums';
import {TodoEntity} from '../model/todo';
import {todoAPI} from '../api/todo';

export const todoRequestCompletedAction = (todos: TodoEntity[]) => {
    return {
        type: actionsEnums.TODO_REQUEST_COMPLETED,
        payload: todos
    }
}

export const todoRequest = () => (dispatcher) =>{
    const promise = todoAPI.getAllTodos();

    promise.then(
        (data) => dispatcher(todoRequestCompletedAction(data))
    )

    return promise;
}