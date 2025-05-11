export default function SelectProdiUser() {
  return (
    <select
      id="studyProgramOrPosition"
      name="studyProgramOrPosition"
      className="p-3 rounded-lg border border-gray-200 w-full outline-none focus:border-2 focus:border-secondary/70"
    >
      <option value="Akuntansi">Akuntansi</option>
      <option value="Perpajakan">Perpajakan</option>
      <option value="Manajemen_Informatika">Manajemen Informatika</option>
      <option value="Manajemen_Bisnis_Digital">Manajemen Bisnis Digital</option>
      <option value="Dosen">Dosen</option>
      <option value="Akademik">Akademik</option>
      <option value="Staff">Staff</option>
    </select>
  );
}
