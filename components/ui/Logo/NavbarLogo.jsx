import Image from "next/image";

export default function NavbarLogo({ variant = "text-gray-900" }) {
  return (
    <div className="flex items-center">
      <Image
        src="/logo.png"
        alt="Logo"
        className="w-8 h-auto"
        width={32}
        height={32}
      />
      <span className={`font-bold ${variant} text-3xl`}>PrakPoll</span>
    </div>
  );
}
