export default function ButtonFormAdmin({
  type = "button",
  disabled = false,
  onClick = () => {},
  text,
  className,
  variant,
  hoverVariant,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${className} px-6 py-2 rounded-xl bg-${variant} hover:bg-${hoverVariant} transition-all duration-200 ease-in text-white w-fit cursor-pointer`}
    >
      {text}
    </button>
  );
}
