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

  return <VoteSection resultElection={resultElection} />;
}
