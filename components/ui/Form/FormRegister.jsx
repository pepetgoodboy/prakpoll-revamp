"use client";

import LabelAuth from "@/components/ui/Label/LabelAuth";
import InputAuth from "@/components/ui/Input/InputAuth";
import ButtonAuth from "@/components/ui/Button/ButtonAuth";
import { registerAction } from "@/app/actions";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner/Spinner";
import { toast } from "react-toastify";

const initialState = {
  message: "",
};

export default function FormRegister() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    registerAction,
    initialState
  );

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Registrasi berhasil!", {
        theme: "light",
        autoClose: 1000,
      });

      const timer = setTimeout(() => {
        if (state.redirectTo) {
          router.push(state.redirectTo);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (!state.success && state.message) {
      toast.error(state.message || "Registrasi gagal!", {
        theme: "light",
        autoClose: 1000,
      });
    }
  }, [state, router]);

  return (
    <form
      id="registerForm"
      name="registerForm"
      action={formAction}
      className="flex flex-col gap-4 lg:gap-6 2xl:gap-8"
    >
      <div className="flex flex-col gap-2">
        <LabelAuth htmlFor="npm" text="NPM / ID Pemilih" />
        <InputAuth id="npm" name="npm" type="text" placeholder="0225001" />
      </div>
      <div className="flex flex-col gap-2">
        <LabelAuth htmlFor="password" text="Minimal 8 karakter" />
        <InputAuth
          id="password"
          name="password"
          type="password"
          placeholder="Ucok Racing"
        />
      </div>
      <div className="flex flex-col gap-2">
        <LabelAuth htmlFor="verifCode" text="Kode Verifikasi" />
        <InputAuth
          id="verifCode"
          name="verifCode"
          type="text"
          placeholder="a9jd71"
        />
      </div>
      <ButtonAuth disabled={pending} text={pending ? <Spinner /> : "Daftar"} />
    </form>
  );
}
