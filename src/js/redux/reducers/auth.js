import { combineReducers } from "redux";
import { createErrorReducer, createIsFetchingReducer } from "./common";
import { types } from "../types";

function createLoginReducer() {
  return combineReducers({
    isChecking: createIsFetchingReducer(types.AUTH_LOGIN),
    error: createErrorReducer(types.AUTH_LOGIN),
  });
}

function createRegisterReducer() {
  return combineReducers({
    isChecking: createIsFetchingReducer(types.AUTH_REGISTER),
    error: createErrorReducer(types.AUTH_REGISTER),
  });
}

function createAuthReducer() {
  const user = (state = null, action) => {
    switch (action.type) {
      case types.AUTH_ON_ERROR:
      case types.AUTH_ON_INIT:
        return null;
      case types.AUTH_REGISTER_SUCCESS:
      case types.AUTH_LOGIN_SUCCESS:
      case types.AUTH_ON_SUCCESS:
        return action.user;
      default:
        return state;
    }
  };

  return combineReducers({
    user,
    isChecking: createIsFetchingReducer(types.AUTH_ON),
    login: createLoginReducer(),
    register: createRegisterReducer(),
  });
}

export default createAuthReducer();
