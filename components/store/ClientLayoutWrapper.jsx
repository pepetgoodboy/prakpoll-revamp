"use client";

import { useUserStore } from "@/store/userStore";

export default function ClientLayoutWrapper({ children }) {
  const user = useUserStore((state) => state.user);

  console.log(user);

  if (!user) return null;

  return <>{children}</>;
}
