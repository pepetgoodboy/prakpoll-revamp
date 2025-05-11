"use client";

import { useElectionStore } from "@/store/electionStore";
import ModalAddElection from "../ui/Modal/ModalAddElection";

export default function AddElectionSection() {
  const { openElectionModal, toggleModalAddElection } = useElectionStore();

  return (
    <div className="flex flex-col gap-6">
      <button
        onClick={toggleModalAddElection}
        className="flex gap-4 items-center px-6 py-2 rounded-xl bg-secondary hover:bg-secondary/90 transition-all duration-200 ease-in text-white w-fit cursor-pointer"
      >
        <span className="text-lg">Tambah Pemilihan</span>
      </button>
      {openElectionModal && <ModalAddElection />}
    </div>
  );
}
