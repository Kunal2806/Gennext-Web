"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BookOpen, Clock, Compass, Cpu, Target, Users } from "lucide-react";
import Reveal from "@/components/Reveal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const stats = [
  { value: 294, label: "Happy Clients" },
  { value: 163, label: "Applications Developed" },
  { value: 117, label: "Corporate Trainings" },
  { value: 258, label: "Hired People" },
];

const reasons = [
  {
    icon: Users,
    title: "Customer Friendly",
    text: "We are because of our customers and we give utmost priority to our customer needs.",
  },
  {
    icon: Clock,
    title: "On Time Delivery",
    text: "Time is money. We ensure that our team does whatever is needed to deliver on time and on budget.",
  },
  {
    icon: Compass,
    title: "Knowledge Of Domain",
    text: "We understand our customer's domain before providing a solution.",
  },
  {
    icon: BookOpen,
    title: "Drive To Learn",
    text: "Our young and enthusiastic team is eager to learn new things, and we keep them trained on new skills.",
  },
  {
    icon: Cpu,
    title: "Technology Expertise",
    text: "Technology is changing at a lightning rate. We help our staff upgrade their skills on a regular basis.",
  },
  {
    icon: Target,
    title: "Focus On Quality",
    text: "We have set the right processes and compliance to ensure quality delivery each time.",
  },
];

const pairs = [0, 2, 4].map((s) =>
  reasons.slice(s, s + 2).map((r, k) => ({ ...r, i: s + k }))
);

export default function WhyChooseUs() {
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const rootEl = root.current;
      const gridEl = grid.current;
      if (!rootEl || !gridEl) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count);
          const obj = { v: 0 };
          el.textContent = "0";
          gsap.to(obj, {
            v: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = String(Math.round(obj.v));
            },
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-head]").forEach((el, i) => {
          gsap.fromTo(
            el,
            { y: 40, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              delay: Math.min(i, 5) * 0.08,
              ease: "power3.out",
              immediateRender: false,
              clearProps: "transform,opacity,visibility",
              scrollTrigger: { trigger: el, start: "top 95%", once: true },
            }
          );
        });


      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      id="why-us"
      ref={root}
      className="relative overflow-clip bg-background-light px-[5vw] py-24 lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-primary-dark/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-12">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <Reveal from="up">
            <div data-head className="flex items-center gap-3">
              <span className="h-0.5 w-10 bg-primary" />
              <span className="font-body text-xs font-bold uppercase tracking-[0.35em] text-slate-400">
                Why Gennext
              </span>
            </div>
          </Reveal>
          <Reveal from="up" delay={80}>
            <p
              data-head
              className="mt-6 max-w-md font-body text-lg leading-8 text-slate-500"
            >
              We trust in providing value added and optimized services to our
              customers and focus on quality, schedule and cost. It&apos;s our job
              to make the customer experience a little bit better.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10">
            {stats.map((s, index) => (
              <Reveal key={s.label} from="up" delay={index * 90}>
                <div
                  data-head
                  className="border-l-2 border-primary/30 pl-5"
                >
                  <p className="font-heading text-5xl font-extrabold text-primary-dark lg:text-6xl">
                    <span data-count={s.value}>{s.value}</span>
                    <span className="text-primary">+</span>
                  </p>
                  <p className="mt-2 font-body text-sm font-semibold text-slate-500">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div ref={grid} className="flex flex-col gap-8 pb-10 lg:col-span-7">
          {pairs.map((pair, p) => (
            <div
              key={p}
              style={{ top: `calc(7rem + ${p * 1.25}rem)` }}
              className="grid gap-5 bg-background-light sm:grid-cols-2 lg:sticky"
            >
              {pair.map(({ icon: Icon, title, text, i }) => (
                <Reveal key={title} from="up" delay={i * 60}>
                  <div
                    data-card
                    className="group relative min-h-72 overflow-hidden rounded-3xl border border-primary/10 bg-white p-7 shadow-[0_10px_40px_-15px_rgba(0,80,159,0.2)] transition-shadow duration-500 hover:shadow-[0_25px_60px_-15px_rgba(0,80,159,0.4)] lg:min-h-80"
                  >
                    <span className="absolute inset-0 bg-linear-to-br from-primary-dark to-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute right-6 top-4 font-heading text-6xl font-extrabold text-primary/10 transition-colors duration-500 group-hover:text-white/15">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="relative">
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-500 group-hover:bg-white/20 group-hover:text-white">
                        <Icon size={26} />
                      </span>
                      <h3 className="mt-6 font-heading text-xl font-bold text-primary-dark transition-colors duration-500 group-hover:text-white">
                        {title}
                      </h3>
                      <p className="mt-3 font-body text-sm leading-7 text-slate-500 transition-colors duration-500 group-hover:text-white/85">
                        {text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}