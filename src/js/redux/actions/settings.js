import { types } from "../types";

export const updateSettings = (setting, value) => {
  return {
    type: types.SETTINGS_UPDATE,
    setting,
    value,
  };
};
