import { useUserStore } from "@/store/userStore";
import Spinner from "../Spinner/Spinner";
import TableRowUsers from "./TableRowUsers";

export default function TableBodyUsers({ currentUsers, formAction }) {
  const { loading } = useUserStore();
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {loading ? (
        <tr>
          <td colSpan={6} className="px-4 py-3">
            <div className="flex items-center justify-center">
              <Spinner variant="secondary" />
            </div>
          </td>
        </tr>
      ) : currentUsers.length > 0 ? (
        currentUsers.map((user, index) => (
          <TableRowUsers key={index} user={user} formAction={formAction} />
        ))
      ) : (
        <tr>
          <td
            colSpan={6}
            className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap text-center"
          >
            Tidak ada data
          </td>
        </tr>
      )}
    </tbody>
  );
}
