import { getElectionResultAdmin } from "@/app/actions";
import ElectionChart from "@/components/ui/Chart/ElectionChart";
import CardSummaryElection from "@/components/ui/Card/CardSummaryElection";
import { notFound } from "next/navigation";

export default async function DashboardAdminResult({ params }) {
  const { id } = await params;
  const resultElection = await getElectionResultAdmin(id);

  if (
    !resultElection ||
    !resultElection.candidates ||
    resultElection.candidates.length === 0
  ) {
    notFound();
  }

  const eligibilityMap = {
    Manajemen_Informatika: "Manajemen Informatika",
    Manajemen_Bisnis_Digital: "Manajemen Bisnis Digital",
  };

  const data = {
    labels: resultElection.candidates.map((candidate) => candidate.name),
    datasets: [
      {
        label: "Suara",
        data: resultElection.candidates.map((candidate) => candidate.voteCount),
        backgroundColor: "rgba(78, 71, 228, 0.6)",
        borderColor: "rgba(78, 71, 228, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 20,
          padding: 20,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="px-6 lg:px-8 lg:py-8 w-full">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900">
          Hasil Pemilihan
        </h1>
        <ElectionChart
          id={id}
          resultElection={resultElection}
          data={data}
          options={options}
          eligibilityMap={eligibilityMap}
        />
      </div>
    </div>
  );
}
