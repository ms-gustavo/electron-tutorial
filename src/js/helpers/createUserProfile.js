import db from "../db/firestore";

export const createUserProfile = (userProfile) => {
  db.collection("profiles").doc(userProfile.uid).set(userProfile);
};
