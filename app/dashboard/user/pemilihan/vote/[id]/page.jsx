import { getElectionByIdAction } from "@/app/actions";
import VoteSection from "@/components/sections/VoteSection";

export default async function VoteElectionUser({ params }) {
  const { id } = await params;
  const resultElection = await getElectionByIdAction(id);

  if (
    !resultElection ||
    !resultElection.candidates ||
    resultElection.candidates.length === 0
  ) {
    notFound();
  }

  return (
    <div className="px-6 lg:px-8 lg:py-8 w-full">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-gray-900">
          Pemilihan <span className="font-semibold">/ Vote</span>
        </h1>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-center">
          {resultElection.title}
        </h2>
        <VoteSection election={resultElection} />
      </div>
    </div>
  );
}
