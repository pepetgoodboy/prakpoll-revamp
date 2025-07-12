import { useElectionStore } from '@/store/electionStore';

export default function SelectEligibilityElection() {
  const { eligibility } = useElectionStore();

  return (
    <select
      id="eligibility"
      name="eligibility"
      className="p-3 rounded-lg border border-gray-200 w-full outline-none focus:border-2 focus:border-secondary/70"
    >
      {eligibility.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
}
