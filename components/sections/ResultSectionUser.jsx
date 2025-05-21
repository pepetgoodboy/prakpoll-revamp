"use client";

import { useUserStore } from "@/store/userStore";
import ElectionChart from "../ui/Chart/ElectionChart";
import ButtonHero from "../ui/Button/ButtonHero";

export default function ResultSectionUser({
  id,
  resultElection,
  data,
  options,
  eligibilityMap,
}) {
  const user = useUserStore((state) => state.user);

  if (
    resultElection.eligibility === "All" ||
    user.ukm === resultElection.eligibility ||
    user.studyProgramOrPosition === resultElection.eligibility
  ) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-gray-900">
          Pemilihan <span className="font-semibold">/ Hasil</span>
        </h1>
        <ElectionChart
          id={id}
          resultElection={resultElection}
          data={data}
          options={options}
          eligibilityMap={eligibilityMap}
        />
      </div>
    );
  }

  return (
    <div className="px-6 lg:px-8 lg:py-8 w-full">
      <div className="flex flex-col gap-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-gray-900">
          Pemilihan <span className="font-semibold">/ Hasil</span>
        </h1>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-medium">
            Anda tidak berhak melihat hasil pemilihan ini.
          </h2>
          <ButtonHero
            className="w-fit mx-auto"
            variant="secondary"
            textColor="white"
            href="/dashboard/user/pemilihan"
            text="Lihat Pemilihan"
          />
        </div>
      </div>
    </div>
  );
}
