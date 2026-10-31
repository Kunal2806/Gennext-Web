import Link from "next/link";
import { ArrowRight, CalendarDays, GraduationCap, Building2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";

const PLANS = [
  {
    icon: CalendarDays,
    title: "Weekends",
    text: "5 weeks of web development on Saturday and Sunday for students who want to use their weekends well.",
    cost: "Rs 20,000",
  },
  {
    icon: GraduationCap,
    title: "Weekdays",
    text: "4 weeks on Monday, Wednesday and Friday for students who can spend time during weekdays.",
    cost: "Rs 20,000",
  },
  {
    icon: Building2,
    title: "On premises",
    text: "A detailed programme with placement assistance, taught by faculty from industry.",
    cost: "Rs 1,50,000",
  },
];

export default function TrainingSection() {
  return (
    <section id="training" className="relative overflow-hidden bg-background-light px-[5vw] py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-primary-dark/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>Training</SectionLabel>
          <h2 className="mt-5 max-w-3xl font-heading text-4xl font-extrabold leading-tight text-primary-dark lg:text-5xl">
            Campus to Corporate Program
          </h2>
          <p className="mt-5 max-w-2xl font-body text-lg font-semibold leading-8 text-slate-500">
            Learn HTML5, CSS, Bootstrap, JavaScript, MySQL, PHP and Git from people who hire and mentor
            developers, and work on live projects.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PLANS.map(({ icon: Icon, title, text, cost }, i) => (
            <Reveal key={title} delay={i * 100}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-primary/10 bg-white p-8 shadow-[0_10px_40px_-15px_rgba(0,80,159,0.2)] transition-shadow duration-500 hover:shadow-[0_25px_60px_-15px_rgba(0,80,159,0.4)]">
                <span className="absolute inset-0 bg-linear-to-br from-primary-dark to-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-500 group-hover:bg-white/20 group-hover:text-white">
                    <Icon size={26} aria-hidden />
                  </span>
                  <h3 className="mt-6 font-heading text-xl font-bold text-primary-dark transition-colors duration-500 group-hover:text-white">
                    {title}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-7 text-slate-500 transition-colors duration-500 group-hover:text-white/85">
                    {text}
                  </p>
                  <p className="mt-6 font-heading text-2xl font-extrabold text-primary-dark transition-colors duration-500 group-hover:text-white">
                    {cost}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <Link
            href="/training"
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-primary-dark to-primary px-8 py-3.5 font-body text-sm font-bold text-white shadow-lg shadow-primary/30 transition-transform hover:-translate-y-0.5"
          >
            View programme and register <ArrowRight size={16} aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}