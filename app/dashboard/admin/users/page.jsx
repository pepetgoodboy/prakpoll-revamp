import TableUsers from "@/components/ui/Table/TableUsers";

export default function DashboardAdminUsers() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 w-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Users
          </h1>
        </div>
        <TableUsers />
      </div>
    </div>
  );
}
