"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronRight } from "lucide-react";
import Reveal from "@/components/Reveal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const stories = [
  {
    title: "Web Development & Maintenance",
    text: "From business websites to custom portals and ERP systems, we build them and keep them running smoothly.",
  },
  {
    title: "Mobile Applications",
    text: "Mobile apps for your customers and your team, built to be fast, simple and easy to use.",
  },
  {
    title: "And a lot more",
    text: "From IT strategy to audits and training, we help your business make the most of technology.",
    chips: [
      "IT Advisory & Consulting",
      "IT Audits (ITGC)",
      "Cyber Security",
      "ISO 27001 Gap Analysis",
      "Digital Transformation",
      "Corporate Training",
    ],
  },
];

const W = () => window.innerWidth;
const H = () => window.innerHeight;

const shapes = {
  laptop: {
    x: () => -W() * 0.28,
    y: () => 0,
    width: () => W() * 0.42,
    height: () => W() * 0.26,
    r: () => 14,
  },
  zoom: {
    x: () => 0,
    y: () => H() * 0.04,
    width: () => W() * 0.86,
    height: () => H() * 0.74,
    r: () => 18,
  },
  tablet: {
    x: () => -W() * 0.2,
    y: () => 0,
    width: () => H() * 0.62 * 0.74,
    height: () => H() * 0.62,
    r: () => 30,
  },
  phone: {
    x: () => -W() * 0.2,
    y: () => 0,
    width: () => H() * 0.7 * 0.48,
    height: () => H() * 0.7,
    r: () => 44,
  },
};

type Shape = (typeof shapes)["laptop"];

