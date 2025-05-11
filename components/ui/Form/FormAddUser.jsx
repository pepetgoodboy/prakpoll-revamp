import { useUserStore } from "@/store/userStore";
import Spinner from "../Spinner/Spinner";
import LabelFormAdmin from "../Label/LabelFormAdmin";
import InputFormAdmin from "../Input/InputFormAdmin";
import SelectProdiUser from "../Select/SelectProdiUser";
import ButtonFormAdmin from "../Button/ButtonFormAdmin";

export default function FormAddUser({ formAction, pending }) {
  const { toggleModalAddUser } = useUserStore();

  return (
    <form
      id="formAddUser"
      name="formAddUser"
      action={formAction}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1">
        <LabelFormAdmin htmlFor="npm" text="NPM" />
        <InputFormAdmin
          id="npm"
          name="npm"
          type="number"
          placeholder="Masukkan NPM"
        />
      </div>
      <div className="flex flex-col gap-1">
        <LabelFormAdmin htmlFor="fullname" text="Nama Lengkap" />
        <InputFormAdmin
          id="fullname"
          name="fullname"
          type="text"
          placeholder="Masukkan Nama Lengkap"
        />
      </div>
      <div className="flex flex-col gap-1">
        <LabelFormAdmin
          htmlFor="studyProgramOrPosition"
          text="Program Studi / Jabatan"
        />
        <SelectProdiUser />
      </div>
      <div className="flex justify-end items-end">
        <div className="flex gap-2">
          <ButtonFormAdmin
            onClick={toggleModalAddUser}
            variant="red-500"
            hoverVariant="red-600"
            text="Batal"
          />
          <ButtonFormAdmin
            type="submit"
            disabled={pending}
            variant="secondary"
            hoverVariant="secondary/90"
            text={pending ? <Spinner /> : "Tambah User"}
          />
        </div>
      </div>
    </form>
  );
}
