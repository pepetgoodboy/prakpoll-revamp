"use client";

import { useEffect, useActionState, useMemo } from "react";
import { deleteUserAction } from "@/app/actions";
import { toast } from "react-toastify";
import SearchInputUsers from "../Input/SearchInputUsers";
import TableHeaderUsers from "./TableHeaderUsers";
import PaginationUsers from "../Pagination/PaginationUsers";
import TableBodyUsers from "./TableBodyUsers";
import AddUserSection from "@/components/sections/AddUserSection";
import { useUserStore } from "@/store/userStore";

const initialState = {
  message: "",
};

export default function TableUsers({ initialUsers }) {
  const {
    allUsers,
    refreshUsers,
    search,
    currentPage,
    setCurrentPage,
    usersPerPage,
  } = useUserStore();

  const filteredUsers = useMemo(() => {
    return allUsers.filter((user) =>
      user.fullname.toLowerCase().includes(search.toLowerCase())
    );
  }, [allUsers, search]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = useMemo(() => {
    return filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  }, [filteredUsers, indexOfFirstUser, indexOfLastUser]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const [state, formAction] = useActionState(deleteUserAction, initialState);

  useEffect(() => {
    if (initialState) {
      useUserStore.setState({
        loading: true,
      });
      useUserStore.setState({
        allUsers: Array.isArray(initialUsers) ? initialUsers : [],
      });
      useUserStore.setState({
        loading: false,
      });
    }
  }, [initialState]);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message, {
        theme: "light",
        autoClose: 1000,
      });
      refreshUsers();
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
      <AddUserSection />
      <SearchInputUsers />
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full divide-y divide-gray-200">
          <TableHeaderUsers />
          <TableBodyUsers currentUsers={currentUsers} formAction={formAction} />
        </table>
      </div>
      <PaginationUsers
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
}
