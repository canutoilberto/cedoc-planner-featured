import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../database/firebase";

export const getItems = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "archiveControls"));
    return querySnapshot;
  } catch (error) {
    console.log(error.message);
  }
};

export const addItem = async (item) => {
  try {
    const docRef = await addDoc(collection(db, "archiveControls"), item);
    return { ...item, id: docRef.id };
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const deleteItem = async (id) => {
  try {
    await deleteDoc(doc(db, "archiveControls", id));
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const updateItem = async (id, updateItem) => {
  try {
    const docRef = doc(db, "archiveControls", id);
    await updateDoc(docRef, updateItem);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const formatDataInfo = (timestamp) => {
  if (timestamp instanceof Timestamp) {
    const date = timestamp.toDate();
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("pt-BR", options);
  } else if (timestamp instanceof Date) {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return timestamp.toLocaleDateString("pt-BR", options);
  } else {
    return "";
  }
};