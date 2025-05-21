import Image from "next/image";
import ButtonHero from "../ui/Button/ButtonHero";

export default function HeroSection() {
  return (
    <section id="beranda" className="relative mt-8">
      <div className="max-w-7xl px-4 lg:px-8 mx-auto">
        <div className="relative">
          <Image
            src="/bg-voting.webp"
            alt="Election Voting"
            width={4200}
            height={2800}
            className="w-full h-[80vh] rounded-[20px] object-cover object-center"
            priority
            sizes="100vw"
            quality={70}
          />
          <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-purple-800 to-indigo-700 mix-blend-multiply"></div>
          <div className="absolute inset-0 rounded-[20px] bg-black/30"></div>
          <div className="absolute top-0 w-full">
            <div className="flex flex-col gap-6 lg:gap-8 justify-center h-[80vh] px-4 sm:px-12 xl:px-16">
              <div className="flex flex-col">
                <h1 className="text-white text-center sm:text-start text-5xl font-bold tracking-tight sm:text-6xl">
                  Satu suara
                </h1>
                <h1 className="text-secondary text-center sm:text-start text-5xl font-bold tracking-tight sm:text-6xl">
                  Satu masa depan
                </h1>
              </div>
              <p className="text-white text-lg max-w-sm sm:max-w-xl mx-auto sm:mx-0 text-center sm:text-start">
                Setiap suara anda menentukan arah organisasi kita. Gunakan hak
                suara anda untuk membentuk masa depan kampus yang lebih baik.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-sm sm:max-w-none mx-auto w-full">
                <ButtonHero
                  href="#"
                  text="Lihat Pemilihan"
                  variant="white"
                  textColor="secondary"
                />
                <ButtonHero
                  href="#"
                  text="Pilih Sekarang"
                  variant="secondary"
                  textColor="white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
