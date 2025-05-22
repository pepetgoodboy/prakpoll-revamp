"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFoundSection() {
  const pathname = usePathname();

  const redirect = () => {
    if (pathname.startsWith("/dashboard/admin")) return "/dashboard/admin";
    if (pathname.startsWith("/dashboard/user")) return "/dashboard/user";
    return "/";
  };

  const textUrl = () => {
    return pathname.startsWith("/dashboard") ? "Dashboard" : "Beranda";
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Image
        src="/notfound.png"
        alt="404"
        width={500}
        height={500}
        priority
        sizes="100vw"
        quality={70}
        className="w-full max-w-[440px] 2xl:max-w-[500px] h-auto mx-auto"
      />
      <Link
        href={redirect()}
        className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition"
      >
        Kembali ke {textUrl()}
      </Link>
    </main>
  );
}
