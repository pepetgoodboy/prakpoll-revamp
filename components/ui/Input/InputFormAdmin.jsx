export default function InputFormAdmin({
  type,
  id,
  name,
  placeholder,
  value,
  onChange = () => {},
}) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required
      autoComplete="off"
      placeholder={placeholder}
      className="p-3 rounded-lg border border-gray-200 w-full outline-none focus:border-2 focus:border-secondary/70"
    />
  );
}
