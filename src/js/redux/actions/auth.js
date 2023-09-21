import * as api from "../../api/auth";
import { getUserProfile } from "../../helpers/getUserProfile";
import { types } from "../types";

export const registerUser = (formData) => (dispatch) => {
  dispatch({ type: types.AUTH_REGISTER_INIT });
  return api
    .register(formData)
    .then((user) => dispatch({ type: types.AUTH_REGISTER_SUCCESS, user }))
    .catch((error) => dispatch({ type: types.AUTH_REGISTER_ERROR, error }));
};

export const loginUser = (formData) => (dispatch) => {
  dispatch({ type: types.AUTH_LOGIN_INIT });
  return api
    .login(formData)
    .then((user) => dispatch({ type: types.AUTH_LOGIN_SUCCESS, user }))
    .catch((error) => {
      dispatch({ type: types.AUTH_LOGIN_ERROR, error });
    });
};

export const logoutUser = () => (dispatch) =>
  api.logout().then(() => {
    dispatch({ type: types.CHATS_FETCH_RESTART });
    dispatch({ type: types.AUTH_LOGOUT_SUCCESS });
  });

export const listenToAuthChanges = () => (dispatch) => {
  dispatch({ type: types.AUTH_ON_INIT });
  return api.onAuthStateChanges(async (authUser) => {
    if (authUser) {
      const userProfile = await getUserProfile(authUser.uid);
      dispatch({ type: types.AUTH_ON_SUCCESS, user: userProfile });
    } else {
      dispatch({ type: types.AUTH_ON_ERROR });
    }
  });
};
