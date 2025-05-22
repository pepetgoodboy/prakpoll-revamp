"use client";

import dayjs from "dayjs";
import "dayjs/locale/id";
import CardElection from "../ui/Card/CardElection";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function ElectionSection({ elections }) {
  const getTime = (date) => {
    return dayjs(date).locale("id").format("DD MMMM YYYY HH.mm");
  };

  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 800,
    });
  }, []);

  return (
    <section id="pemilihan" className="py-16 bg-gray-50" data-aos="fade-up">
      <div className="max-w-7xl px-4 lg:px-8 mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Pemilihan
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl">
                Lihat semua pemilihan yang ada di Politeknik Praktisi Bandung.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {elections.map((election) => (
              <CardElection
                key={election.id}
                electionId={election.id}
                startDate={getTime(election.startDate)}
                endDate={getTime(election.endDate)}
                candidates={election.candidates}
                title={election.title}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
