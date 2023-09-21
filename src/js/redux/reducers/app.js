import { combineReducers } from "redux";
import { types } from "../types";

function createAppReducer() {
  const { onLine } = navigator;
  const isOnline = (state = onLine, action) => {
    switch (action.type) {
      case types.APP_IS_ONLINE:
      case types.APP_IS_OFFLINE:
        return action.isOnline;
      default: {
        return state;
      }
    }
  };

  return combineReducers({
    isOnline,
  });
}

export default createAppReducer();
