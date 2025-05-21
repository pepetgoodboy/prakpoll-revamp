"use client";

import Image from "next/image";
import { BiUser } from "react-icons/bi";
import { RxTarget } from "react-icons/rx";
import { FaTasks } from "react-icons/fa";
import { useActionState, useEffect } from "react";
import { addVoteAction } from "@/app/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Spinner from "../ui/Spinner/Spinner";

const initialState = {
  message: "",
};

export default function CandidateSection({ election }) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {election.candidates.map((candidate) => {
        const addVoteActionWithId = addVoteAction.bind(
          null,
          null,
          election.id,
          candidate.id
        );

        const [state, formAction, pending] = useActionState(
          addVoteActionWithId,
          initialState
        );

        useEffect(() => {
          if (!state) return;

          if (state.success) {
            toast.success(state.message || "Berhasil memilih kandidat", {
              theme: "light",
              autoClose: 1000,
            });

            const timer = setTimeout(() => {
              if (state.redirectTo) {
                router.push(state.redirectTo);
              }
            }, 300);

            return () => clearTimeout(timer);
          }

          if (!state.success && state.message) {
            toast.error(state.message || "Gagal memilih kandidat", {
              theme: "light",
              autoClose: 1000,
            });
          }
        }, [state, router]);

        return (
          <div
            key={candidate.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col min-h-[600px]"
          >
            <div className="bg-indigo-100 h-80">
              <Image
                src={candidate.image}
                alt={candidate.name}
                priority
                width={300}
                height={320}
                className="w-1/2 mx-auto h-full object-cover object-center"
                sizes="(max-width: 768px) 50vw, 25vw"
                quality={60}
              />
            </div>

            <div className="p-6 flex flex-col gap-3 flex-grow">
              <div className="flex gap-2 items-center">
                <BiUser className="text-xl text-indigo-500" />
                <h3 className="text-lg text-gray-800">
                  Nama Kandidat:{" "}
                  <span className="font-semibold">{candidate.name}</span>
                </h3>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <RxTarget className="text-xl text-indigo-500" />
                  <h3 className="text-lg text-gray-800">Visi Kandidat</h3>
                </div>
                <p className="text-gray-800 font-semibold italic md:min-h-[120px] xl:min-h-[100px] 2xl:min-h-[70px]">
                  "{candidate.vision}"
                </p>
              </div>

              <div className="flex flex-col gap-2 flex-grow">
                <div className="flex gap-2 items-center">
                  <FaTasks className="text-xl text-indigo-500" />
                  <h3 className="text-lg text-gray-800">Misi Kandidat</h3>
                </div>
                <ul className="text-gray-800 list-disc ml-5 space-y-2">
                  {candidate.mission.split("\n").map((mission, index) => (
                    <li key={index} className="text-sm min-h-[24px] py-1">
                      {mission}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-4">
                <form
                  id={`addVote-${candidate.id}`}
                  name="addVote"
                  action={formAction}
                >
                  {/* <input
                    type="hidden"
                    id="idElection"
                    name="idElection"
                    value={election.id}
                  />
                  <input
                    type="hidden"
                    id="idCandidate"
                    name="idCandidate"
                    value={candidate.id}
                  /> */}
                  <button
                    className="w-full flex justify-center bg-secondary hover:bg-secondary/80 disabled:bg-secondary/50 transition-all duration-300 ease-in-out cursor-pointer rounded-[12px] text-white p-[14px] text-center"
                    type="submit"
                    disabled={pending}
                  >
                    {pending ? (
                      <div className="flex items-center justify-center">
                        <Spinner />
                      </div>
                    ) : (
                      "Pilih Kandidat"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
