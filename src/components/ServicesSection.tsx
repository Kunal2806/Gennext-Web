"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";

const TABS = [
  {
    label: "IT Consultancy",
    cards: [
      { img: "it-advisory.png", label: "IT Advisory and Consulting", href: "/services/it-advisory" },
      { img: "IT Security (1).jpg", label: "IT Audits", href: "/services/it-audits" },
    ],
  },
  {
    label: "Application Development",
    cards: [
      {
        img: "web-application-development.png",
        label: "Web Application Development And Maintenance",
        href: "/services/web-application-development-and-maintenance",
      },
      { img: "mobile application.png", label: "Mobile Applications", href: "/services/mobile-applications" },
      { img: "others_first.png", label: "Others", href: "/services/others" },
    ],
  },
  {
    label: "Corporate Training",
    cards: [{ img: "web-application-development.png", label: "Web Development", href: "/services/web-development" }],
  },
];

export default function ServicesSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="relative overflow-hidden bg-white px-[5vw] py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>Contact us today for all your IT needs</SectionLabel>
          <h2 className="mt-5 font-heading text-4xl font-extrabold text-primary-dark lg:text-5xl">Our Services</h2>
        </Reveal>

        <Reveal delay={100}>
          <div
            role="tablist"
            aria-label="Service categories"
            className="mt-10 inline-flex flex-wrap gap-1 rounded-full bg-linear-to-r from-primary-dark to-primary p-1.5 shadow-lg shadow-primary/25"
          >
            {TABS.map((tab, idx) => (
              <button
                key={tab.label}
                type="button"
                role="tab"
                id={`service-tab-${idx}`}
                aria-selected={active === idx}
                aria-controls="service-tabpanel"
                onClick={() => setActive(idx)}
                className={`cursor-pointer rounded-full px-6 py-2.5 font-body text-sm font-bold transition-all ${
                  active === idx ? "bg-white text-primary-dark shadow" : "text-white hover:bg-white/15"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div
          id="service-tabpanel"
          role="tabpanel"
          aria-labelledby={`service-tab-${active}`}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TABS[active].cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group block overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-[0_10px_40px_-15px_rgba(0,80,159,0.2)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_-15px_rgba(0,80,159,0.4)]"
            >
              <span className="relative block h-56 w-full overflow-hidden bg-background-light">
                <Image
                  src={encodeURI(`/homepage/${card.img}`)}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </span>
              <span className="flex items-center justify-between gap-3 p-6">
                <span className="font-heading text-lg font-bold leading-snug text-primary-dark">{card.label}</span>
                <ArrowRight
                  size={20}
                  aria-hidden
                  className="shrink-0 text-primary transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}