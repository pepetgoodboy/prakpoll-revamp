"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";

export default function SetUserClient({ user }) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return null;
}
