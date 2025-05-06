import Link from "next/link";

export default function NavLinkDesktop() {
  return (
    <div className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">
      <Link
        href="#"
        className="hover:border-b-2 hover:border-gray-300 inline-flex items-center min-h-full"
      >
        Beranda
      </Link>
      <Link
        href="#"
        className="hover:border-b-2 hover:border-gray-300 inline-flex items-center min-h-full"
      >
        Fitur
      </Link>
      <Link
        href="#"
        className="hover:border-b-2 hover:border-gray-300 inline-flex items-center min-h-full"
      >
        Cara Penggunaan
      </Link>
      <Link
        href="#"
        className="hover:border-b-2 hover:border-gray-300 inline-flex items-center min-h-full"
      >
        Testimoni
      </Link>
    </div>
  );
}
