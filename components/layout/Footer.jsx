import { FaInstagram } from "react-icons/fa6";
import { BsGlobe2 } from "react-icons/bs";
import { IoMailOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import NavbarLogo from "../ui/Logo/NavbarLogo";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-indigo-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="mb-8 md:mb-0">
            <NavbarLogo variant="text-white" />
            <p className="text-gray-300 mb-4">
              Platform e-voting modern untuk pemilihan ketua organisasi
              Politeknik Praktisi Bandung yang aman, transparan, dan mudah
              digunakan.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://praktisi.ac.id"
                target="_blank"
                className="text-gray-300 hover:text-white"
              >
                <BsGlobe2 className="w-5 h-5" />
              </Link>
              <Link
                href="http://instagram.com/praktisi.official"
                target="_blank"
                className="text-gray-300 hover:text-white"
              >
                <FaInstagram className="w-5 h-5" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Menu Utama</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#beranda"
                  className="text-gray-300 hover:text-white"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="#pemilihan"
                  className="text-gray-300 hover:text-white"
                >
                  Pemilihan
                </Link>
              </li>
              <li>
                <Link href="#fitur" className="text-gray-300 hover:text-white">
                  Fitur
                </Link>
              </li>
              <li>
                <Link
                  href="#cara-penggunaan"
                  className="text-gray-300 hover:text-white"
                >
                  Cara Penggunaan
                </Link>
              </li>
              <li>
                <Link
                  href="#testimoni"
                  className="text-gray-300 hover:text-white"
                >
                  Testimoni
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <IoMailOutline className="w-5 h-5 mr-2 mt-0.5 text-indigo-300" />
                <span className="text-gray-300">info@prakpoll.ac.id</span>
              </li>
              <li className="flex items-start">
                <LuPhone className="w-5 h-5 mr-2 mt-0.5 text-indigo-300" />
                <span className="text-gray-300">0858-6040-8156</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-indigo-800 mt-12 pt-8">
          <p className="text-center text-gray-400 text-sm">
            &copy; {currentYear} PrakPoll. Semua hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
