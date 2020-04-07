export const USERS_UPDATE = "users:update";
export const USER_UPDATE = "user:update";
export const USER_CREATE = "user:create";
export const USER_DELETE = "user:delete";

export function usersUpdate(users) {
  return { type: USERS_UPDATE, payload: users };
}

export function userUpdate(user) {
  return { type: USER_UPDATE, payload: user };
}

export function userCreate(user) {
  return { type: USER_CREATE, payload: user };
}

export function userDelete(user) {
  return { type: USER_DELETE, payload: user };
}