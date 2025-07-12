'use client';

import { useUserStore } from '@/store/userStore';
import { useEffect, useState } from 'react';

export default function SelectUkm({ defaultValue }) {
  const ukm = useUserStore((state) => state.ukm);
  const [value, setValue] = useState(defaultValue);

  return (
    <select
      id="ukm"
      name="ukm"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full max-w-xs xl:max-w-md py-2 px-4 text-gray-900 bg-white rounded-lg border border-gray-300 outline-none focus:border-2 focus:border-secondary"
    >
      {ukm.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
}
