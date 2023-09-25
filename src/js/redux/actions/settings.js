import { types } from "../types";

export const updateSettings = (setting, value) => {
  alert(
    JSON.stringify({
      type: types.SETTINGS_UPDATE,
      setting,
      value,
    })
  );
  return {
    type: types.SETTINGS_UPDATE,
    setting,
    value,
  };
};
