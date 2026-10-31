"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MessageCircle, Phone } from "lucide-react";
import { CONTACT } from "@/lib/site";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { useScrollSpy } from "@/components/useScrollSpy";

export type ServiceStep = { num: string; title: string; icon: string };
export type RelatedService = { href: string; label: string; image: string };

type Props = {
  pageTitle: string;
  steps: ServiceStep[];
  hero: { src: string; alt: string };
  sectionHeading: string;
  children: React.ReactNode;
  related: RelatedService[];
  afterDescription?: React.ReactNode;
  descriptionClassName?: string;
};

const SECTIONS = ["our-services-steps", "service-description", "related-services"] as const;

const TABS: { id: (typeof SECTIONS)[number]; label: string }[] = [
  { id: "our-services-steps", label: "Our Services" },
  { id: "service-description", label: "Service Description" },
  { id: "related-services", label: "Related Services" },
];

const assetUrl = (path: string) => encodeURI(path).replace(/'/g, "%27");

const FLOAT_BTN =
  "flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-r from-primary-dark to-primary text-white shadow-lg shadow-primary/40 transition-transform hover:scale-105";

export default function ServicePageShell({
  pageTitle,
  steps,
  hero,
  sectionHeading,
  children,
  related,
  afterDescription,
  descriptionClassName = "",
}: Props) {
  const active = useScrollSpy(SECTIONS);

  return (
    <div className="relative bg-background-light font-body text-slate-600">
      <div className="fixed bottom-6 right-3 z-40 flex flex-col gap-3 md:bottom-auto md:top-1/2 md:-translate-y-1/2">
        <a href={CONTACT.phone.href} aria-label={`Call us on ${CONTACT.phone.label}`} className={FLOAT_BTN}>
          <Phone size={18} aria-hidden />
        </a>
        <a href={`mailto:${CONTACT.email}`} aria-label={`Email us at ${CONTACT.email}`} className={FLOAT_BTN}>
          <Mail size={18} aria-hidden />
        </a>
        <a
          href={CONTACT.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message us on WhatsApp (opens in a new tab)"
          className={FLOAT_BTN}
        >
          <MessageCircle size={18} aria-hidden />
        </a>
      </div>

      <nav
        aria-label="On this page"
        className="sticky top-16.5 z-40 border-b border-primary/10 bg-white/90 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-[5vw] py-2">
          <div className="flex items-center gap-1 overflow-x-auto">
            <Link
              href="/"
              className="whitespace-nowrap rounded-full px-4 py-2 font-body text-sm font-bold text-slate-500 transition-colors hover:text-primary-dark"
            >
              Home
            </Link>
            {TABS.map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                aria-current={active === tab.id ? "true" : undefined}
                className={`whitespace-nowrap rounded-full px-4 py-2 font-body text-sm font-bold transition-colors ${
                  active === tab.id
                    ? "bg-linear-to-r from-primary-dark to-primary text-white"
                    : "text-slate-500 hover:text-primary-dark"
                }`}
              >
                {tab.label}
              </a>
            ))}
          </div>
          <Link
            href="/contact"
            className="hidden shrink-0 items-center gap-2 rounded-full border-2 border-primary px-5 py-1.5 font-body text-sm font-bold text-primary-dark transition-colors hover:bg-primary hover:text-white md:flex"
          >
            Enquire Now <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </nav>

      <section
        id="our-services-steps"
        className="relative scroll-mt-32 overflow-hidden px-[5vw] py-20 lg:py-28"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl">
          <SectionLabel>What we offer</SectionLabel>
          <h1 className="mt-5 max-w-4xl font-heading text-4xl font-extrabold leading-tight text-primary-dark lg:text-5xl">
            {pageTitle}
          </h1>

          <ol className="mt-14 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {steps.map((step, i) => (
              <li key={step.num}>
                <Reveal delay={i * 80} className="h-full">
                  <div className="group relative h-full overflow-hidden rounded-3xl border border-primary/10 bg-white p-7 shadow-[0_10px_40px_-15px_rgba(0,80,159,0.2)] transition-shadow duration-500 hover:shadow-[0_25px_60px_-15px_rgba(0,80,159,0.4)]">
                    <span className="absolute inset-0 bg-linear-to-br from-primary-dark to-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute right-5 top-3 font-heading text-5xl font-extrabold text-primary/10 transition-colors duration-500 group-hover:text-white/15">
                      {step.num}
                    </span>
                    <div className="relative">
                      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-colors duration-500 group-hover:bg-white">
                        <span
                          role="presentation"
                          className="h-10 w-10 bg-contain bg-center bg-no-repeat"
                          style={{ backgroundImage: `url('${assetUrl(`/services/${step.icon}`)}')` }}
                        />
                      </span>
                      <h2 className="mt-6 font-heading text-lg font-bold leading-snug text-primary-dark transition-colors duration-500 group-hover:text-white">
                        {step.title}
                      </h2>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="service-description"
        className={`scroll-mt-32 overflow-x-clip bg-white px-[5vw] py-20 lg:py-28 ${descriptionClassName}`}
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
          <Reveal from="left" className="lg:col-span-5">
            <div className="rounded-3xl bg-background-light p-6">
              <Image
                src={assetUrl(hero.src)}
                alt={hero.alt}
                width={800}
                height={600}
                className="h-auto max-h-120 w-full rounded-2xl object-contain"
              />
            </div>
          </Reveal>
          <Reveal from="right" className="lg:col-span-7">
            <SectionLabel>Service description</SectionLabel>
            <h2 className="mt-5 font-heading text-3xl font-extrabold leading-tight text-primary-dark lg:text-4xl">
              {sectionHeading}
            </h2>
            <div className="mt-6 text-[15px] font-semibold leading-8 text-slate-500 [&_li]:mb-1 [&_p]:mb-5 [&_strong]:text-primary-dark">
              {children}
            </div>
          </Reveal>
        </div>
      </section>

      {afterDescription}

      <section id="related-services" className="scroll-mt-32 px-[5vw] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Contact us today for all your IT needs</SectionLabel>
          <h2 className="mt-5 font-heading text-3xl font-extrabold text-primary-dark lg:text-4xl">
            Related Services
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((service, i) => (
              <Reveal key={service.href} delay={i * 80}>
                <Link
                  href={service.href}
                  className="group block overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-[0_10px_40px_-15px_rgba(0,80,159,0.2)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_-15px_rgba(0,80,159,0.4)]"
                >
                  <span
                    role="presentation"
                    className="block h-52 w-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${assetUrl(`/services/${service.image}`)}')` }}
                  />
                  <span className="flex items-center justify-between gap-3 p-6">
                    <span className="font-heading text-lg font-bold text-primary-dark">{service.label}</span>
                    <ArrowRight
                      size={20}
                      aria-hidden
                      className="shrink-0 text-primary transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}