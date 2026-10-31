import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { CONTACT, OFFICES, SERVICE_ROUTES, SOCIAL_LINKS } from "@/lib/site";

const COMPANY_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/training", label: "Training" },
  { href: "/contact", label: "Contact" },
  { href: "/MainSite/privacy_policy", label: "Privacy Policy" },
  { href: "/MainSite/term_condition", label: "Terms & Conditions" },
];

const LINK = "py-1 font-body text-sm font-semibold text-white/75 transition-colors hover:text-white";
const HEADING = "mb-3 font-heading text-sm font-extrabold uppercase tracking-[0.2em] text-white";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary-dark px-[5vw] pb-8 pt-16 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link href="/" aria-label="Gennext IT home" className="inline-block rounded-2xl bg-white px-4 py-2">
            <Image src="/logo.png" alt="Gennext" width={140} height={42} className="h-9 w-auto" />
          </Link>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="font-heading text-sm font-extrabold">{OFFICES.india.label}</p>
              <address className="mt-2 flex gap-2 font-body text-sm not-italic text-white/75">
                <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden />
                <span>{OFFICES.india.lines.join(", ")}</span>
              </address>
            </div>
            <div>
              <p className="font-heading text-sm font-extrabold">{OFFICES.dubai.label}</p>
              <address className="mt-2 flex gap-2 font-body text-sm not-italic text-white/75">
                <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden />
                <span>
                  {OFFICES.dubai.entity}, {OFFICES.dubai.lines.join(", ")}
                </span>
              </address>
            </div>
          </div>
          <p className="mt-5 font-body text-sm font-semibold text-white/75">
            <a href={CONTACT.phone.href} className="hover:text-white">
              {CONTACT.phone.label}
            </a>
            {" · "}
            <a href={`mailto:${CONTACT.email}`} className="hover:text-white">
              {CONTACT.email}
            </a>
          </p>
        </div>

        <nav aria-label="Company" className="flex flex-col">
          <h2 className={HEADING}>Company</h2>
          {COMPANY_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={LINK}>
              {link.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Services" className="flex flex-col">
          <h2 className={HEADING}>Services</h2>
          {SERVICE_ROUTES.map((route) => (
            <Link key={route.href} href={route.href} className={LINK}>
              {route.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Social media" className="flex flex-col">
          <h2 className={HEADING}>Social</h2>
          {SOCIAL_LINKS.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={LINK}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="relative mx-auto mt-12 max-w-7xl border-t border-white/15 pt-6 font-body text-xs font-semibold text-white/60">
        © {new Date().getFullYear()} Gennext IT Management and Consulting Private Limited. All rights reserved.
      </div>
    </footer>
  );
}