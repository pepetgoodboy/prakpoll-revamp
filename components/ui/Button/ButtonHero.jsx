import Link from "next/link";

export default function ButtonHero({ href, text, variant, textColor }) {
  return (
    <Link href={href}>
      <button
        className={`px-4 sm:px-8 py-3 w-full rounded-[10px] bg-${variant} hover:bg-${variant}/80 cursor-pointer text-${textColor} font-medium`}
      >
        {text}
      </button>
    </Link>
  );
}
