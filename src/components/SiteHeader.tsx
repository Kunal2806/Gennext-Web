"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { CONTACT, SERVICE_GROUPS } from "@/lib/site";

const NAV_ITEM =
  "rounded-full px-5 py-2 font-body text-sm font-bold text-white transition-colors hover:bg-white/15";

export default function SiteHeader() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const closeAll = useCallback(() => {
    setServicesOpen(false);
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAll();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [closeAll]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-[5vw] py-3">
        <div className="flex items-center gap-6">
          <Link href="/" aria-label="Gennext IT home" onClick={closeAll}>
            <Image src="/logo.png" alt="Gennext" width={160} height={48} priority className="h-10 w-auto" />
          </Link>
          <a
            href={CONTACT.phone.href}
            className="hidden items-center gap-2 font-body text-sm font-bold text-primary-dark xl:flex"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-r from-primary-dark to-primary text-white">
              <Phone size={16} aria-hidden />
            </span>
            {CONTACT.phone.label}
          </a>
        </div>

        <nav
          aria-label="Main"
          onClick={closeAll}
          className="hidden items-center gap-1 rounded-full bg-linear-to-r from-primary-dark to-primary p-1.5 shadow-lg shadow-primary/25 lg:flex"
        >
          <Link href="/about" className={NAV_ITEM}>
            About Us
          </Link>
          <Link href="/training" className={NAV_ITEM}>
            Training
          </Link>
          <div
            ref={servicesRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={(event) => {
                event.stopPropagation();
                setServicesOpen((open) => !open);
              }}
              className={`${NAV_ITEM} flex items-center gap-1.5`}
            >
              Services
              <ChevronDown
                size={14}
                aria-hidden
                className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div id={menuId} hidden={!servicesOpen} className="absolute right-0 top-full w-88 pt-3">
              <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-[0_25px_60px_-15px_rgba(0,80,159,0.35)]">
                {SERVICE_GROUPS.map((group) => (
                  <div key={group.heading} className="mb-4 last:mb-0">
                    <p className="font-heading text-xs font-extrabold uppercase tracking-[0.2em] text-primary">
                      {group.heading}
                    </p>
                    <ul className="mt-2 flex flex-col">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="block rounded-lg py-1.5 font-body text-sm font-semibold text-slate-600 transition-colors hover:text-primary-dark"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Link href="/contact" className={NAV_ITEM}>
            Contact Us
          </Link>
        </nav>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-primary-dark to-primary text-white lg:hidden"
        >
          {mobileOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
      </div>

      {mobileOpen && (
        <div
          onClick={closeAll}
          className="fixed inset-x-0 bottom-0 top-16.5 overflow-y-auto bg-white px-[5vw] py-6 lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1 font-body font-bold text-primary-dark">
            <Link href="/about" className="rounded-xl px-3 py-3 hover:bg-background-light">
              About Us
            </Link>
            <Link href="/training" className="rounded-xl px-3 py-3 hover:bg-background-light">
              Training
            </Link>
            <Link href="/contact" className="rounded-xl px-3 py-3 hover:bg-background-light">
              Contact Us
            </Link>
            {SERVICE_GROUPS.map((group) => (
              <div key={group.heading} className="mt-4 px-3">
                <p className="font-heading text-xs font-extrabold uppercase tracking-[0.2em] text-primary">
                  {group.heading}
                </p>
                <ul className="mt-1">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="block py-2 text-sm font-semibold text-slate-600">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <a href={CONTACT.phone.href} className="mt-6 flex items-center gap-2 px-3 text-sm text-primary-dark">
              <Phone size={16} aria-hidden /> {CONTACT.phone.label}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}