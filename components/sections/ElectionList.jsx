"use client";

import { useEffect } from "react";
import { useElectionStore } from "@/store/electionStore";
import { useActionState } from "react";
import { deleteElectionAction } from "@/app/actions";
import { toast } from "react-toastify";
import Spinner from "../ui/Spinner/Spinner";
import CardElectionAdmin from "../ui/Card/CardElectionAdmin";

const initialState = {
  message: "",
};

export default function ElectionList({ initialElections }) {
  const { loading, elections, refreshElections } = useElectionStore();
  const [state, formAction] = useActionState(
    deleteElectionAction,
    initialState
  );

  useEffect(() => {
    if (initialElections) {
      useElectionStore.setState({ loading: true });
      useElectionStore.setState({
        elections: Array.isArray(initialElections) ? initialElections : [],
      });
      useElectionStore.setState({ loading: false });
    }
  }, [initialElections]);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message, {
        theme: "light",
        autoClose: 1000,
      });
      refreshElections();
    }

    if (!state.success && state.message) {
      toast.error(state.message, {
        theme: "light",
        autoClose: 1000,
      });
    }
  }, [state]);

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
                <CardElectionAdmin
                  key={election.id}
                  election={election}
                  formAction={formAction}
                />
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
