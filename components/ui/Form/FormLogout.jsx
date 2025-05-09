import { logoutAction } from "@/app/actions";
import { FiLogOut } from "react-icons/fi";

export default function FormLogout() {
  return (
    <form action={logoutAction}>
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
