import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { CONTACT, OFFICES } from "@/lib/site";

export default function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-background-light px-[5vw] py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
        <Reveal from="left" className="lg:col-span-5">
          <SectionLabel>Get in touch</SectionLabel>
          <h2 className="mt-5 font-heading text-4xl font-extrabold leading-tight text-primary-dark lg:text-5xl">
            Contact Us
          </h2>
          <p className="mt-5 max-w-md font-body text-lg font-semibold leading-8 text-slate-500">
            Drop us a message and we will connect with you.
          </p>

          <div className="mt-10 flex flex-col gap-6 font-body text-sm font-semibold text-slate-600">
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 hover:text-primary-dark">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-r from-primary-dark to-primary text-white">
                <Mail size={18} aria-hidden />
              </span>
              {CONTACT.email}
            </a>
            <a href={CONTACT.phone.href} className="flex items-center gap-3 hover:text-primary-dark">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-r from-primary-dark to-primary text-white">
                <Phone size={18} aria-hidden />
              </span>
              {CONTACT.phone.label}
            </a>
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-primary-dark to-primary text-white">
                <MapPin size={18} aria-hidden />
              </span>
              <div className="flex flex-col gap-4">
                <address className="not-italic">
                  <span className="block font-heading font-extrabold text-primary-dark">{OFFICES.india.label}</span>
                  {OFFICES.india.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <address className="not-italic">
                  <span className="block font-heading font-extrabold text-primary-dark">{OFFICES.dubai.label}</span>
                  <span className="block">{OFFICES.dubai.entity}</span>
                  {OFFICES.dubai.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal from="right" className="lg:col-span-7">
          <div className="rounded-3xl border border-primary/10 bg-white p-8 shadow-[0_10px_40px_-15px_rgba(0,80,159,0.2)] lg:p-10">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}