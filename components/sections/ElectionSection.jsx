import CardElection from "@/components/ui/Card/CardElection";

export default function ElectionSection() {
  const candidatesElections1 = [
    {
      name: "Noval Rizky",
      image: "/Noval.png",
    },
    {
      name: "Rifky Salim",
      image: "/Rifki.png",
    },
  ];

  const candidatesElections2 = [
    {
      name: "Ahmad Rafly",
      image: "/Rafly.png",
    },
    {
      name: "Feri Ahmad",
      image: "/Feri.png",
    },
  ];

  const candidatesElections3 = [
    {
      name: "Khansa Mujahadah",
      image: "/Oca.png",
    },
    {
      name: "Winda Sukmawati",
      image: "/Winda.png",
    },
  ];

  return (
    <section id="pemilihan" className="py-16 bg-gray-50">
      <div className="max-w-7xl px-4 lg:px-8 mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Pemilihan Aktif
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl">
                Lihat semua pemilihan yang sedang berlangsung di Politeknik
                Praktisi Bandung.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CardElection
              candidates={candidatesElections1}
              title="Ketua HIMAMI 2025/2026"
              schedule="7 Mei 2025 10:00 s/d 8 Mei 2025 10:00"
            />
            <CardElection
              candidates={candidatesElections2}
              title="Ketua BEM 2025/2026"
              schedule="7 Mei 2025 10:00 s/d 9 Mei 2025 10:00"
            />
            <CardElection
              candidates={candidatesElections3}
              title="Ketua IMSI 2025/2026"
              schedule="7 Mei 2025 10:00 s/d 10 Mei 2025 10:00"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
