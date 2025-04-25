import { requireAuth } from "@/lib/auth";
import { logoutAction } from "@/app/actions";

export default async function DashboardAdmin() {
  const user = await requireAuth();

  return (
    <div>
      <h1>Dashboard Admin</h1>
      <h2>{user.id}</h2>
      <h3>{user.npm}</h3>
      <p>{user.fullname}</p>
      <p>{user.role}</p>
      <form action={logoutAction}>
        <button
          type="submit"
          className="px-6 py-2 rounded-[20px] bg-black hover:bg-black/90 cursor-pointer text-white font-medium"
        >
          Logout
        </button>
      </form>
    </div>
  );
}
