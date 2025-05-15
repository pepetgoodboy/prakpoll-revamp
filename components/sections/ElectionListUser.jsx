import CardElectionUser from "../ui/Card/CardElectionUser";

export default function ElectionListUser({ initialElections: elections }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {elections.length > 0 ? (
        elections.map((election) => (
          <CardElectionUser key={election.id} election={election} />
        ))
      ) : (
        <p className="font-medium text-gray-900 lg:text-lg">
          Tidak ada pemilihan tersedia.
        </p>
      )}
    </div>
  );
}
