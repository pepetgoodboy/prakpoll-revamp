"use client";

import LabelAuth from "@/app/components/label/LabelAuth";
import InputAuth from "@/app/components/input/InputAuth";
import ButtonAuth from "@/app/components/button/ButtonAuth";
import { registerAction } from "@/app/actions";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/spinner/Spinner";
import SelectAuth from "../select/SelectAuth";
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
      <div className="lg:flex lg:gap-2">
        <div className="flex flex-col gap-2">
          <LabelAuth htmlFor="npm" text="NPM / ID Pemilih" />
          <InputAuth id="npm" name="npm" type="text" placeholder="0225001" />
        </div>
        <div className="flex flex-col gap-2">
          <LabelAuth htmlFor="fullname" text="Nama Lengkap" />
          <InputAuth
            id="fullname"
            name="fullname"
            type="text"
            placeholder="Ucok Racing"
          />
        </div>
      </div>
      <div className="lg:flex lg:gap-2">
        <div className="flex flex-col gap-2">
          <LabelAuth htmlFor="studyProgramOrPosition" text="Prodi / Jabatan" />
          <SelectAuth id="studyProgramOrPosition" name="studyProgramOrPosition">
            <option value="" disabled>
              Pilih Prodi / Jabatan
            </option>
            <option value="Akuntansi">Akuntansi</option>
            <option value="Perpajakan">Perpajakan</option>
            <option value="Manajemen_Informatika">Manajemen Informatika</option>
            <option value="Manajemen_Bisnis_Digital">
              Manajemen Bisnis Digital
            </option>
            <option value="Dosen">Dosen</option>
            <option value="Staff">Staff</option>
            <option value="Akademik">Akademik</option>
          </SelectAuth>
        </div>
        <div className="flex flex-col gap-2">
          <LabelAuth htmlFor="ukm" text="UKM" />
          <SelectAuth id="ukm" name="ukm">
            <option value="" disabled>
              Pilih UKM
            </option>
            <option value="Tidak_Ada">Tidak Ada</option>
            <option value="IMSI">IMSI</option>
            <option value="Bamboo">Bamboo</option>
            <option value="Futsal">Futsal</option>
            <option value="Badminton">Badminton</option>
          </SelectAuth>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <LabelAuth htmlFor="password" text="Password" />
        <InputAuth
          id="password"
          name="password"
          type="password"
          placeholder="Minimal 8 karakter"
        />
      </div>
      <ButtonAuth disabled={pending} text={pending ? <Spinner /> : "Daftar"} />
      {/* <ButtonAuth text="Daftar" /> */}
    </form>
  );
}
