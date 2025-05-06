import FormRegister from "@/components/ui/Form/FormRegister";
import AuthLayout from "@/components/layout/AuthLayout";

export const metadata = {
  title: "PrakPoll | Daftar",
  description:
    "Daftar ke PrakPoll untuk melakukan pemilihan ketua organisasi mahasiswa Politeknik Praktisi Bandung.",
};

export default function Register() {
  return (
    <AuthLayout
      title="Daftar"
      link="/login"
      linkTitle="Masuk Sekarang"
      question="Sudah"
    >
      <FormRegister />
    </AuthLayout>
  );
}
