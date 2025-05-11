export default function TextAreaFormAdmin({
  id,
  name,
  placeholder,
  value,
  onChange = () => {},
}) {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      rows={4}
      required
      autoComplete="off"
      placeholder={placeholder}
      className="p-3 rounded-lg border border-gray-200 w-full outline-none focus:border-2 focus:border-secondary/70"
    ></textarea>
  );
}
