"use client";

import { useUserStore } from "@/store/userStore";

export default function ClientLayoutWrapper({ children }) {
  const user = useUserStore((state) => state.user);

  if (!user) return null;

  return <>{children}</>;
}
