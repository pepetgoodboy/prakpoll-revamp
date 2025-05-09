"use client";

import { useState, useEffect, useActionState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import ModalAddUser from "../Modal/ModalAddUser";
import { deleteUserAction } from "@/app/actions";
import { toast } from "react-toastify";

const initialState = {
  message: "",
};

export default function TableUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [openModalAddUser, setOpenModalAddUser] = useState(false);
  const toggleModalAddUser = () => setOpenModalAddUser(!openModalAddUser);
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const result = await response.json();
      setAllUsers(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = allUsers.filter((user) =>
    user.fullname.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const [state, formAction] = useActionState(deleteUserAction, initialState);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message, {
        theme: "light",
        autoClose: 1000,
      });
      fetchUsers();
    }

    if (!state.success && state.message) {
      toast.error(state.message, {
        theme: "light",
        autoClose: 1000,
      });
    }
  }, [state]);

  return (
    <div className="flex flex-col gap-6">
      <button
        onClick={toggleModalAddUser}
        className="flex gap-4 items-center px-6 py-2 rounded-xl bg-secondary hover:bg-secondary/90 transition-all duration-200 ease-in text-white w-fit cursor-pointer"
      >
        <span className="text-lg">Tambah User</span>
      </button>

      {/* Modal Add User */}
      {openModalAddUser && (
        <ModalAddUser
          toggleModalAddUser={toggleModalAddUser}
          fetchUsers={fetchUsers}
        />
      )}

      <input
        type="text"
        placeholder="Cari user berdasarkan nama..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="p-3 rounded-lg border border-gray-200 w-full outline-none focus:border-2 focus:border-secondary/70"
      />

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-indigo-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-indigo-800">
                NPM
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-indigo-800">
                Nama Lengkap
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-indigo-800">
                Program Studi / Jabatan
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-indigo-800">
                UKM
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-indigo-800">
                Kode Verifikasi
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-indigo-800">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {currentUsers.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                  {user.npm}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 font-medium whitespace-nowrap">
                  {user.fullname}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                  {user.studyProgramOrPosition}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                  {user.ukm === "Tidak_Ada" ? "-" : user.ukm}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                  {user.verifCode}
                </td>
                <td className="px-4 py-3 text-sm text-center">
                  <form id="deleteUser" name="deleteUser" action={formAction}>
                    <input type="hidden" name="id" value={user.id} />
                    <button
                      type="submit"
                      className="inline-flex cursor-pointer items-center justify-center h-8 w-8 rounded-md text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                      aria-label="Hapus"
                    >
                      <FaRegTrashCan className="h-4 w-4" />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          Halaman {currentPage} dari {totalPages}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-white bg-secondary hover:bg-secondary/90 cursor-pointer rounded-lg disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-white bg-secondary hover:bg-secondary/90 cursor-pointer rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
