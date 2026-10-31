import AboutSection from "@/components/AboutSection";
import ClientsSection from "@/components/ClientsSection";
import Footer from "@/components/Footer";
import HeroNavbar from "@/components/HeroNavbar";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <>
      <main>
        <HeroNavbar />
        <AboutSection />
        <WhyChooseUs />
        <ClientsSection />
      </main>
      <Footer />
    </>
  );
}