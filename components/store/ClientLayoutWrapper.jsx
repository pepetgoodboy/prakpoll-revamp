"use client";

import { userStore } from "@/store/userStore";

export default function ClientLayoutWrapper({ children }) {
  const user = userStore((state) => state.user);

  if (!user) return null;

  return <>{children}</>;
}
