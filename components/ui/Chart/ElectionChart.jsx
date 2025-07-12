'use client';

import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useState, useEffect } from 'react';
import { useElectionStore } from '@/store/electionStore';
import CardSummaryElection from '../Card/CardSummaryElection';
import { useUserStore } from '@/store/userStore';

export default function ElectionChart({
  id,
  resultElection,
  data: initialData,
  options,
  eligibilityMap,
}) {
  const user = useUserStore((state) => state.user);
  const [chartData, setChartData] = useState(initialData);
  const [resultElectionData, setResultElectionData] = useState(resultElection);
  const electionId = id;

  const { initializePusher, subscribeToElection, unsubscribeFromElection } =
    useElectionStore();

  useEffect(() => {
    initializePusher();

    const event =
      user.role === 'Admin' ? 'update-result-admin' : 'update-result-user';

    subscribeToElection(electionId, event, (newData) => {
      setChartData(newData.chart);
      const resultUpdatedElection =
        user.role === 'Admin'
          ? newData.resultUpdatedElectionAdmin
          : newData.resultUpdatedElectionUser;
      setResultElectionData(resultUpdatedElection);
      // console.log(newData);
    });

    return () => {
      unsubscribeFromElection(electionId);
    };
  }, [
    electionId,
    initializePusher,
    subscribeToElection,
    unsubscribeFromElection,
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full border border-gray-200 rounded-lg p-6 lg:p-8">
        <h2 className="text-center text-lg font-semibold text-gray-700 mb-4">
          {resultElectionData.title}
        </h2>
        <div className="h-[70vh]">
          <Bar data={chartData} options={options} />
        </div>
      </div>
      <CardSummaryElection
        user={user}
        resultElectionData={resultElectionData}
        eligibilityMap={eligibilityMap}
      />
    </div>
  );
}
