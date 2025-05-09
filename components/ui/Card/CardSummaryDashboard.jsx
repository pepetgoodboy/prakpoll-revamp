"use client";

import { MdOutlineHowToVote } from "react-icons/md";
import { GiVote } from "react-icons/gi";
import { LuUsersRound } from "react-icons/lu";
import { PiUsersFourLight } from "react-icons/pi";
import { userStore } from "@/store/userStore";

export default function CardSummaryDashboard({
  totalElectionsActive,
  totalVotes,
  totalCandidates,
  totalElectionsFinished = 0,
  totalUsers = 0,
}) {
  const user = userStore((state) => state.user);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      <div className="flex flex-col gap-4 p-6 bg-indigo-100 rounded-[20px]">
        <GiVote className="text-5xl text-white p-2 bg-secondary rounded-full" />
        <span className="text-4xl font-semibold">{totalElectionsActive}</span>
        <span className="text-lg text-gray-900">Total Pemilihan Aktif</span>
      </div>
      <div className="flex flex-col gap-4 p-6 bg-indigo-100 rounded-[20px]">
        <MdOutlineHowToVote className="text-5xl text-white p-2 bg-secondary rounded-full" />
        <span className="text-4xl font-semibold">{totalVotes}</span>
        <span className="text-lg text-gray-900">Total Suara Masuk</span>
      </div>
      <div className="flex flex-col gap-4 p-6 bg-indigo-100 rounded-[20px]">
        <LuUsersRound className="text-5xl text-white p-2 bg-secondary rounded-full" />
        <span className="text-4xl font-semibold">{totalCandidates}</span>
        <span className="text-lg text-gray-900">Total Kandidat</span>
      </div>
      {user.role === "Admin" && (
        <>
          <div className="flex flex-col gap-4 p-6 bg-indigo-100 rounded-[20px]">
            <GiVote className="text-5xl text-white p-2 bg-secondary rounded-full" />
            <span className="text-4xl font-semibold">
              {totalElectionsFinished}
            </span>
            <span className="text-lg text-gray-900">
              Total Pemilihan Selesai
            </span>
          </div>
          <div className="flex flex-col gap-4 p-6 bg-indigo-100 rounded-[20px]">
            <PiUsersFourLight className="text-5xl text-white p-2 bg-secondary rounded-full" />
            <span className="text-4xl font-semibold">{totalUsers}</span>
            <span className="text-lg text-gray-900">Total User</span>
          </div>
        </>
      )}
    </div>
  );
}
