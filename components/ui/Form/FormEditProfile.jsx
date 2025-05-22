"use client";

import ButtonFormAdmin from "../Button/ButtonFormAdmin";
import Link from "next/link";
import SelectUkm from "../Select/SelectUkm";
import LabelFormAdmin from "../Label/LabelFormAdmin";
import InputFormProfile from "../Input/InputFormProfile";
import { useUserStore } from "@/store/userStore";
import { editProfileUser } from "@/app/actions";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";

const initialState = {
  message: "",
};

export default function FormEditProfile() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const studyProgramOrPositionMap = {
    Manajemen_Informatika: "Manajemen Informatika",
    Manajemen_Bisnis_Digital: "Manajemen Bisnis Digital",
  };

  const [state, formAction, pending] = useActionState(
    editProfileUser,
    initialState
  );

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      router.refresh();
      toast.success(state.message || "Profil berhasil diubah.", {
        theme: "light",
        autoClose: 1000,
      });
    }

    if (!state.success && state.message) {
      toast.error(state.message || "Gagal mengubah profil!", {
        theme: "light",
        autoClose: 1000,
      });
    }
  }, [state, router]);

  return (
    <form
      id="editProfile"
      name="editProfile"
      action={formAction}
      className="flex flex-col gap-8 sm:gap-12 lg:gap-14"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-gray-900 font-medium">NPM</p>
          <span className="w-full max-w-xs xl:max-w-md py-2 px-4 text-gray-500 bg-gray-100 rounded-lg border border-gray-300">
            {user.npm}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <LabelFormAdmin htmlFor="fullname" text="Nama Lengkap" />
          <InputFormProfile
            id="fullname"
            name="fullname"
            type="text"
            defaultValue={user?.fullname}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-gray-900 font-medium">Program Studi / Jabatan</p>
          <span className="w-full max-w-xs xl:max-w-md py-2 px-4 text-gray-500 bg-gray-100 rounded-lg border border-gray-300">
            {studyProgramOrPositionMap[user.studyProgramOrPosition] ||
              user.studyProgramOrPosition}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <LabelFormAdmin htmlFor="ukm" text="UKM" />
          <SelectUkm defaultValue={user?.ukm} />
        </div>
      </div>
      <div className="flex justify-end gap-2 md:gap-4">
        <Link href="/dashboard/user">
          <ButtonFormAdmin
            text="Batal"
            variant="red-500"
            hoverVariant="red-500/90"
          />
        </Link>
        <ButtonFormAdmin
          type="submit"
          text={pending ? <Spinner /> : "Simpan Perubahan"}
          variant="secondary"
          hoverVariant="secondary/90"
        />
      </div>
    </form>
  );
}
