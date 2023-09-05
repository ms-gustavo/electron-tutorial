import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCkAklHyGv60BYHt6sDMzEpuXcrBQ-Pqu8",
  authDomain: "electron-chat-9fb07.firebaseapp.com",
  projectId: "electron-chat-9fb07",
  storageBucket: "electron-chat-9fb07.appspot.com",
  messagingSenderId: "1065041782458",
  appId: "1:1065041782458:web:72651fd78cf79f6dcc0483",
  measurementId: "G-M12C7Z2SYB",
};

export const { Timestamp } = firebase.firestore;

export default firebase.initializeApp(config).firestore();
