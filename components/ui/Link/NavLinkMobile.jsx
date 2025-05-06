import Link from "next/link";
import { MdOutlineReviews } from "react-icons/md";
import { TbApps, TbArrowGuide, TbHome } from "react-icons/tb";

export default function NavLinkMobile() {
  return (
    <div className="flex flex-col gap-6">
      <Link href="#" className="flex gap-2 items-center">
        <TbHome className="text-2xl text-secondary font-medium" />
        <span className="text-gray-700 text-lg font-semibold">Beranda</span>
      </Link>
      <Link href="#" className="flex gap-2 items-center">
        <TbApps className="text-2xl text-secondary font-medium" />
        <span className="text-gray-700 text-lg font-semibold">Fitur</span>
      </Link>
      <Link href="#" className="flex gap-2 items-center">
        <TbArrowGuide className="text-2xl text-secondary font-medium" />
        <span className="text-gray-700 text-lg font-semibold">
          Cara Penggunaan
        </span>
      </Link>
      <Link href="#" className="flex gap-2 items-center">
        <MdOutlineReviews className="text-2xl text-secondary font-medium" />
        <span className="text-gray-700 text-lg font-semibold">Testimoni</span>
      </Link>
    </div>
  );
}
