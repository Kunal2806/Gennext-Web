import HeroNavbar from "@/components/HeroNavbar";

export default function Home() {
  return (
    <main>
      <HeroNavbar />
      <section id="about" className="min-h-screen bg-background-light" />
    </main>
  );
}