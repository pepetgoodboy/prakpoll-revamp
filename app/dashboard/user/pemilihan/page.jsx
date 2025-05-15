import { getAllElectionsUserAction } from "@/app/actions";
import ElectionListUser from "@/components/sections/ElectionListUser";

async function fetchInitialElections() {
  try {
    const elections = await getAllElectionsUserAction();
    return Array.isArray(elections) ? elections : [];
  } catch (error) {
    console.error("Error fetching initial elections:", error);
    return [];
  }
}

export default async function DashboardUserPemilihan() {
  const initialElections = await fetchInitialElections();

  return (
    <div className="px-6 lg:px-8 lg:py-8 w-full">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900">
          Pemilihan
        </h1>
        <ElectionListUser initialElections={initialElections} />
      </div>
    </div>
  );
}