export default function AboutSection() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const device = useRef<HTMLDivElement>(null);
  const screenText = useRef<HTMLDivElement>(null);
  const cardWrap = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const pinEl = pin.current;
      const deviceEl = device.current;
      const screenTextEl = screenText.current;
      const cardWrapEl = cardWrap.current;
      const screenEl = deviceEl?.querySelector<HTMLElement>("[data-screen]");
      if (!pinEl || !deviceEl || !screenTextEl || !cardWrapEl || !screenEl) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const items = gsap.utils.toArray<HTMLElement>("[data-story]");
          gsap.set(deviceEl, { xPercent: -50, yPercent: -50 });
          gsap.set(items, { autoAlpha: 0, y: 30 });
          gsap.set(screenTextEl, { autoAlpha: 0, y: 20 });

          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              trigger: pinEl,
              start: "top top",
              end: () => "+=" + window.innerHeight * 3,
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              snap: {
                snapTo: "labels",
                duration: { min: 0.2, max: 0.5 },
                delay: 0.08,
                ease: "power1.inOut",
              },
              invalidateOnRefresh: true,
            },
          });

          const props = (s: Shape) => ({
            x: s.x,
            y: s.y,
            width: s.width,
            height: s.height,
            borderRadius: s.r,
          });

          const morph = (s: Shape, at: number, duration: number) => {
            tl.to(deviceEl, { ...props(s), duration }, at);
            tl.to(
              screenEl,
              { borderRadius: () => s.r() - 8, duration },
              at
            );
          };

          tl.to(cardWrapEl, { autoAlpha: 0, x: 80, duration: 1 }, 0);
          tl.fromTo(
            deviceEl,
            props(shapes.laptop),
            { ...props(shapes.zoom), duration: 1.6 },
            0
          );
          tl.fromTo(
            screenEl,
            { borderRadius: () => shapes.laptop.r() - 8 },
            { borderRadius: () => shapes.zoom.r() - 8, duration: 1.6 },
            0
          );
          tl.addLabel("start", 0);
          tl.to(screenTextEl, { autoAlpha: 1, y: 0, duration: 0.5 }, 1);
          tl.addLabel("web", 1.6);
          tl.to({}, { duration: 0.6 }, 1.6);

          tl.to(screenTextEl, { autoAlpha: 0, duration: 0.4 }, 2.2);
          morph(shapes.tablet, 2.2, 1.4);
          tl.to(items[0], { autoAlpha: 1, y: 0, duration: 0.5 }, 2.9);
          tl.addLabel("tablet", 3.6);
          tl.to({}, { duration: 0.6 }, 3.6);

          tl.to(items[0], { autoAlpha: 0, y: -30, duration: 0.4 }, 4.2);
          morph(shapes.phone, 4.2, 1.4);
          tl.to(items[1], { autoAlpha: 1, y: 0, duration: 0.5 }, 4.9);
          tl.addLabel("phone", 5.6);
          tl.to({}, { duration: 0.6 }, 5.6);

          tl.to(items[1], { autoAlpha: 0, y: -30, duration: 0.4 }, 6.2);
          tl.to(items[2], { autoAlpha: 1, y: 0, duration: 0.5 }, 6.4);
          tl.addLabel("more", 6.9);
          tl.to({}, { duration: 0.1 }, 6.9);
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="about" ref={root} className="bg-white">
      <div
        ref={pin}
        className="relative overflow-hidden bg-linear-to-b from-white to-background-light lg:h-screen"
      >
        <div
          ref={device}
          className="absolute left-1/2 top-1/2 z-10 hidden overflow-hidden bg-white p-2 shadow-[0_30px_80px_-20px_rgba(0,80,159,0.35)] lg:motion-safe:block"
        >
          <div
            data-screen
            className="relative h-full w-full overflow-hidden bg-linear-to-br from-primary via-[#8f86e0] to-[#ec7fbf]"
          >
            <div className="flex items-center gap-2 px-5 pt-4">
              <span className="h-1.5 w-8 rounded-full bg-white/80" />
              <span className="ml-auto h-1.5 w-6 rounded-full bg-white/60" />
              <span className="h-1.5 w-6 rounded-full bg-white/60" />
              <span className="h-1.5 w-6 rounded-full bg-white/60" />
            </div>
            <div className="absolute inset-x-[6%] bottom-[8%] grid h-[22%] grid-cols-3 gap-[3%]">
              <span className="rounded-lg bg-white/80" />
              <span className="rounded-lg bg-white/80" />
              <span className="rounded-lg bg-white/80" />
            </div>
            <div
              ref={screenText}
              className="absolute inset-0 flex flex-col items-center justify-center px-8 pb-[16%] text-center text-white"
            >
              <h3 className="font-heading text-3xl font-extrabold lg:text-5xl">
                Web Application Development
              </h3>
              <p className="mt-4 max-w-md font-body text-base font-semibold lg:text-lg">
                We design, build and maintain websites and web applications around your business.
              </p>
            </div>
          </div>
        </div>

        <div
          ref={cardWrap}
          className="relative z-20 lg:motion-safe:absolute lg:motion-safe:inset-y-0 lg:motion-safe:right-[8vw] lg:motion-safe:flex lg:motion-safe:w-[46vw] lg:motion-safe:items-center"
        >
          <div
            aria-hidden
            className="absolute -right-10 -top-12 -z-10 h-56 w-72"
            style={{
              backgroundImage:
                "radial-gradient(circle, #008EFA 3px, transparent 3.5px)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="relative w-full bg-white px-[8vw] py-16 shadow-[0_0_80px_rgba(0,142,250,0.12)] lg:px-[4vw] lg:py-[8vh]">
            <Reveal from="up">
              <p className="font-body text-sm font-bold uppercase tracking-[0.4em] text-slate-400">
                Get to know us
              </p>
              <span className="mt-3 block h-0.5 w-10 bg-slate-300" />
            </Reveal>
            <Reveal from="up" delay={80}>
              <h2 className="mt-6 font-heading text-4xl font-semibold text-primary-dark lg:text-5xl">
                About Us
              </h2>
            </Reveal>
            <Reveal from="up" delay={140}>
              <p className="mt-5 text-justify font-body text-base font-light leading-8 text-slate-500">
                Gennext is an emerging leader of next-generation Information
                Technology (IT) services and solutions. Our mission is to provide
                innovative solutions to our customers through best-in-class
                technology and industry solutions. We leverage our domain
                expertise to deliver value for money.
              </p>
            </Reveal>
            <Reveal from="up" delay={200}>
              <a
                href="#services"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-primary to-primary-dark px-8 py-4 font-body font-semibold text-white shadow-lg shadow-primary/30"
              >
                Read More
                <ChevronRight size={18} />
              </a>
            </Reveal>
          </div>
        </div>

        <div className="relative z-20 px-[8vw] pb-16 lg:motion-safe:absolute lg:motion-safe:inset-y-0 lg:motion-safe:right-[8vw] lg:motion-safe:flex lg:motion-safe:w-[34vw] lg:motion-safe:items-center lg:motion-safe:p-0">
          <div className="relative w-full lg:motion-safe:h-72">
            {stories.map((s, idx) => (
              <Reveal key={s.title} from="up" delay={idx * 100}>
                <div
                  data-story
                  className="mb-10 lg:motion-safe:invisible lg:motion-safe:absolute lg:motion-safe:inset-x-0 lg:motion-safe:top-0 lg:motion-safe:mb-0"
                >
                  <h3 className="font-heading text-4xl font-extrabold text-primary-dark">
                    {s.title}
                  </h3>
                  <p className="mt-4 font-body text-lg text-slate-600">
                    {s.text}
                  </p>
                  {s.chips && (
                    <ul className="mt-6 flex flex-wrap gap-3">
                      {s.chips.map((c) => (
                        <li
                          key={c}
                          className="rounded-full border border-primary/30 bg-background-light px-4 py-2 font-body text-sm font-semibold text-primary-dark"
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}