import AboutSection from "@/components/AboutSection";
import ClientsSection from "@/components/ClientsSection";
import HeroNavbar from "@/components/HeroNavbar";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import HelpdeskBanner, { HelpdeskFloat } from "@/components/HelpdeskBanner";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TrainingSection from "@/components/TrainingSection";

export default function Home() {
  return (
    <>
      <main>
        <HeroNavbar />
        <AboutSection />
        <WhyChooseUs />
        <ServicesSection />
        <TrainingSection />
        <ClientsSection />
        <TestimonialsSection />
        <HelpdeskBanner />
        <ContactSection />
      </main>
      <Footer />
      <HelpdeskFloat />
    </>
  );
}