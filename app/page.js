import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ElectionSectionWrapper from "@/components/sections/ElectionSectionWrapper";
import FeatureSection from "@/components/sections/FeatureSection";
import GuideSection from "@/components/sections/GuideSection";
import HeroSection from "@/components/sections/HeroSection";
import TestimonialSection from "@/components/sections/TestimonialSection";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ElectionSectionWrapper />
      <FeatureSection />
      <GuideSection />
      <TestimonialSection />
      <Footer />
    </>
  );
}
