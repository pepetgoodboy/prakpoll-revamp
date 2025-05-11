import { getAllUsersAction } from "@/app/actions";
import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  allUsers: [],
  loading: false,
  currentPage: 1,
  usersPerPage: 10,
  search: "",
  openModalAddUser: false,
  setUser: (user) => set({ user }),
  refreshUsers: async () => {
    try {
      set({ loading: true });
      const updatedAllUsers = await getAllUsersAction();
      set({
        allUsers: Array.isArray(updatedAllUsers) ? updatedAllUsers : [],
      });
      set({ loading: false });
    } catch (error) {
      console.error("Error refreshing users:", error);
      set({ allUsers: [] });
    }
  },
  setCurrentPage: (page) => set({ currentPage: page }),
  setSearch: (search) => set({ search }),
  setOpenModalAddUser: (value) => set({ openModalAddUser: value }),
  toggleModalAddUser: () =>
    set((state) => ({ openModalAddUser: !state.openModalAddUser })),
}));
