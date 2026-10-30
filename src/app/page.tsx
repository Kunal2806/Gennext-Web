import AboutSection from "@/components/AboutSection";
import ClientsSection from "@/components/ClientsSection";
import HeroNavbar from "@/components/HeroNavbar";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <HeroNavbar />
      <AboutSection />
      <WhyChooseUs/>
      <ClientsSection /> 
    </main>
  );
}