"use client";

import { logoutAction } from "@/app/actions";
import { FiLogOut } from "react-icons/fi";
import { useElectionStore } from "@/store/electionStore";
// import { useUserStore } from "@/store/userStore";

export default function FormLogout() {
  const { cleanupPusher } = useElectionStore();
  // const setUser = useUserStore((state) => state.setUser);

  const handleSubmit = async () => {
    cleanupPusher();
    // setUser(null);
    await logoutAction();
  };

  return (
    <form action={handleSubmit}>
      <button
        type="submit"
        className="flex gap-4 items-center px-6 py-3 rounded-xl hover:bg-secondary hover:text-white transition-all duration-200 ease-in text-gray-500 w-full cursor-pointer"
      >
        <FiLogOut className="w-7 h-7" />
        <span className="text-lg">Logout</span>
      </button>
    </form>
  );
}
