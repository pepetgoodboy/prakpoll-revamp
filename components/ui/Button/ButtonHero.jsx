import Link from "next/link";

export default function ButtonHero({
  href,
  text,
  variant,
  disabled,
  textColor,
  className = "",
  type = "button",
}) {
  const baseClass = `${className} px-4 sm:px-8 py-3 w-full rounded-[10px] bg-${variant} hover:bg-${variant}/80 text-${textColor} font-medium`;

  if (disabled) {
    return (
      <button
        type={type}
        disabled
        className={`${baseClass} cursor-not-allowed opacity-70`}
      >
        {text}
      </button>
    );
  }

  return (
    <Link href={href}>
      <button type={type} className={`${baseClass} cursor-pointer`}>
        {text}
      </button>
    </Link>
  );
}
