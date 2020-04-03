import * as deepFreeze from 'deep-freeze';
import { todoReducer, todoState } from './todoReducer';
import { actionsEnums } from '../common/actionsEnums';

describe('todoReducer', () => {
  it('debe devolver el mismo estado al mandarle un tipo erróneo', () => {
    const initialState = [] as todoState;

    const action = {
      type: 'Wrong',
    };

    deepFreeze(initialState);

    const result = todoReducer(initialState, action);

    expect(result).toBe(initialState);
    expect(initialState).not.toBe(undefined);
  });

  describe('handleTodoRequestCompletedAction', () => {
    it('se actualizan los valores cuando le pasamos un type correcto', () => {
      const initialState = [] as todoState;

      const action = {
        type: actionsEnums.TODO_REQUEST_COMPLETED,
        payload: [{
            userId: 1,
            id: 1,
            title: 'Hacer la compra',
            completed: true,
        },
        {
            userId: 1,
            id: 2,
            title: 'Ir al gimnasio',
            completed: false
        }] as todoState,
      };

      deepFreeze(initialState);

      const result = todoReducer(initialState, action);

      expect(result).toBe(action.payload);
    });
  });
});
