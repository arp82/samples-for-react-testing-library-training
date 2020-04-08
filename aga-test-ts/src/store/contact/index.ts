import { combineReducers } from "redux";
import { contactReducer } from "./reducers";

export const rootReducer = combineReducers({ contactReducer });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer