"use client";

import { useUserStore } from "@/store/userStore";
import Image from "next/image";

export default function CardHeroDashboard() {
  const user = useUserStore((state) => state.user);
  return (
    <div className="relative">
      <Image
        src="/bg-voting.webp"
        alt="Election Voting"
        width={4200}
        height={2800}
        className="min-w-full h-auto max-h-[327px] rounded-[20px] object-cover object-center"
        priority
      />
      <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-purple-800 to-indigo-700 mix-blend-multiply"></div>
      <div className="absolute inset-0 rounded-[20px] bg-black/30"></div>
      <div className="absolute top-1/2 -translate-y-1/2 w-full">
        <div className="flex flex-col gap-2 sm:gap-4 lg:gap-8 justify-center px-6 sm:px-12 xl:px-16">
          <div className="flex flex-col">
            <h1 className="text-white text-start text-3xl sm:text-4xl font-bold tracking-tight lg:text-6xl">
              Selamat datang
            </h1>
            <h1 className="text-secondary text-start text-3xl sm:text-4xl font-bold tracking-tight lg:text-6xl">
              {user.fullname}
            </h1>
          </div>
          <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg max-w-sm md:max-w-xl text-start">
            Silahkan gunakan hak suara anda untuk membentuk masa depan kampus
            yang lebih baik.
          </p>
        </div>
      </div>
    </div>
  );
}
