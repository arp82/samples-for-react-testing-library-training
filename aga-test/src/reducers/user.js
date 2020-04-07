import {
  USERS_UPDATE,
  USER_UPDATE,
  USER_CREATE,
  USER_DELETE,
} from "../actions/user";

const initialState = { users: [] };

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USERS_UPDATE: {
      return { ...state, users: payload };
    }
    case USER_UPDATE: {
      const users = state.users.map((obj) =>
        payload.id === obj.id ? payload : obj
      );
      return { ...state, users: users };
    }
    case USER_DELETE: {
      const users = state.users.filter(obj => obj.id !== payload.id);

      return { ...state, users: users };
    }
    case USER_CREATE: {
      const id = "_" + Math.random().toString(36).substr(2, 9);
      const user = { ...payload, id: id };
      return { ...state, users: [...state.users, user] };
    }
    default:
      return state;
  }
};

export default userReducer;
