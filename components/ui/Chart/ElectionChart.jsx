"use client";

import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useState, useEffect } from "react";
import { useElectionStore } from "@/store/electionStore";
import CardSummaryElection from "../Card/CardSummaryElection";

export default function ElectionChart({
  id,
  resultElection,
  data: initialData,
  options,
  eligibilityMap,
}) {
  const [chartData, setChartData] = useState(initialData);
  const [resultElectionData, setResultElectionData] = useState(resultElection);
  const electionId = id;

  const { initializePusher, subscribeToElection, unsubscribeFromElection } =
    useElectionStore();

  useEffect(() => {
    initializePusher();

    subscribeToElection(electionId, (newData) => {
      setChartData(newData.chart);
      setResultElectionData(newData.resultUpdatedElection);
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
        resultElectionData={resultElectionData}
        eligibilityMap={eligibilityMap}
      />
    </div>
  );
}
