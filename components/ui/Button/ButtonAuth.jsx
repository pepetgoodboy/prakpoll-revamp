export default function ButtonAuth({ text, disabled }) {
  return (
    <button
      disabled={disabled}
      type="submit"
      className="w-full flex justify-center bg-secondary hover:bg-secondary/80 disabled:bg-secondary/50 transition-all duration-300 ease-in-out cursor-pointer rounded-[12px] text-white p-[14px] text-center"
    >
      {text}
    </button>
  );
}
