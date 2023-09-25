import { types } from "../types";
import Storage from "../../utils/storage";

const INITIAL_STATE = {
  isDarkTheme: false,
};

export default function settingsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SETTINGS_UPDATE:
      return { ...state, [action.setting]: action.value };
    case types.SETTINGS_INITIAL_LOAD:
      const storedSettings = Storage.getItem("app-settings");
      return { ...state, ...storedSettings };
    default:
      return state;
  }
}
