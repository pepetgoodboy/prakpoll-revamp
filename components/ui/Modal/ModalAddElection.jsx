"use client";

import { useEffect, useActionState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useElectionStore } from "@/store/electionStore";
import { createElectionAction } from "@/app/actions";
import { toast } from "react-toastify";
import FormAddElection from "../Form/FormAddElection";

const initialState = {
  message: "",
};

export default function ModalAddElection() {
  const {
    updateCandidate,
    handleImageChange,
    refreshElections,
    toggleModalAddElection,
  } = useElectionStore();

  const handleCandidateChange = (e, index) => {
    const { name, value } = e.target;
    const match = name.match(/\[(\d+)\]\[(\w+)\]/);
    if (!match) return;
    const field = match[2];
    updateCandidate(index, field, value);
  };

  const handleImageChangeLocal = (index, e) => {
    const file = e.target.files[0];
    handleImageChange(index, file);
    const input = document.querySelector(`#candidateImage${index}`);
    if (input) {
      const dataTransfer = new DataTransfer();
      if (file) dataTransfer.items.add(file);
      input.files = dataTransfer.files;
    }
  };

  const [state, formAction, pending] = useActionState(
    createElectionAction,
    initialState
  );

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message, {
        theme: "light",
        autoClose: 1000,
      });
      toggleModalAddElection();
      refreshElections();
    }

    if (!state.success && state.message) {
      toast.error(state.message, {
        theme: "light",
        autoClose: 1000,
      });
    }
  }, [state]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-11/12 md:w-full max-w-xl shadow-lg bg-white rounded-lg">
        <div className="flex flex-col">
          <div className="flex justify-between sticky top-0 p-4 sm:p-6 lg:p-8 bg-white shadow-sm rounded-t-lg">
            <h4 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              Tambah Pemilihan
            </h4>
            <IoCloseCircleOutline
              onClick={toggleModalAddElection}
              className="text-4xl cursor-pointer text-secondary"
            />
          </div>
          <FormAddElection
            handleCandidateChange={handleCandidateChange}
            handleImageChangeLocal={handleImageChangeLocal}
            pending={pending}
            formAction={formAction}
          />
        </div>
      </div>
    </div>
  );
}
