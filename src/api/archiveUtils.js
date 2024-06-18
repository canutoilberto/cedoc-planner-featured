import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
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
