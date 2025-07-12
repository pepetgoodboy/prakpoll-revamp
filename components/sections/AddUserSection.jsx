import { useUserStore } from '@/store/userStore';
import ModalAddUser from '../ui/Modal/ModalAddUser';

export default function AddUserSection() {
  const { openModalAddUser, toggleModalAddUser } = useUserStore();

  return (
    <div className="flex flex-col gap-6">
      <button
        onClick={toggleModalAddUser}
        className="flex gap-4 items-center px-6 py-2 rounded-xl bg-secondary hover:bg-secondary/90 transition-all duration-200 ease-in text-white w-fit cursor-pointer"
      >
        <span className="text-lg">Tambah User</span>
      </button>
      {openModalAddUser && <ModalAddUser />}
    </div>
  );
}
