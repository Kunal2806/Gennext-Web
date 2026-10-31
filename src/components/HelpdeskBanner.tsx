import { ArrowRight, Headset } from "lucide-react";
import Reveal from "@/components/Reveal";
import { HELPDESK_URL } from "@/lib/site";

export function HelpdeskFloat() {
  return (
    <a
      href={HELPDESK_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open Helpdesk — raise issues, queries or feature requests"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full bg-linear-to-r from-primary-dark to-primary px-5 py-3 font-body text-sm font-bold text-white shadow-[0_6px_24px_rgba(0,80,159,0.45)] transition-transform hover:scale-105 active:scale-95"
    >
      <Headset size={18} aria-hidden />
      Helpdesk
    </a>
  );
}

export default function HelpdeskBanner() {
  return (
    <section className="relative overflow-hidden bg-linear-to-r from-primary-dark to-primary px-[5vw] py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#fff_1px,transparent_1px)] bg-size-[22px_22px] opacity-[0.07]"
      />
      <Reveal>
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex flex-col items-center gap-5 md:flex-row">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
              <Headset size={30} aria-hidden />
            </span>
            <div>
              <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-white/70">
                Support &amp; Assistance
              </p>
              <h2 className="mt-1 font-heading text-2xl font-extrabold text-white lg:text-3xl">
                Helpdesk — a single place to raise your issues, queries &amp; feature requests
              </h2>
            </div>
          </div>
          <a
            href={HELPDESK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-8 py-3.5 font-body text-sm font-bold text-primary-dark shadow-[0_4px_20px_rgba(0,0,0,0.18)] transition-transform hover:-translate-y-0.5"
          >
            Raise a Ticket <ArrowRight size={16} aria-hidden />
          </a>
        </div>
      </Reveal>
    </section>
  );
}