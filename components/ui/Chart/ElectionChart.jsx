"use client";

import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto"; // Impor ini diperlukan untuk Chart.js

export default function ElectionChart({ resultElection, data, options }) {
  return (
    <div className="w-full border border-gray-200 rounded-lg p-6 lg:p-8">
      <h2 className="text-center text-lg font-semibold text-gray-700 mb-4">
        {resultElection.title}
      </h2>
      <div className="h-[300px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
