import { types } from "../types";

const INITIAL_STATE = {
  isDarkTheme: false,
  playSound: true,
  showNotifications: true,
};

export default function settingsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SETTINGS_UPDATE:
      return { ...state, [action.setting]: action.value };
    default:
      return state;
  }
}
