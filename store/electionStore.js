import { create } from "zustand";
import { getAllElectionsAction } from "@/app/actions";

export const useElectionStore = create((set, get) => ({
  openElectionModal: false,
  candidates: [{ name: "", vision: "", mission: "" }],
  elections: [],
  loading: false,
  toggleModalAddElection: () =>
    set((state) => ({ openElectionModal: !state.openElectionModal })),
  addCandidate: () =>
    set((state) => ({
      candidates: [...state.candidates, { name: "", vision: "", mission: "" }],
    })),
  removeCandidate: (index) =>
    set((state) => ({
      candidates: state.candidates.filter((_, i) => i !== index),
    })),
  updateCandidate: (index, field, value) =>
    set((state) => {
      const newCandidates = [...state.candidates];
      newCandidates[index][field] = value;
      return { candidates: newCandidates };
    }),
  handleImageChange: (index, file) =>
    set((state) => {
      const newCandidates = [...state.candidates];
      return { candidates: newCandidates };
    }),
  refreshElections: async () => {
    try {
      set({ loading: true });
      const updatedElections = await getAllElectionsAction();
      set({
        elections: Array.isArray(updatedElections) ? updatedElections : [],
      });
      set({ loading: false });
    } catch (error) {
      console.error("Error refreshing elections:", error);
      set({ elections: [] });
    }
  },
}));
