export default function Spinner({ variant = "white" }) {
  return (
    <div
      className={`w-5 h-5 border-2 border-t-transparent border-${variant} rounded-full animate-spin`}
    ></div>
  );
}
