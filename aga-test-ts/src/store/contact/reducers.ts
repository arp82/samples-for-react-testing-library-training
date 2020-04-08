import {
  Contact,
  ContactActionTypes,
  USERS_UPDATE,
  USER_UPDATE,
  USER_CREATE,
  USER_DELETE,
} from "./types";

export function contactReducer(state: Array<Contact> = [], action: ContactActionTypes) {
  switch (action.type) {
    case USERS_UPDATE: {
      return action.payload;
    }
    case USER_UPDATE: {
      const contacts = state.map((obj) =>
        action.payload.contact.id === obj.id ? action.payload.contact : obj
      );
      return contacts;
    }
    case USER_DELETE: {
      const contacts = state.filter((obj) => obj.id !== action.payload.contact.id);

      return contacts;
    }
    case USER_CREATE: {
      return [...state, action.payload.contact];
    }
    default:
      return state;
  }
}
