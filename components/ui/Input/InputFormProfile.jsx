export default function InputFormProfile({ id, name, type, defaultValue }) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      className="w-full max-w-xs xl:max-w-md py-2 px-4 text-gray-900 bg-white rounded-lg border border-gray-300 outline-none focus:border-2 focus:border-secondary"
      defaultValue={defaultValue}
    />
  );
}
