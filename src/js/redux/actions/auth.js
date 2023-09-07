import * as api from "../../api/auth";
import { getUserProfile } from "../../helpers/getUserProfile";

export const registerUser = (formData) => (dispatch) => {
  dispatch({
    type: "AUTH_REGISTER_INIT",
  });
  return api.register(formData).then((_) => {
    dispatch({
      type: "AUTH_REGISTER_SUCCESS",
    });
  });
};

export const loginUser = (formData) => (dispatch) => {
  dispatch({ type: "AUTH_LOGIN_INIT" });
  return api
    .login(formData)
    .then((_) => dispatch({ type: "AUTH_LOGIN_SUCCESS" }));
};

export const logoutUser = () => (dispatch) =>
  api.logout().then(() => dispatch({ type: "AUTH_LOGOUT_SUCCESS" }));

export const listenToAuthChanges = () => (dispatch) => {
  dispatch({ type: "AUTH_ON_INIT" });
  api.onAuthStateChanges(async (authUser) => {
    if (authUser) {
      const userProfile = await getUserProfile(authUser.uid);
      dispatch({ type: "AUTH_ON_SUCCESS", user: userProfile });
    } else {
      dispatch({ type: "AUTH_ON_ERROR" });
    }
  });
};
