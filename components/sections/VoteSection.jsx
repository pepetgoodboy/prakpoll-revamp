"use client";

import { useUserStore } from "@/store/userStore";
import ButtonHero from "../ui/Button/ButtonHero";
import CandidateSection from "./CandidateSection";

export default function VoteSection({ resultElection }) {
  const user = useUserStore((state) => state.user);

  const timeNow = new Date();
  const start = new Date(resultElection.startDate);
  const end = new Date(resultElection.endDate);

  if (timeNow < start || timeNow > end) {
    return (
      <div className="px-6 lg:px-8 lg:py-8 w-full">
        <div className="flex flex-col gap-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-gray-900">
            Pemilihan <span className="font-semibold">/ Vote</span>
          </h1>
          <div className="flex flex-col gap-4">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-medium">
              Pemilihan belum dimulai atau telah berakhir.
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
  if (
    resultElection.eligibility === "All" ||
    user.ukm === resultElection.eligibility ||
    user.studyProgramOrPosition === resultElection.eligibility
  ) {
    return (
      <div className="px-6 lg:px-8 lg:py-8 w-full">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-gray-900">
            Pemilihan <span className="font-semibold">/ Vote</span>
          </h1>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-center">
            {resultElection.title}
          </h2>
          <CandidateSection election={resultElection} />
        </div>
      </div>
    );
  }
  return (
    <div className="px-6 lg:px-8 lg:py-8 w-full">
      <div className="flex flex-col gap-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-gray-900">
          Pemilihan <span className="font-semibold">/ Vote</span>
        </h1>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-medium">
            Anda tidak berhak mengikuti pemilihan ini.
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
