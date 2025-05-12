import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "PrakPoll | Not Found",
  description: "Halaman tidak ditemukan",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Image
        src="/notfound.png"
        alt="404"
        width={500}
        height={500}
        className="w-full max-w-[500px] h-auto mx-auto"
      />
      <Link
        href="/"
        className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
