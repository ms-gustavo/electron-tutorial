import firebase from "firebase/app";
import "firebase/auth";
import { createUserProfile } from "../helpers/createUserProfile";

export async function register({ email, password, username, avatar }) {
  const { user } = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  await createUserProfile({
    uid: user.uid,
    username,
    email,
    avatar,
    joinedChats: [],
  });
}

export const login = ({ email, password }) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const logout = () => firebase.auth().signOut();

export const onAuthStateChanges = (onAuth) => {
  firebase.auth().onAuthStateChanged(onAuth);
};