"use client";

import { useState } from "react";

export default function SelectUkm({ defaultValue }) {
  const [value, setValue] = useState(defaultValue || "Tidak_Ada");

  return (
    <select
      id="ukm"
      name="ukm"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full max-w-xs xl:max-w-md py-2 px-4 text-gray-900 bg-white rounded-lg border border-gray-300 outline-none focus:border-2 focus:border-secondary"
    >
      <option value="Tidak_Ada">Tidak Ada</option>
      <option value="Bamboo">Bamboo</option>
      <option value="IMSI">IMSI</option>
      <option value="Futsal">Futsal</option>
      <option value="Badminton">Badminton</option>
    </select>
  );
}
