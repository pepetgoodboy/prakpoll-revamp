import { FaRegTrashCan } from "react-icons/fa6";

export default function TableRowUsers({ user, formAction }) {
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
  );
}
