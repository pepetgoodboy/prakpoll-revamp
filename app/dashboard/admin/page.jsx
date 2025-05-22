import CardHeroDashboard from "@/components/ui/Card/CardHeroDashboard";
import CardSummaryDashboard from "@/components/ui/Card/CardSummaryDashboard";
import { prisma } from "@/lib/prisma";

export default async function DashboardAdmin() {
  const time = new Date();

  const [
    totalElectionsActive,
    totalVotes,
    totalCandidates,
    totalElectionsFinished,
    totalUsers,
  ] = await Promise.all([
    prisma.elections.count({
      where: {
        startDate: { lte: time },
        endDate: { gte: time },
      },
    }),
    prisma.votes.count(),
    prisma.candidates.count(),
    prisma.elections.count({
      where: {
        endDate: { lte: time },
      },
    }),
    prisma.users.count({
      where: {
        role: "User",
      },
    }),
  ]);

  return (
    <div className="px-6 lg:px-8 lg:py-8 w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900">
          Dashboard
        </h1>
        <CardHeroDashboard />
        <CardSummaryDashboard
          totalCandidates={totalCandidates}
          totalElectionsActive={totalElectionsActive}
          totalElectionsFinished={totalElectionsFinished}
          totalUsers={totalUsers}
          totalVotes={totalVotes}
        />
      </div>
    </div>
  );
}
