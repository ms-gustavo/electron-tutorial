import firebase from "firebase/app";
import "firebase/database";
import db from "../db/firestore";

export const getOnlineStatus = (isOnline) => {
  return {
    state: isOnline ? "online" : "offline",
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
  };
};

export const setUserOnlineStatus = (uid, isOnline) => {
  const userRef = db.doc(`/profiles/${uid}`);
  const updatedData = getOnlineStatus(isOnline);
  return userRef.update(updatedData);
};

export const onConnectionChanged = (onConnection) =>
  firebase
    .database()
    .ref(".info/connected")
    .on("value", (snapshot) => onConnection(snapshot.val()));
