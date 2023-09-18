import db from "../db/firestore";
import firebase from "firebase/app";

const extracSnapshotData = (snapshot) =>
  snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

export const fetchChats = () =>
  db.collection("chats").get().then(extracSnapshotData);

export const createChat = (chatData) =>
  db
    .collection("chats")
    .add(chatData)
    .then((docRef) => docRef.id);

export const joinChat = async (userId, chatId) => {
  const userRef = db.doc(`profiles/${userId}`);
  const chatRef = db.doc(`chats/${chatId}`);

  await userRef.update({
    joinedChats: firebase.firestore.FieldValue.arrayUnion(chatRef),
  });
  await chatRef.update({
    joinedUsers: firebase.firestore.FieldValue.arrayUnion(userRef),
  });
};
