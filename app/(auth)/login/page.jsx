import FormLogin from "@/app/components/form/FormLogin";
import AuthLayout from "@/app/components/layout/AuthLayout";

export const metadata = {
  title: "PrakPoll | Masuk",
  description:
    "Masuk ke PrakPoll untuk melakukan pemilihan ketua organisasi mahasiswa Politeknik Praktisi Bandung.",
};

export default function Login() {
  return (
    <AuthLayout
      title="Masuk"
      link="/register"
      linkTitle="Daftar Sekarang"
      question="Belum"
    >
      <FormLogin />
    </AuthLayout>
  );
}
