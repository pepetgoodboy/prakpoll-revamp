import { IoMdTimer } from "react-icons/io";
import { TbUserEdit, TbUserShield } from "react-icons/tb";
import { LiaVoteYeaSolid, LiaUsersSolid } from "react-icons/lia";
import { IoPhonePortraitOutline } from "react-icons/io5";
import CardFeature from "@/components/ui/Card/CardFeature";

export default function FeatureSection() {
  return (
    <section id="fitur" className="pt-12 sm:pt-20 lg:pt-28">
      <div className="max-w-7xl px-4 lg:px-8 mx-auto">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Fitur
            </h1>
            <p className="text-lg text-gray-700">
              Jelajahi semua fitur yang tersedia di aplikasi ini
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 lg:gap-12">
            <CardFeature
              icon={IoMdTimer}
              title="Hasil Real Time"
              description="Lihat hasil pemilihan secara langsung tanpa harus menunggu, transparan dan akurat."
            />
            <CardFeature
              icon={TbUserShield}
              title="Role-based Access"
              description="Akses sistem dibagi untuk mahasiswa sebagai user dan admin sebagai pengelola."
            />
            <CardFeature
              icon={LiaVoteYeaSolid}
              title="Voting Berdasarkan Jurusan & UKM"
              description="Mahasiswa hanya bisa memilih kandidat sesuai jurusan atau UKM yang diikutinya."
            />
            <CardFeature
              icon={TbUserEdit}
              title="Edit Profil Mahasiswa"
              description="Mahasiswa bisa mengubah nama lengkap dan memilih organisasi yang diikuti."
            />
            <CardFeature
              icon={LiaUsersSolid}
              title="Manajemen User & Pemilihan"
              description="Admin dapat mengelola user, membuat pemilihan, dan input
                  kandidat dengan mudah."
            />
            <CardFeature
              icon={IoPhonePortraitOutline}
              title="Mobile Friendly & Ringan"
              description="Tampilan responsif dan ringan, bisa diakses lancar dari HP
                  atau perangkat lain."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
