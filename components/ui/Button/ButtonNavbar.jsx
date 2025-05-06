import Link from "next/link";

export default function ButtonNavbar({ variant }) {
  return (
    <>
      <Link href="/login">
        <button
          className={`px-6 ${variant} rounded-[10px] border border-secondary cursor-pointer text-secondary font-medium hover:font-semibold`}
        >
          Masuk
        </button>
      </Link>
      <Link href="/register">
        <button
          className={`px-6 ${variant} rounded-[10px] bg-secondary hover:bg-secondary/90 border border-secondary cursor-pointer text-white font-medium`}
        >
          Daftar
        </button>
      </Link>
    </>
  );
}
