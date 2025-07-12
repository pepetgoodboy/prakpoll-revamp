import { FaRegTrashCan } from 'react-icons/fa6';
import { deleteUserAction } from '@/app/actions';
import { toast } from 'react-toastify';
import { useActionState, useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import Spinner from '../Spinner/Spinner';

const initialState = {
  message: '',
};

export default function TableRowUsers({ user }) {
  const { refreshUsers } = useUserStore();

  const deleteUserActionWithId = deleteUserAction.bind(null, null, user.id);

  const [state, formAction, pending] = useActionState(
    deleteUserActionWithId,
    initialState
  );

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message, {
        theme: 'light',
        autoClose: 1000,
      });
      refreshUsers();
    }

    if (!state.success && state.message) {
      toast.error(state.message, {
        theme: 'light',
        autoClose: 1000,
      });
    }
  }, [state]);

  return (
    <tr className="hover:bg-gray-50">
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
        {user.ukm}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
        {user.verifCode}
      </td>
      <td className="px-4 py-3 text-sm text-center">
        <form id="deleteUser" name="deleteUser" action={formAction}>
          <button
            type="submit"
            data-testid={`delete-user-${user.id}`}
            className="inline-flex cursor-pointer items-center justify-center h-8 w-8 rounded-md text-red-600 hover:bg-red-50"
            aria-label="Hapus"
          >
            {pending ? (
              <Spinner variant="red-600" />
            ) : (
              <FaRegTrashCan className="w-5 h-5" />
            )}
          </button>
        </form>
      </td>
    </tr>
  );
}
