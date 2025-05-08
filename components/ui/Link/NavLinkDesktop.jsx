import Link from "next/link";

export default function NavLinkDesktop() {
  return (
    <div className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">
      <Link
        href="#beranda"
        className="hover:border-b-2 hover:border-gray-300 inline-flex items-center min-h-full"
      >
        Beranda
      </Link>
      <Link
        href="#pemilihan"
        className="hover:border-b-2 hover:border-gray-300 inline-flex items-center min-h-full"
      >
        Pemilihan
      </Link>
      <Link
        href="#fitur"
        className="hover:border-b-2 hover:border-gray-300 inline-flex items-center min-h-full"
      >
        Fitur
      </Link>
      <Link
        href="#cara-penggunaan"
        className="hover:border-b-2 hover:border-gray-300 inline-flex items-center min-h-full"
      >
        Cara Penggunaan
      </Link>
      <Link
        href="#testimoni"
        className="hover:border-b-2 hover:border-gray-300 inline-flex items-center min-h-full"
      >
        Testimoni
      </Link>
    </div>
  );
}
