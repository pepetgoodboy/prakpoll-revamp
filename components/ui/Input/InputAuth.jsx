export default function InputAuth({ type, id, name, placeholder }) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      required
      autoComplete="off"
      placeholder={placeholder}
      className="p-[14px] w-full rounded-lg border border-[#D4D7E3] text-sm lg:text-base 2xl:text-lg placeholder:text-sm lg:placeholder:text-base 2xl:placeholder:text-lg placeholder:text-[#8897AD] outline-none focus:border-2 focus:border-secondary/70"
    />
  );
}
