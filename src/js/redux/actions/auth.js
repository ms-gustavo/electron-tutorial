import * as api from "../../api/auth";

export const register = (formData) => (dispatch) =>
  api.register(formData).then((_) => {
    dispatch({
      type: "AUTH_REGISTER_SUCCESS",
    });
  });

export const loginUser = (formData) => (dispatch) =>
  api.login(formData).then((_) => dispatch({ type: "AUTH_LOGIN_SUCCESS" }));

export const logout = () => (dispatch) =>
  api.logout().then(() => dispatch({ type: "AUTH_LOGOUT_SUCCESS" }));

export const listenToAuthChanges = () => (dispatch) => {
  dispatch({ type: "AUTH_ON_INIT" });
  api.onAuthStateChanges((authUser) => {
    if (authUser) {
      dispatch({ type: "AUTH_ON_SUCCESS", user: authUser });
    } else {
      dispatch({ type: "AUTH_ON_ERROR" });
    }
  });
};
