import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ElectionSection from "@/components/sections/ElectionSection";
import FeatureSection from "@/components/sections/FeatureSection";
import GuideSection from "@/components/sections/GuideSection";
import HeroSection from "@/components/sections/HeroSection";
import TestimonialSection from "@/components/sections/TestimonialSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ElectionSection />
      <FeatureSection />
      <GuideSection />
      <TestimonialSection />
      <Footer />
    </>
  );
}
