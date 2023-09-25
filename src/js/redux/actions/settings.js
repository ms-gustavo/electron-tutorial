import { types } from "../types";

export const updateSettings = (setting, value) => {
  return {
    type: types.SETTINGS_UPDATE,
    setting,
    value,
  };
};

export const loadInitialSettings = () => ({
  type: types.SETTINGS_INITIAL_LOAD,
});
