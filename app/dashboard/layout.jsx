import Sidebar from "@/components/layout/Sidebar";
import { requireAuth } from "@/lib/auth";
import SetUserClient from "@/components/store/SetUserClient";
import ClientLayoutWrapper from "@/components/store/ClientLayoutWrapper";

export default async function DashboardLayout({ children }) {
  const user = await requireAuth();
  return (
    <>
      <SetUserClient user={user} />
      <ClientLayoutWrapper>
        <div className="flex flex-col lg:flex-row gap-4">
          <Sidebar />
          {children}
        </div>
      </ClientLayoutWrapper>
    </>
  );
}
