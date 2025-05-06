"use client";

import { useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import NavbarLogo from "@/components/ui/Logo/NavbarLogo";
import ButtonNavbar from "@/components/ui/Button/ButtonNavbar";
import NavLinkMobile from "@/components/ui/Link/NavLinkMobile";
import NavLinkDesktop from "@/components/ui/Link/NavLinkDesktop";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-40 bg-white ring-1 ring-gray-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex gap-8 px-2 lg:px-0">
            <NavbarLogo />
            <NavLinkDesktop />
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <ButtonNavbar variant="py-1.5" />
          </div>
          <div className="flex items-center lg:hidden">
            <RiMenu3Line
              className="text-2xl text-gray-400 font-medium cursor-pointer"
              onClick={toggleMenu}
            />
          </div>
        </div>

        {/* Mobile menu */}
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
              <NavLinkMobile />
              <div className="flex flex-col gap-2">
                <ButtonNavbar variant="py-2 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
