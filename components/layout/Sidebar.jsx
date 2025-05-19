"use client";

import NavbarLogo from "../ui/Logo/NavbarLogo";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { RiMenu3Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import SidebarLink from "../ui/Link/SidebarLink";

export default function Sidebar() {
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="w-1/4 h-screen bg-white hidden lg:block sticky top-0">
        <div className="p-8">
          <div className="flex flex-col gap-8">
            <NavbarLogo />
            <SidebarLink user={user} pathname={pathname} />
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <header className="sticky top-0 z-40 bg-white ring-1 ring-gray-300 shadow-sm lg:hidden">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex justify-between h-16">
            <div className="flex gap-8 px-2 lg:px-0">
              <NavbarLogo />
            </div>
            <div
              className="flex items-center lg:hidden"
              data-testid="open-menu"
            >
              <RiMenu3Line
                className="text-2xl text-gray-400 font-medium cursor-pointer"
                onClick={toggleMenu}
              />
            </div>
          </div>
          <div
            className={`absolute top-2 inset-x-0 p-2 lg:hidden transition-all duration-300 ease-in-out ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="rounded-lg shadow-lg bg-white p-4 border border-gray-300">
              <div className="flex flex-col gap-8">
                <div className="flex justify-between items-center">
                  <NavbarLogo />
                  <div className="flex items-center">
                    <IoMdClose
                      className="text-2xl text-gray-400 font-medium cursor-pointer"
                      onClick={toggleMenu}
                    />
                  </div>
                </div>
                <SidebarLink
                  user={user}
                  pathname={pathname}
                  onClick={toggleMenu}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
