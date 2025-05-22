"use client";

import { FiUserPlus, FiCheckCircle } from "react-icons/fi";
import { LuLogIn } from "react-icons/lu";
import { MdOutlineRemoveRedEye, MdOutlineHowToVote } from "react-icons/md";
import { FaRegChartBar } from "react-icons/fa";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Aos from "aos";

const steps = [
  {
    icon: <FiUserPlus className="w-6 h-6 text-white" />,
    title: "Daftar Akun",
    description:
      "Mahasiswa wajib mendaftar menggunakan NPM aktif yang sudah terdaftar di sistem kampus.",
  },
  {
    icon: <LuLogIn className="w-6 h-6 text-white" />,
    title: "Login ke Aplikasi",
    description:
      "Gunakan NPM dan password untuk masuk ke dashboard pemilihan PrakPoll.",
  },
  {
    icon: <FiCheckCircle className="w-6 h-6 text-white" />,
    title: "Pilih Pemilihan",
    description: "Pilih event pemilihan yang sedang berlangsung.",
  },
  {
    icon: <MdOutlineRemoveRedEye className="w-6 h-6 text-white" />,
    title: "Lihat Kandidat",
    description: "Baca profil, visi & misi dari setiap kandidat.",
  },
  {
    icon: <MdOutlineHowToVote className="w-6 h-6 text-white" />,
    title: "Lakukan Voting",
    description: 'Klik tombol "Pilih Sekarang" untuk memberikan suara.',
  },
  {
    icon: <FaRegChartBar className="w-6 h-6 text-white" />,
    title: "Lihat Hasil",
    description: "Lihat hasil suara secara real-time dan transparan.",
  },
];

export default function GuideSection() {
  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 800,
    });
  });

  return (
    <section
      id="cara-penggunaan"
      className="pt-12 sm:pt-20 lg:pt-28 bg-white px-4 sm:px-0"
      data-aos="fade-up"
    >
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Cara Menggunakan PrakPoll
          </h2>
          <p className="mt-4 text-gray-700 text-lg">
            Ikuti langkah-langkah berikut untuk melakukan pemilihan secara
            online dan aman.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className="relative flex items-center">
                {index % 2 === 0 ? (
                  <div className="w-5/12 pr-4 text-right">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm md:text-base text-gray-600">
                      {step.description}
                    </p>
                  </div>
                ) : (
                  <div className="w-5/12"></div>
                )}

                <div className="w-2/12 flex justify-center">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center ring-8 ring-white shadow-md">
                    {step.icon}
                  </div>
                </div>

                {index % 2 === 1 ? (
                  <div className="w-5/12 pl-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm md:text-base text-gray-600">
                      {step.description}
                    </p>
                  </div>
                ) : (
                  <div className="w-5/12"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
