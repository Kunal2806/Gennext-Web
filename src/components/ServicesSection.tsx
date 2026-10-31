"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Reveal from "@/components/Reveal";

gsap.registerPlugin(useGSAP);

const TABS = [
  {
    label: "IT Consultancy",
    cards: [
      {
        img: "it-advisory.png",
        label: "IT Advisory and Consulting",
        text: "Clear technology roadmaps and expert guidance to help your business make smarter IT decisions.",
        href: "/services/it-advisory",
      },
      {
        img: "IT Security (1).jpg",
        label: "IT Audits",
        text: "Thorough audits of your systems, security and processes, so nothing is left to chance.",
        href: "/services/it-audits",
      },
    ],
  },
  {
    label: "Application Development",
    cards: [
      {
        img: "web-application-development.png",
        label: "Web Application Development And Maintenance",
        text: "Fast, secure and scalable web applications, built and maintained by one dedicated team.",
        href: "/services/web-application-development-and-maintenance",
      },
      {
        img: "mobile application.png",
        label: "Mobile Applications",
        text: "Smooth Android and iOS apps designed around how your users actually behave.",
        href: "/services/mobile-applications",
      },
      {
        img: "others_first.png",
        label: "Others",
        text: "Custom solutions for everything that does not fit in a box. Tell us what you need.",
        href: "/services/others",
      },
    ],
  },
  {
    label: "Corporate Training",
    cards: [
      {
        img: "web-application-development.png",
        label: "Web Development",
        text: "Hands-on, industry-ready training programs that take your team from basics to production.",
        href: "/services/web-development",
      },
    ],
  },
];

const SLOTS = [
  { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 },
  { x: 36, y: 10, rotate: 5, scale: 0.95, opacity: 1 },
  { x: -36, y: 20, rotate: -5, scale: 0.9, opacity: 1 },
];
const HIDDEN = { x: 0, y: 30, rotate: 0, scale: 0.85, opacity: 0 };
const SWIPE_DISTANCE = 70;
const FLICK_VELOCITY = 0.45;
const EXIT_X = 340;

