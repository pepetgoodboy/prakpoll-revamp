import { getElectionsHomeAction } from "@/app/actions";
import ElectionSection from "./ElectionSection";

async function fetchInitialElections() {
  try {
    const elections = await getElectionsHomeAction();
    return Array.isArray(elections) ? elections : [];
  } catch (error) {
    console.error("Error fetching initial elections:", error);
    return [];
  }
}

export default async function ElectionSectionWrapper() {
  const elections = await fetchInitialElections();

  return <ElectionSection elections={elections} />;
}
