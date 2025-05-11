import TableUsers from "@/components/ui/Table/TableUsers";
import { getAllUsersAction } from "@/app/actions";

async function fetchInitialUsers() {
  try {
    const users = await getAllUsersAction();
    return Array.isArray(users) ? users : [];
  } catch (error) {
    console.error("Error fetching initial users:", error);
    return [];
  }
}

export default async function DashboardAdminUsers() {
  const initialUsers = await fetchInitialUsers();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 w-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Users
          </h1>
        </div>
        <TableUsers initialUsers={initialUsers} />
      </div>
    </div>
  );
}
