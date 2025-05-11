export default function SelectTypeElection() {
  return (
    <select
      id="type"
      name="type"
      className="p-3 rounded-lg border border-gray-200 w-full outline-none focus:border-2 focus:border-secondary/70"
    >
      <option value="BEM">BEM</option>
      <option value="Himpunan">Himpunan</option>
      <option value="UKM">UKM</option>
    </select>
  );
}
