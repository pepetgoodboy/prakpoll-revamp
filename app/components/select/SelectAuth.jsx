export default function SelectAuth({ id, name, children }) {
  return (
    <select
      id={id}
      name={name}
      className="p-[14px] w-full rounded-lg border border-[#D4D7E3] text-sm lg:text-base 2xl:text-lg outline-none focus:border-2 focus:border-secondary/70"
    >
      {children}
    </select>
  );
}
