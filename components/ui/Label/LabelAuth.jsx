export default function LabelAuth({ htmlFor, text }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm lg:text-base 2xl:text-lg font-medium"
    >
      {text}
    </label>
  );
}