export default function ServicesSection() {
  const [tab, setTab] = useState(0);
  const [index, setIndex] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const dir = useRef(0);

  const cards = TABS[tab].cards;
  const total = cards.length;
  const current = cards[index];

  const go = (step: number) => {
    dir.current = step;
    setIndex((i) => (i + step + total) % total);
  };

  const selectTab = (idx: number) => {
    dir.current = 0;
    setTab(idx);
    setIndex(0);
  };

    useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const slides = gsap.utils.toArray<HTMLElement>("[data-slide]");
      const direction = dir.current;
      dir.current = 0;

      slides.forEach((el, i) => {
        const offset = (i - index + total) % total;
        const slot = SLOTS[offset] ?? HIDDEN;
        const depth = total - offset;

        gsap.killTweensOf(el);
        gsap.set(el, { pointerEvents: offset === 0 ? "auto" : "none" });

        if (reduced) {
          gsap.set(el, { ...slot, zIndex: depth });
          return;
        }

        if (total > 1 && direction === 1 && offset === total - 1) {
          const side = Number(gsap.getProperty(el, "x")) > 5 ? 1 : -1;
          gsap.set(el, { zIndex: total + 1 });
          gsap
            .timeline()
            .to(el, { x: side * EXIT_X, rotate: side * 14, duration: 0.26, ease: "power2.out" })
            .set(el, { zIndex: depth })
            .to(el, { ...slot, duration: 0.5, ease: "power3.out" });
          return;
        }

        if (total > 1 && direction === -1 && offset === 0) {
          gsap
            .timeline()
            .to(el, { x: -EXIT_X, rotate: -14, scale: 0.95, duration: 0.24, ease: "power2.in" })
            .set(el, { zIndex: total + 1 })
            .to(el, { ...slot, duration: 0.5, ease: "power3.out" });
          return;
        }

        gsap.set(el, { zIndex: depth });
        gsap.to(el, { ...slot, duration: 0.5, ease: "power3.out" });
      });

      if (!reduced) {
        gsap.fromTo(
          "[data-copy] > *",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.06, overwrite: "auto" }
        );
      }
    },
    { scope: root, dependencies: [index, tab] }
  );

  useGSAP(
    () => {
      const el = stage.current;
      if (!el || total < 2) return;

      let startX = 0;
      let lastX = 0;
      let lastT = 0;
      let velocity = 0;
      let dx = 0;
      let dragging = false;
      let moved = false;
      let card: HTMLElement | null = null;
      let setX: ((value: number) => void) | null = null;
      let setRotate: ((value: number) => void) | null = null;

      const onDown = (e: PointerEvent) => {
        card = el.querySelector<HTMLElement>(`[data-slide="${index}"]`);
        if (!card) return;
        gsap.killTweensOf(card);
        setX = gsap.quickTo(card, "x", { duration: 0.18, ease: "power3.out" });
        setRotate = gsap.quickTo(card, "rotate", { duration: 0.18, ease: "power3.out" });
        dragging = true;
        moved = false;
        dx = 0;
        velocity = 0;
        startX = lastX = e.clientX;
        lastT = performance.now();
        el.setPointerCapture(e.pointerId);
      };

      const onMove = (e: PointerEvent) => {
        if (!dragging || !setX || !setRotate) return;
        const now = performance.now();
        dx = e.clientX - startX;
        velocity = (e.clientX - lastX) / Math.max(now - lastT, 1);
        lastX = e.clientX;
        lastT = now;
        if (Math.abs(dx) > 5) moved = true;
        setX(dx);
        setRotate(dx * 0.05);
      };

      const onUp = () => {
        if (!dragging) return;
        dragging = false;
        const flick = Math.abs(velocity) > FLICK_VELOCITY && velocity * dx > 0 && Math.abs(dx) > 20;
        if (Math.abs(dx) > SWIPE_DISTANCE || flick) {
          go(dx < 0 ? 1 : -1);
        } else if (card) {
          gsap.to(card, { x: 0, rotate: 0, duration: 0.45, ease: "back.out(1.6)", overwrite: true });
        }
      };

      const onClick = (e: MouseEvent) => {
        if (moved) {
          e.preventDefault();
          e.stopPropagation();
          moved = false;
        }
      };

      el.addEventListener("pointerdown", onDown);
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerup", onUp);
      el.addEventListener("pointercancel", onUp);
      el.addEventListener("click", onClick, true);

      return () => {
        el.removeEventListener("pointerdown", onDown);
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerup", onUp);
        el.removeEventListener("pointercancel", onUp);
        el.removeEventListener("click", onClick, true);
      };
    },
    { scope: root, dependencies: [index, tab] }
  );

  return (
    <section id="services" className="relative overflow-hidden bg-white px-[5vw] py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-0.5 w-10 bg-primary" />
            <span className="font-body text-xs font-bold uppercase tracking-[0.35em] text-slate-400">
              Contact us today for all your IT needs
            </span>
          </div>
          <h2 className="mt-5 font-heading text-4xl font-extrabold text-primary-dark lg:text-5xl">Our Services</h2>
        </Reveal>

        <Reveal delay={100}>
          <div
            role="tablist"
            aria-label="Service categories"
            className="mt-10 inline-flex flex-wrap gap-1 rounded-full bg-linear-to-r from-primary-dark to-primary p-1.5 shadow-lg shadow-primary/25"
          >
            {TABS.map((item, idx) => (
              <button
                key={item.label}
                type="button"
                role="tab"
                id={`service-tab-${idx}`}
                aria-selected={tab === idx}
                aria-controls="service-tabpanel"
                onClick={() => selectTab(idx)}
                className={`cursor-pointer rounded-full px-6 py-2.5 font-body text-sm font-bold transition-all ${
                  tab === idx ? "bg-white text-primary-dark shadow" : "text-white hover:bg-white/15"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div
          ref={root}
          id="service-tabpanel"
          role="tabpanel"
          aria-labelledby={`service-tab-${tab}`}
          className="mt-14 grid items-center gap-14 lg:grid-cols-2"
        >
          <div className="flex flex-col">
            <p data-copy-static className="font-body text-xs font-bold tracking-[0.25em] text-slate-400">
              {String(index + 1).padStart(2, "0")} <span className="text-slate-300">/ {String(total).padStart(2, "0")}</span>
            </p>

            <div data-copy aria-live="polite" className="mt-6 min-h-52">
              <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-primary">{TABS[tab].label}</p>
              <h3 className="mt-3 font-heading text-3xl font-extrabold leading-tight text-primary-dark lg:text-5xl">
                {current.label}
              </h3>
              <p className="mt-4 max-w-md font-body text-base leading-relaxed text-slate-500">{current.text}</p>
              <Link
                href={current.href}
                className="group mt-6 inline-flex items-center gap-2 font-body text-sm font-bold text-primary-dark"
              >
                Explore service
                <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                type="button"
                aria-label="Previous service"
                disabled={total < 2}
                onClick={() => go(-1)}
                className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-primary/20 bg-white text-primary-dark transition-colors hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft size={18} aria-hidden />
              </button>
              <button
                type="button"
                aria-label="Next service"
                disabled={total < 2}
                onClick={() => go(1)}
                className="grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-primary-dark text-white transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowRight size={18} aria-hidden />
              </button>
              {total > 1 && (
                <span className="ml-2 hidden items-center gap-2 font-body text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 sm:inline-flex">
                  <ArrowLeft size={12} aria-hidden />
                  <ArrowRight size={12} aria-hidden className="-ml-1.5" />
                  Drag the card
                </span>
              )}
            </div>
          </div>

          <div
            ref={stage}
            key={tab}
            className="relative mx-auto h-104 w-72 cursor-grab touch-pan-y select-none active:cursor-grabbing sm:w-80 lg:mr-auto"
          >
            {cards.map((card, i) => (
              <Link
                key={card.href}
                href={card.href}
                data-slide={i}
                draggable={false}
                aria-label={card.label}
                className="absolute inset-0 block overflow-hidden rounded-4xl border-4 border-white bg-background-light opacity-0 shadow-[0_18px_36px_-16px_rgba(0,80,159,0.5)] will-change-transform"
              >
                <Image
                  src={encodeURI(`/homepage/${card.img}`)}
                  alt=""
                  fill
                  draggable={false}
                  sizes="320px"
                  className="pointer-events-none object-cover"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}