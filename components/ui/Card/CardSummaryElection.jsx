import { HiOutlineDocumentReport } from "react-icons/hi";
import { LuBadgeInfo } from "react-icons/lu";
import { PiHandshake } from "react-icons/pi";

export default function CardSummaryElection({
  resultElection,
  getTime,
  eligibilityMap,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4">
      <div className="flex flex-col gap-4 p-6 bg-indigo-100 rounded-[20px]">
        <div className="flex gap-2 items-center">
          <LuBadgeInfo className="text-5xl text-white p-2 bg-secondary rounded-full" />
          <p className="text-xl sm:text-2xl text-gray-900 font-semibold">
            Detail Pemilihan
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-gray-900">
            Jenis Pemilihan: {resultElection.type}
          </span>
          <span className="text-gray-900">
            Program Studi:{" "}
            {eligibilityMap[resultElection.eligibility] ||
              resultElection.eligibility}
          </span>
          <span className="text-gray-900">
            Waktu Mulai: {getTime(resultElection.startDate)}
          </span>
          <span className="text-gray-900">
            Waktu Selesai: {getTime(resultElection.endDate)}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 bg-indigo-100 rounded-[20px]">
        <div className="flex gap-2 items-center">
          <PiHandshake className="text-5xl text-white p-2 bg-secondary rounded-full" />
          <p className="text-xl sm:text-2xl text-gray-900 font-semibold">
            Partisipasi Pemilihan
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-gray-900">
            Total Suara: {resultElection.totalVotes}
          </span>
          <span className="text-gray-900">
            Total Pemilih: {resultElection.totalVoters}
          </span>
          <span className="text-gray-900">
            Tingkat Partisipasi: {resultElection.participationRate}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 bg-indigo-100 rounded-[20px]">
        <div className="flex gap-2 items-center">
          <HiOutlineDocumentReport className="text-5xl text-white p-2 bg-secondary rounded-full" />
          <p className="text-xl sm:text-2xl text-gray-900 font-semibold">
            Hasil Kandidat
          </p>
        </div>
        <div className="grid grid-cols-2">
          {resultElection.candidates.map((candidate, index) => (
            <div
              key={index + 1}
              className="flex flex-col gap-1 justify-center text-center"
            >
              <span className="text-gray-900">Nama: {candidate.name}</span>
              <span className="text-gray-900">
                Suara: {candidate.voteCount}
              </span>
              <span className="text-gray-900">
                Persentase:{" "}
                {candidate.percentage === "NaN%" ? "0%" : candidate.percentage}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
