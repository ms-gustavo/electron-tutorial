import { types } from "../types";

export const createErrorReducer =
  (actionType) =>
  (state = null, action) => {
    switch (action.type) {
      case `${actionType}${types._INIT}`:
        return null;
      case `${actionType}${types._ERROR}`:
        return action.error;
      default:
        return state;
    }
  };

export const createIsFetchingReducer =
  (actionType) =>
  (state = false, action) => {
    switch (action.type) {
      case `${actionType}${types._INIT}`:
        return true;
      case `${actionType}${types._SUCCESS}`:
      case `${actionType}${types._ERROR}`:
        return false;
      default:
        return state;
    }
  };
