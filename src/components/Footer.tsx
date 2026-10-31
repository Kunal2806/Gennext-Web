"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CONTACT, LEGAL_ENTITY, OFFICES, SERVICE_ROUTES, SOCIAL_LINKS } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const COMPANY_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/training", label: "Training" },
  { href: "/contact", label: "Contact" },
  { href: "/MainSite/privacy_policy", label: "Privacy Policy" },
  { href: "/MainSite/term_condition", label: "Terms & Conditions" },
];

const LINK = "w-fit py-1 font-body text-sm font-semibold text-white/75 transition-colors hover:text-white";
const HEADING = "mb-3 w-fit font-heading text-sm font-extrabold uppercase tracking-[0.2em] text-white";

const FOCUS_SELECTOR = "a:not([data-logo]), h2, address, [data-focus]";
const BLUR = "blur(0.6px)";
const DIM = 0.7;

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        });

        tl.from("[data-logo]", {
          autoAlpha: 0,
          y: 30,
          scale: 0.85,
          filter: "blur(14px)",
          duration: 1,
          ease: "power3.out",
        });

        tl.from(
          "[data-reveal]",
          {
            autoAlpha: 0,
            y: 24,
            filter: "blur(12px)",
            duration: 0.9,
            ease: "power2.out",
            stagger: 0.08,
            clearProps: "filter,transform",
          },
          "-=0.6"
        );

        tl.add(() => {
          gsap.to("[data-logo]", {
            y: -4,
            duration: 2.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });

        const logo = el.querySelector<HTMLElement>("[data-logo]");
        if (logo) {
          const enter = () =>
            gsap.to(logo, { scale: 1.06, rotate: -2, duration: 0.35, ease: "power2.out", overwrite: "auto" });
          const leave = () =>
            gsap.to(logo, { scale: 1, rotate: 0, duration: 0.45, ease: "elastic.out(1, 0.5)", overwrite: "auto" });

          logo.addEventListener("mouseenter", enter);
          logo.addEventListener("mouseleave", leave);

          return () => {
            logo.removeEventListener("mouseenter", enter);
            logo.removeEventListener("mouseleave", leave);
          };
        }
      });

      const box = frame.current;
      if (!box) return;

      mm.add("(prefers-reduced-motion: no-preference) and (hover: hover)", () => {
        const items = gsap.utils.toArray<HTMLElement>(FOCUS_SELECTOR, el);
        gsap.set(items, { filter: BLUR, opacity: DIM });
        gsap.set(box, { autoAlpha: 0 });

        let active: HTMLElement | null = null;

        const blurOut = (target: HTMLElement) =>
          gsap.to(target, {
            filter: BLUR,
            opacity: DIM,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });

        const onOver = (event: PointerEvent) => {
          const target = (event.target as HTMLElement).closest<HTMLElement>(FOCUS_SELECTOR);
          if (!target || !el.contains(target) || target === active) return;

          if (active) blurOut(active);
          active = target;

          const parentRect = el.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();
          const pos = {
            x: targetRect.left - parentRect.left,
            y: targetRect.top - parentRect.top,
            width: targetRect.width,
            height: targetRect.height,
          };

          if (Number(gsap.getProperty(box, "autoAlpha")) === 0) gsap.set(box, pos);

          gsap.to(target, { filter: "blur(0px)", opacity: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
          gsap.to(box, { ...pos, autoAlpha: 1, duration: 0.3, ease: "power3.out", overwrite: "auto" });
        };

        const onLeave = () => {
          if (active) blurOut(active);
          active = null;
          gsap.to(box, { autoAlpha: 0, duration: 0.25 });
        };

        el.addEventListener("pointerover", onOver);
        el.addEventListener("pointerleave", onLeave);

        return () => {
          el.removeEventListener("pointerover", onOver);
          el.removeEventListener("pointerleave", onLeave);
          gsap.set(items, { clearProps: "filter,opacity" });
        };
      });
    },
    { scope: root }
  );

  return (
    <footer ref={root} className="relative overflow-hidden bg-primary-dark px-[5vw] pb-8 pt-16 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl"
      />

            <div className="relative mx-auto max-w-7xl">
        {/* Brand + contact row */}
        <div className="grid gap-10 pb-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr]">
          <div data-reveal>
            <Link
              data-logo
              href="/"
              aria-label="Gennext IT home"
              className="inline-block rounded-2xl bg-white px-4 py-2 will-change-transform"
            >
              <Image src="/logo.png" alt="Gennext" width={140} height={42} className="h-9 w-auto" />
            </Link>

            <p className="mt-5 max-w-md font-body text-sm leading-relaxed text-white/70">
              <span data-focus>
                Engineering scalable digital products, cloud infrastructure, and AI-driven experiences for businesses worldwide.
              </span>
            </p>

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

          <div data-reveal className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-heading text-sm font-extrabold">
                <span data-focus>{OFFICES.india.label}</span>
              </p>
              <address className="mt-2 flex gap-2 font-body text-sm not-italic text-white/70">
                <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden />
                <span>{OFFICES.india.lines.join(", ")}</span>
              </address>
            </div>
            <div>
              <p className="font-heading text-sm font-extrabold">
                <span data-focus>{OFFICES.dubai.label}</span>
              </p>
              <address className="mt-2 flex gap-2 font-body text-sm not-italic text-white/70">
                <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden />
                <span>
                  {OFFICES.dubai.entity}, {OFFICES.dubai.lines.join(", ")}
                </span>
              </address>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div data-reveal className="border-t border-white/10" />

        {/* Nav row — 3 equal columns */}
        <div className="grid gap-8 py-10 sm:grid-cols-3">
          <nav data-reveal aria-label="Company" className="flex flex-col">
            <h2 className={HEADING}>Company</h2>
            {COMPANY_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={LINK}>
                {link.label}
              </Link>
            ))}
          </nav>

          <nav data-reveal aria-label="Services" className="flex flex-col">
            <h2 className={HEADING}>Services</h2>
            {SERVICE_ROUTES.map((route) => (
              <Link key={route.href} href={route.href} className={LINK}>
                {route.label}
              </Link>
            ))}
          </nav>

          <nav data-reveal aria-label="Social media" className="flex flex-col">
            <h2 className={HEADING}>Social</h2>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={LINK}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div
          data-reveal
          className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 font-body text-xs font-semibold text-white/60 sm:flex-row sm:items-center"
        >
          <p>
            <span data-focus>
              © {new Date().getFullYear()} {LEGAL_ENTITY}. All rights reserved.
            </span>
          </p>
          <a href="#top" className="hover:text-white">
            Back to top ↑
          </a>
        </div>
      </div>

      <span ref={frame} aria-hidden className="pointer-events-none absolute left-0 top-0 z-20">
        <i className="absolute left-0 top-0 h-2.5 w-2.5 border-l-2 border-t-2 border-white" />
        <i className="absolute right-0 top-0 h-2.5 w-2.5 border-r-2 border-t-2 border-white" />
        <i className="absolute bottom-0 left-0 h-2.5 w-2.5 border-b-2 border-l-2 border-white" />
        <i className="absolute bottom-0 right-0 h-2.5 w-2.5 border-b-2 border-r-2 border-white" />
      </span>
    </footer>
  );
}
