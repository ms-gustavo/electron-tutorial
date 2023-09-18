import db from "../db/firestore";

const extracSnapshotData = (snapshot) =>
  snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

export const fetchChats = () =>
  db.collection("chats").get().then(extracSnapshotData);

export const createChat = (chatData) =>
  db
    .collection("chats")
    .add(chatData)
    .then((docRef) => docRef.id);
