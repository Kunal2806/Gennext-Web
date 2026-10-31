import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";

export default function InnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}