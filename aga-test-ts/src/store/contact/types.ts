export interface Contact {
  readonly id: string;
  readonly name: string;
  readonly email: string;
}

export const USERS_UPDATE = "USERS_UPDATE";
export const USER_UPDATE = "USER_UPDATE";
export const USER_CREATE = "USER_CREATE";
export const USER_DELETE = "USER_DELETE";

interface loadAllContactsAction {
  type: typeof USERS_UPDATE;
  payload: Array<Contact>;
}

interface contactUpdateAction {
  type: typeof USER_UPDATE;
  payload: {
    contact: Contact;
  };
}

interface contactCreateAction {
  type: typeof USER_CREATE;
  payload: {
    contact: Contact;
  };
}

interface contactDeleteAction {
  type: typeof USER_DELETE;
  payload: {
    contact: Contact;
  };
}

export type ContactActionTypes =
  | loadAllContactsAction
  | contactUpdateAction
  | contactCreateAction
  | contactDeleteAction;
