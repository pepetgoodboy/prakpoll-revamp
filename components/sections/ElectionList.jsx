"use client";

import { useEffect } from "react";
import { useElectionStore } from "@/store/electionStore";
import Spinner from "../ui/Spinner/Spinner";
import CardElectionAdmin from "../ui/Card/CardElectionAdmin";

export default function ElectionList({ initialElections }) {
  const { loading, elections } = useElectionStore();

  useEffect(() => {
    if (initialElections) {
      useElectionStore.setState({ loading: true });
      useElectionStore.setState({
        elections: Array.isArray(initialElections) ? initialElections : [],
      });
      useElectionStore.setState({ loading: false });
    }
  }, [initialElections]);

  return (
    <>
      <>
        {loading ? (
          <div className="flex justify-center items-center h-screen w-full">
            <Spinner variant="secondary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {elections.length > 0 ? (
              elections.map((election) => (
                <CardElectionAdmin key={election.id} election={election} />
              ))
            ) : (
              <p className="font-medium text-gray-900 lg:text-lg">
                Tidak ada pemilihan tersedia.
              </p>
            )}
          </div>
        )}
      </>
    </>
  );
}
