import { create } from "zustand";
import { getAllElectionsAction } from "@/app/actions";
import Pusher from "pusher-js";

export const useElectionStore = create((set, get) => ({
  openElectionModal: false,
  candidates: [{ name: "", vision: "", mission: "" }],
  elections: [],
  loading: false,
  pusher: null,
  channels: {},
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

  initializePusher: () => {
    if (!get().pusher) {
      const pusherInstance = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      });
      set({ pusher: pusherInstance });
    }
  },

  subscribeToElection: (electionId, callback) => {
    const pusher = get().pusher;
    if (!pusher) return;

    let channel = get().channels[`election-${electionId}`];
    if (!channel) {
      channel = pusher.subscribe(`election-${electionId}`);
      set((state) => ({
        channels: { ...state.channels, [`election-${electionId}`]: channel },
      }));
    }

    channel.bind("update-result-admin", callback);
  },

  unsubscribeFromElection: (electionId) => {
    const channel = get().channels[`election-${electionId}`];
    if (channel) {
      channel.unbind_all();
      channel.unsubscribe();
      set((state) => {
        const newChannels = { ...state.channels };
        delete newChannels[`election-${electionId}`];
        return { channels: newChannels };
      });
    }
  },

  cleanupPusher: () => {
    const pusher = get().pusher;
    if (pusher) {
      pusher.disconnect();
      set({ pusher: null, channels: {} });
    }
  },
}));
