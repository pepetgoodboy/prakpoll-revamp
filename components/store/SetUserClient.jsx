"use client";

import { useEffect } from "react";
import { userStore } from "@/store/userStore";

export default function SetUserClient({ user }) {
  const setUser = userStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return null;
}
