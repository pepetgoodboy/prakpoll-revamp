import {
  getAllUsersAction,
  getAllStudyOrPositionAction,
  getAllUkmAction,
} from '@/app/actions';
import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  allUsers: [],
  studyOrPosition: [],
  ukm: [],
  loading: false,
  currentPage: 1,
  usersPerPage: 10,
  search: '',
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
      console.error('Error refreshing users:', error);
      set({ allUsers: [] });
    }
  },
  refreshStudyOrPosition: async () => {
    try {
      set({ loading: true });
      const studyOrPosition = await getAllStudyOrPositionAction();
      set({
        studyOrPosition: Array.isArray(studyOrPosition) ? studyOrPosition : [],
      });
      set({ loading: false });
    } catch (error) {
      console.error('Error refreshing study or position:', error);
      set({ studyOrPosition: [] });
    }
  },
  refreshUkm: async () => {
    try {
      set({ loading: true });
      const ukm = await getAllUkmAction();
      set({
        ukm: Array.isArray(ukm) ? ukm : [],
      });
      set({ loading: false });
    } catch (error) {
      console.error('Error refreshing study or position:', error);
      set({ ukm: [] });
    }
  },
  setCurrentPage: (page) => set({ currentPage: page }),
  setSearch: (search) => set({ search }),
  setOpenModalAddUser: (value) => set({ openModalAddUser: value }),
  toggleModalAddUser: () =>
    set((state) => ({ openModalAddUser: !state.openModalAddUser })),
}));
