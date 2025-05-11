export default function SelectEligibilityElection() {
  return (
    <select
      id="eligibility"
      name="eligibility"
      className="p-3 rounded-lg border border-gray-200 w-full outline-none focus:border-2 focus:border-secondary/70"
    >
      <option value="All">All</option>
      <option value="Akuntansi">Akuntansi</option>
      <option value="Perpajakan">Perpajakan</option>
      <option value="Manajemen_Informatika">Manajemen Informatika</option>
      <option value="Manajemen_Bisnis_Digital">Manajemen Bisnis Digital</option>
      <option value="Bamboo">Bamboo</option>
      <option value="IMSI">IMSI</option>
      <option value="Futsal">Futsal</option>
      <option value="Badminton">Badminton</option>
    </select>
  );
}
