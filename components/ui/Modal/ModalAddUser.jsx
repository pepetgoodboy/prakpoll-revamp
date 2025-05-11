"use client";

import { IoCloseCircleOutline } from "react-icons/io5";
import { addUserAction } from "@/app/actions";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "@/components/ui/Spinner/Spinner";
import { useUserStore } from "@/store/userStore";

const initialState = {
  message: "",
};

export default function ModalAddUser() {
  const { toggleModalAddUser, refreshUsers } = useUserStore();

  const [state, formAction, pending] = useActionState(
    addUserAction,
    initialState
  );

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message, {
        theme: "light",
        autoClose: 1000,
      });
      refreshUsers();
      toggleModalAddUser();
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
      <div className="w-11/12 md:w-full max-w-xl shadow-lg bg-white rounded-lg p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
          <div className="flex justify-between">
            <h4 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              Tambah User
            </h4>
            <IoCloseCircleOutline
              onClick={toggleModalAddUser}
              className="text-4xl cursor-pointer text-secondary"
            />
          </div>
          <form
            id="formAddUser"
            name="formAddUser"
            action={formAction}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="npm" className="text-gray-900 font-medium">
                NPM
              </label>
              <input
                type="number"
                id="npm"
                name="npm"
                required
                autoComplete="off"
                placeholder="Masukkan NPM"
                className="p-3 rounded-lg border border-gray-200 w-full outline-none focus:border-2 focus:border-secondary/70"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="fullname" className="text-gray-900 font-medium">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                required
                autoComplete="off"
                placeholder="Masukkan Nama Lengkap"
                className="p-3 rounded-lg border border-gray-200 w-full outline-none focus:border-2 focus:border-secondary/70"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="studyProgramOrPosition"
                className="text-gray-900 font-medium"
              >
                Program Studi / Jabatan
              </label>
              <select
                id="studyProgramOrPosition"
                name="studyProgramOrPosition"
                className="p-3 rounded-lg border border-gray-200 w-full outline-none focus:border-2 focus:border-secondary/70"
              >
                <option value="Akuntansi">Akuntansi</option>
                <option value="Perpajakan">Perpajakan</option>
                <option value="Manajemen_Informatika">
                  Manajemen Informatika
                </option>
                <option value="Manajemen_Bisnis_Digital">
                  Manajemen Bisnis Digital
                </option>
                <option value="Dosen">Dosen</option>
                <option value="Akademik">Akademik</option>
                <option value="Staff">Staff</option>
              </select>
            </div>
            <div className="flex justify-end items-end">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={toggleModalAddUser}
                  className="px-6 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition-all duration-200 ease-in text-white w-fit cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={pending}
                  className="px-6 py-2 rounded-xl bg-secondary hover:bg-secondary/90 transition-all duration-200 ease-in text-white w-fit cursor-pointer"
                >
                  {pending ? <Spinner /> : "Tambah User"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
