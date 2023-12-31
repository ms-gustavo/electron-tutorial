import firebase from "firebase/app";
import "firebase/auth";
import { createUserProfile } from "../helpers/createUserProfile";
import { getUserProfile } from "../helpers/getUserProfile";

export async function register({ email, password, username, avatar }) {
  const { user } = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  const userProfile = {
    uid: user.uid,
    username,
    email,
    avatar,
    joinedChats: [],
  };
  await createUserProfile(userProfile);
  return userProfile;
}

export const login = async ({ email, password }) => {
  const { user } = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  const userProfile = await getUserProfile(user.uid);
  return userProfile;
};

export const logout = () => firebase.auth().signOut();

export const onAuthStateChanges = (onAuth) => {
  firebase.auth().onAuthStateChanged(onAuth);
};
