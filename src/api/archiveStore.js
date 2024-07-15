import { create } from "zustand";
import {
  addItem as addItemToFirestore,
  deleteItem as deleteItemFromFirestore,
  updateItem as updateItemInFirestore,
  getItems as getItemsFromFirestore,
  fetchItemsByPeriod as fetchItemsByPeriodFromFirestore,
} from "./archiveUtils";
import { serverTimestamp } from "firebase/firestore";

export const useArchiveStore = create((set) => ({
  data: [],
  setData: (newData) => set({ data: newData }),
  listenData: false,
  setListenData: (listen) => set({ listenData: listen }),
  filterDate: null,
  setFilterDate: (date) => set({ filterDate: date }),
  filter: "",
  setFilter: (program) => set({ filter: program }),

  startDate: null,
  endDate: null,
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),

  currentPage: 1,
  itemsPerPage: 7,
  setPage: (page) => set({ currentPage: page }),

  addItem: async (item) => {
    try {
      const createdAt = serverTimestamp(); // Obtém a hora atual do servidor
      const newItem = { ...item, createdAt }; // Adiciona o campo createdAt ao item
      const addedItem = await addItemToFirestore(newItem); // Adiciona o item ao Firestore
      set((state) => ({
        data: [...state.data, addedItem], // Atualiza o estado com o novo item
      }));
    } catch (error) {
      console.log(error.message);
    }
  },

  deleteItem: async (id) => {
    try {
      await deleteItemFromFirestore(id); // Chama a função deleteItem do archiveUtils.js
      set((state) => ({
        data: state.data.filter((item) => item.id !== id), // Remove o item do estado local
      }));
    } catch (error) {
      console.log(error.message);
    }
  },

  updateItem: async (id, updatedItem) => {
    try {
      await updateItemInFirestore(id, updatedItem); // Chama a função updateItem do archiveUtils.js
      set((state) => ({
        data: state.data.map((item) =>
          item.id === id ? { ...item, ...updatedItem } : item
        ), // Atualiza o item no estado local
      }));
    } catch (error) {
      console.log(error.message);
    }
  },

  fetchItems: async () => {
    try {
      const value = await getItemsFromFirestore(); // Obtém os itens do Firestore
      const items = value.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      items.sort((a, b) => b.date.toMillis() - a.date.toMillis()); // Ordena os itens em ordem decrescente
      set({ data: items });
    } catch (error) {
      console.log(error.message);
    }
  },

  fetchItemsForCurrentMonth: async () => {
    try {
      const value = await getItemsFromFirestore(); // Obtém os itens do Firestore
      const items = value.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const filteredItems = items.filter((item) => {
        const itemDate = item.date.toDate();
        return (
          itemDate.getMonth() === currentMonth &&
          itemDate.getFullYear() === currentYear
        );
      });
      filteredItems.sort((a, b) => b.date.toMillis() - a.date.toMillis());
      set({ data: filteredItems });
    } catch (error) {
      console.log(error.message);
    }
  },

  fetchItemsByPeriod: async (startDate, endDate) => {
    try {
      const items = await fetchItemsByPeriodFromFirestore(startDate, endDate); // Usa a função de archiveUtils
      items.sort((a, b) => b.date.toMillis() - a.date.toMillis());
      set({ data: items });
    } catch (error) {
      console.log(error.message);
    }
  },
}));
