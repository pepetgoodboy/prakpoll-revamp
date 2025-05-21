"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaStar, FaQuoteRight } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { FiMessageSquare } from "react-icons/fi";
import { LuQuote } from "react-icons/lu";

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Rizky Aditya",
      role: "Mahasiswa Manajemen Informatika",
      content:
        "PrakPoll sangat membantu proses pemilihan ketua jurusan tahun ini. Sistemnya aman dan hasilnya bisa langsung dilihat secara real-time. Tidak ada lagi keraguan tentang transparansi pemilihan.",
      rating: 5,
      avatar: "RA",
      bgColor: "bg-indigo-100",
    },
    {
      id: 2,
      name: "Anisa Rahma",
      role: "Mahasiswa Manajemen Bisnis Digital",
      content:
        "Sebagai panitia pemilihan BEM, PrakPoll membuat pekerjaan saya jauh lebih mudah. Manajemen user dan fitur pembatasan voting berdasarkan jurusan sangat bermanfaat untuk memastikan pemilihan berjalan sesuai aturan.",
      rating: 5,
      avatar: "AR",
      bgColor: "bg-purple-100",
    },
    {
      id: 3,
      name: "Fauzan Akbar",
      role: "Ketua BEM 2024/2025",
      content:
        "Saya terpilih melalui proses pemilihan yang menggunakan PrakPoll. Sistemnya sangat terpercaya dan hasilnya dapat dipertanggungjawabkan. Semua mahasiswa dapat dengan mudah memberikan suara mereka.",
      rating: 4,
      avatar: "FA",
      bgColor: "bg-blue-100",
    },
    {
      id: 4,
      name: "Dini Permata",
      role: "Mahasiswa Akuntansi",
      content:
        "Interface yang mobile friendly memudahkan saya memberikan suara langsung dari HP. Prosesnya sangat cepat dan tidak ribet, cocok untuk mahasiswa yang selalu sibuk dengan jadwal kuliah.",
      rating: 5,
      avatar: "DP",
      bgColor: "bg-pink-100",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  const nextSlide = () => {
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index) => {
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section
      id="testimoni"
      className="py-12 sm:py-20 lg:py-28 relative overflow-hidden"
    >
      <div className="max-w-7xl px-4 lg:px-8 mx-auto relative">
        <div className="flex flex-col items-center gap-6">
          <div className="max-w-2xl text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Apa Kata <span className="text-indigo-600">Mereka</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-1 w-6 bg-indigo-600 rounded-full"></div>
              <div className="h-1 w-12 bg-indigo-600 rounded-full"></div>
              <div className="h-1 w-6 bg-indigo-600 rounded-full"></div>
            </div>
            <p className="text-lg text-gray-700">
              Para mahasiswa berbagi pengalaman mereka menggunakan PrakPoll
              untuk pemilihan ketua organisasi Politeknik Praktisi Bandung.
            </p>
          </div>
          <div className="w-full">
            <div
              className={`transition-all duration-500 ease-in-out ${
                isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <div className="relative max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                <div className="absolute -right-6 -top-6 w-24 h-24 text-indigo-100 opacity-20">
                  <FaQuoteRight className="w-full h-full" />
                </div>

                <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div
                      className={`w-20 h-20 rounded-full ${testimonials[currentIndex].bgColor} flex items-center justify-center text-xl font-bold text-indigo-600 mb-4`}
                    >
                      {testimonials[currentIndex].avatar}
                    </div>
                    <div className="flex mt-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`h-5 w-5 ${
                            i < testimonials[currentIndex].rating
                              ? "text-yellow-400"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="mt-4 flex items-center text-indigo-600">
                      <FiMessageSquare className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">Testimoni</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="relative">
                      <LuQuote className="h-8 w-8 text-indigo-200 absolute -top-4 -left-2" />
                      <p className="text-gray-700 text-lg pl-6 leading-relaxed mb-6 italic">
                        "{testimonials[currentIndex].content}"
                      </p>
                    </div>

                    <div className="border-t border-gray-100 pt-4 mt-4">
                      <h3 className="font-bold text-xl text-gray-900">
                        {testimonials[currentIndex].name}
                      </h3>
                      <p className="text-indigo-600 font-medium">
                        {testimonials[currentIndex].role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white border cursor-pointer border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
                aria-label="Previous testimonial"
              >
                <FaChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-3 items-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`h-3 rounded-full focus:outline-none transition-all duration-300 ${
                      currentIndex === index
                        ? "w-8 bg-indigo-600"
                        : "w-3 bg-indigo-200 hover:bg-indigo-300"
                    }`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white border cursor-pointer border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
                aria-label="Next testimonial"
              >
                <FaChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link href="/register">
              <button className="bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center mx-auto">
                Bergabung Sekarang
                <FaChevronRight className="h-4 w-4 ml-1" />
              </button>
            </Link>
            <p className="text-gray-600 mt-4">
              Jadilah bagian dari pemilihan ketua organisasi kampus yang
              transparan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
