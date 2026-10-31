"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Modal from "@/components/Modal";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { useReducedMotion } from "@/components/useReducedMotion";

type Testimonial = {
  logo: string;
  text: string;
  author: string;
  role: string;
  fullText: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    logo: "woodigi.png",
    text: "Gennext are our sole IT partners in India, who have helped us managing our UAE based IT business effectively and efficiently.",
    author: "Vishwajeet Yadav",
    role: "Manager - Operations",
    fullText:
      "Gennext are our sole IT partners in India, who have helped us managing our UAE based IT business effectively and efficiently.",
  },
  {
    logo: "nmcgeneticslogo.png",
    text: "It is difficult to find people with both IT and Domain knowledge, with the help of GENNEXT IT team, we are now able to automate our genetic reporting software.",
    author: "Aman Kumar Sharma",
    role: "",
    fullText:
      "It is difficult to find people with both IT and Domain knowledge, with the help of GENNEXT IT team, we are now able to automate our genetic reporting software which has helped us to improve our productivity and accuracy by at least 20 times.",
  },
  {
    logo: "BDO_logo.png",
    text: "Gennext Team has always provided a professional and mature team to help us meet Niche IT Consulting requirements for our Elite Customers.",
    author: "Pankaj Gupta",
    role: "",
    fullText:
      "Gennext Team has always provided a professional and mature team to help us meet Niche IT Consulting requirements for our Elite Customers. They are trustworthy, reliable and have always delivered excellent quality.",
  },
  {
    logo: "monetLogo.png",
    text: "Gennext Team is very proactive in responding to our support requests and has been extremely helpful in providing quick turnaround of our queries.",
    author: "Arsal Shere",
    role: "",
    fullText:
      "Gennext Team is very proactive in responding to our support requests and has been extremely helpful in providing quick turnaround of our queries and regular maintenance requests.",
  },
  {
    logo: "lazerKen.png",
    text: "A professional team helped us in building our website as per our requirements and managed all our stakeholder requirements really well.",
    author: "Ajaya Khuller",
    role: "",
    fullText:
      "A professional team helped us in building our website as per our requirements and managed all our stakeholder requirements really well.",
  },
  {
    logo: "grantthortaon.png",
    text: "Gennext has provided professional IT consultancy to our customers and they have been our dependable partner of choice.",
    author: "Aashish Gupta",
    role: "",
    fullText:
      "Gennext has provided professional IT consultancy to our customers and they have been our dependable partner of choice for our IT Consulting requirements.",
  },
  {
    logo: "Venturacorp.png",
    text: "Venturacorp extends our sincere appreciation to Gennext for their dedicated service and team for continuous support with their IT solutions.",
    author: "Ashima Sharma",
    role: "",
    fullText:
      "Venturacorp extends our sincere appreciation to Gennext for their dedicated service and team for continuous support with their IT solutions including our website, social media marketing and much more.",
  },
  {
    logo: "synergy-consulting_0.png",
    text: "The team has been extremely swift and efficient. Their approach towards the project was well thought out and was followed to the T.",
    author: "Vaibhav",
    role: "",
    fullText:
      "The team has been extremely swift and efficient. Their approach towards the project was well thought out and was followed to the T which overall helped us to achieve what we wanted.",
  },
];

const VISIBLE = 3;

function TestimonialCard({ card }: { card: Testimonial }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <figure className="flex h-full min-h-88 flex-col rounded-3xl border border-primary/10 bg-white p-8 shadow-[0_10px_40px_-15px_rgba(0,80,159,0.2)] transition-shadow duration-500 hover:shadow-[0_25px_60px_-15px_rgba(0,80,159,0.4)]">
        <div className="mb-6 flex h-20 items-center">
          <Image
            src={`/clients/${card.logo}`}
            alt=""
            aria-hidden="true"
            width={150}
            height={80}
            style={{ width: "auto" }}
            className="max-h-16 w-auto object-contain"
          />
        </div>
        <blockquote className="mb-6 flex-1 font-body text-[15px] font-semibold leading-7 text-slate-500">
          &quot;{card.text}&quot;
        </blockquote>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Read the full testimonial from ${card.author}`}
          className="mb-6 cursor-pointer self-start rounded-full bg-linear-to-r from-primary-dark to-primary px-6 py-2.5 font-body text-sm font-bold text-white shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5"
        >
          Read more
        </button>
        <figcaption className="mt-auto border-t border-primary/10 pt-4">
          <span className="block font-heading text-base font-extrabold text-primary-dark">{card.author}</span>
          {card.role && <span className="block font-body text-xs font-bold text-slate-400">{card.role}</span>}
        </figcaption>
      </figure>

      <Modal open={open} onClose={close} title={`Testimonial from ${card.author}`}>
        <div className="flex flex-col items-center">
          <Image
            src={`/clients/${card.logo}`}
            alt=""
            aria-hidden="true"
            width={160}
            height={100}
            style={{ width: "auto" }}
            className="mb-4 max-h-15 w-auto object-contain"
          />
          <blockquote className="font-body text-sm font-semibold leading-7 text-slate-600">
            {card.fullText || card.text}
          </blockquote>
          <p className="mt-4 font-heading text-base font-extrabold text-primary-dark">{card.author}</p>
          {card.role && <p className="font-body text-xs font-bold text-slate-400">{card.role}</p>}
        </div>
      </Modal>
    </>
  );
}

export default function TestimonialsSection() {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reducedMotion || paused) return;
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(interval);
  }, [reducedMotion, paused, index]);

  const visible = Array.from({ length: VISIBLE }, (_, i) => TESTIMONIALS[(index + i) % TESTIMONIALS.length]);

  return (
    <section className="relative overflow-hidden bg-background-light px-[5vw] py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="mt-5 font-heading text-4xl font-extrabold text-primary-dark lg:text-5xl">
            See what they have to say
          </h2>
        </Reveal>

        <div
          className="mt-14"
          role="group"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((card, i) => (
              <TestimonialCard key={`${index}-${i}`} card={card} />
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-3">
          {TESTIMONIALS.map((t, idx) => (
            <button
              key={t.author}
              type="button"
              onClick={() => setIndex(idx)}
              aria-label={`Show testimonials starting with ${t.author}, ${idx + 1} of ${TESTIMONIALS.length}`}
              aria-current={idx === index ? "true" : undefined}
              className={`h-2.5 cursor-pointer rounded-full transition-all duration-300 ${
                idx === index ? "w-8 bg-primary-dark" : "w-2.5 bg-primary/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}