import Link from "next/link";
import React from "react";
import { FaChartColumn } from "react-icons/fa6";
import { LuUserRoundCog } from "react-icons/lu";
import { MdOutlineHowToVote, MdOutlineSpaceDashboard } from "react-icons/md";
import { PiUsersFourLight } from "react-icons/pi";
import FormLogout from "@/components/ui/Form/FormLogout";

export default function SidebarLink({ user, pathname, onClick = () => {} }) {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href={user.role === "Admin" ? "/dashboard/admin" : "/dashboard/user"}
        onClick={onClick}
        className={
          `flex gap-4 items-center px-6 py-3 rounded-xl hover:bg-secondary hover:text-white transition-all duration-200 ease-in` +
          (pathname === "/dashboard/admin" || pathname === "/dashboard/user"
            ? " bg-secondary text-white"
            : "bg-white text-gray-500")
        }
      >
        <MdOutlineSpaceDashboard className="w-7 h-7" />
        <span className="text-lg">Dashboard</span>
      </Link>
      {user.role === "Admin" && (
        <Link
          href="/dashboard/admin/users"
          onClick={onClick}
          className={
            `flex gap-4 items-center px-6 py-3 rounded-xl hover:bg-secondary hover:text-white transition-all duration-200 ease-in` +
            (pathname === "/dashboard/admin/users"
              ? " bg-secondary text-white"
              : "bg-white text-gray-500")
          }
        >
          <PiUsersFourLight className="w-7 h-7" />
          <span className="text-lg">Users</span>
        </Link>
      )}
      <Link
        href={
          user.role === "Admin"
            ? "/dashboard/admin/pemilihan"
            : "/dashboard/user/pemilihan"
        }
        onClick={onClick}
        className={
          `flex gap-4 items-center px-6 py-3 rounded-xl hover:bg-secondary hover:text-white transition-all duration-200 ease-in` +
          (pathname === "/dashboard/admin/pemilihan" ||
          pathname === "/dashboard/user/pemilihan"
            ? " bg-secondary text-white"
            : "bg-white text-gray-500")
        }
      >
        <MdOutlineHowToVote className="w-7 h-7" />
        <span className="text-lg">Pemilihan</span>
      </Link>
      {user.role === "User" && (
        <>
          <Link
            href="/dashboard/user/hasil"
            onClick={onClick}
            className={
              `flex gap-4 items-center px-6 py-3 rounded-xl hover:bg-secondary hover:text-white transition-all duration-200 ease-in ` +
              (pathname === "/dashboard/user/hasil"
                ? "bg-secondary text-white"
                : "bg-white text-gray-500")
            }
          >
            <FaChartColumn className="w-7 h-7" />
            <span className="text-lg">Hasil</span>
          </Link>

          <Link
            href="/dashboard/user/profil"
            onClick={onClick}
            className={
              `flex gap-4 items-center px-6 py-3 rounded-xl hover:bg-secondary hover:text-white transition-all duration-200 ease-in ` +
              (pathname === "/dashboard/user/profil"
                ? "bg-secondary text-white"
                : "bg-white text-gray-500")
            }
          >
            <LuUserRoundCog className="w-7 h-7" />
            <span className="text-lg">Profil</span>
          </Link>
        </>
      )}
      <FormLogout />
    </div>
  );
}
