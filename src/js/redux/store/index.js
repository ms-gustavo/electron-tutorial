import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import appMiddleware from "../../middlewares/app";
import { types } from "../types";
import chatReducer from "../reducers/chats";
import authReducer from "../reducers/auth";
import appReducer from "../reducers/app";
import settingsReducer from "../reducers/settings";

export default function initStore() {
  const middlewares = [thunkMiddleware, appMiddleware];

  const mainReducer = combineReducers({
    chats: chatReducer,
    auth: authReducer,
    app: appReducer,
    settings: settingsReducer,
  });

  const rootReducer = (state, action) => {
    if (action.type === types.AUTH_LOGOUT_SUCCESS) {
      Object.keys(state).forEach((stateKey) => {
        if (state[stateKey].savable) {
          return;
        }
        state[stateKey] = undefined;
      });
    }

    return mainReducer(state, action);
  };

  const store = configureStore({
    reducer: rootReducer,
    middleware: [...middlewares],
  });

  return store;
}
