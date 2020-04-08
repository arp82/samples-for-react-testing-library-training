import {
  Contact,
  USERS_UPDATE,
  USER_UPDATE,
  USER_CREATE,
  USER_DELETE,
  ContactActionTypes,
} from "./types";

export function loadAllContacts(contacts: Array<Contact>): ContactActionTypes {
  return { type: USERS_UPDATE, payload: contacts };
}

export function contactUpdate(contact: Contact): ContactActionTypes {
  return { type: USER_UPDATE, payload: { contact } };
}

export function contactCreate(contact: Contact): ContactActionTypes {
  return { type: USER_CREATE, payload: { contact } };
}

export function contactDelete(contact: Contact): ContactActionTypes {
  return { type: USER_DELETE, payload: { contact } };
}
