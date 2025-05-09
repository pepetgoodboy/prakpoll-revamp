import CardHeroDashboard from "@/components/ui/Card/CardHeroDashboard";
import CardSummaryDashboard from "@/components/ui/Card/CardSummaryDashboard";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export default async function DashboardUser() {
  const user = await requireAuth();
  const time = new Date();
  const orConditions = [{ eligibility: "All" }];
  const excludedPosition = ["Dosen", "Akademik", "Staff"];

  if (user.ukm !== "Tidak_Ada") {
    orConditions.push({ eligibility: user.ukm });
  }

  if (!excludedPosition.includes(user.studyProgramOrPosition)) {
    orConditions.push({ eligibility: user.studyProgramOrPosition });
  }

  const totalElectionsActive = await prisma.elections.count({
    where: {
      startDate: {
        lte: time,
      },
      endDate: {
        gte: time,
      },
      OR: orConditions,
    },
  });
  const totalVotes = await prisma.votes.count();
  const totalCandidates = await prisma.candidates.count();
  return (
    <div className="px-6 lg:px-8 lg:py-8 w-full">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900">
          Dashboard
        </h1>
        <div className="flex flex-col gap-4">
          <CardHeroDashboard />
          <CardSummaryDashboard
            totalCandidates={totalCandidates}
            totalElectionsActive={totalElectionsActive}
            totalVotes={totalVotes}
          />
        </div>
      </div>
    </div>
  );
}
