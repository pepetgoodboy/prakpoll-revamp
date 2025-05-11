export default function LabelFormAdmin({ htmlFor, text }) {
  return (
    <label htmlFor={htmlFor} className="text-gray-900 font-medium">
      {text}
    </label>
  );
}
