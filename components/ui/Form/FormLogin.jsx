"use client";

import LabelAuth from "@/components/ui/Label/LabelAuth";
import InputAuth from "@/components/ui/Input/InputAuth";
import ButtonAuth from "@/components/ui/Button/ButtonAuth";
import { loginAction } from "@/app/actions";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner/Spinner";
import { toast } from "react-toastify";

const initialState = {
  message: "",
};

export default function FormLogin() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState
  );

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Berhasil login!", {
        theme: "light",
        autoClose: 1000,
      });

      const timer = setTimeout(() => {
        if (state.redirectTo) {
          router.push(state.redirectTo);
        }
      }, 300);

      return () => clearTimeout(timer);
    }

    if (!state.success && state.message) {
      toast.error(state.message || "Login gagal!", {
        theme: "light",
        autoClose: 1000,
      });
    }
  }, [state, router]);

  return (
    <form
      id="loginForm"
      name="loginForm"
      action={formAction}
      className="flex flex-col gap-4 lg:gap-6 2xl:gap-8"
    >
      <div className="flex flex-col gap-2">
        <LabelAuth htmlFor="npm" text="NPM / ID Pemilih" />
        <InputAuth id="npm" name="npm" type="text" placeholder="0225001" />
      </div>
      <div className="flex flex-col gap-2">
        <LabelAuth htmlFor="password" text="Password" />
        <InputAuth
          id="password"
          name="password"
          type="password"
          placeholder="Minimal 8 karakter"
        />
        <p></p>
      </div>
      <ButtonAuth disabled={pending} text={pending ? <Spinner /> : "Masuk"} />
    </form>
  );
}
