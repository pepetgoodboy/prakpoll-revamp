import { Figtree } from "next/font/google";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";

const figtree = Figtree({
  subsets: ["latin"],
});

export const metadata = {
  generator: "PrakPoll",
  applicationName: "PrakPoll",
  referrer: "origin-when-cross-origin",
  title: "PrakPoll",
  description:
    "PrakPoll adalah platform e-voting resmi untuk pemilihan ketua organisasi mahasiswa Politeknik Praktisi Bandung. Aman, transparan, dan real-time.",
  keywords: [
    "prakPoll",
    "e-voting kampus",
    "pemilihan ketua",
    "organisasi mahasiswa",
    "politeknik praktisi bandung",
    "voting online",
    "real-time voting",
  ],
  authors: [
    { name: "Muhammad Iqbal Mudzaki" },
    { name: "Pepet Goodboy", url: "https://iqbalm.my.id" },
  ],
  creator: "Pepet Goodboy",
  publisher: "Pepet Goodboy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${figtree.className} antialiased`}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
