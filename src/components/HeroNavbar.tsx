"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { Briefcase, GraduationCap, Info, Mail, Phone } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

const links = [
  { label: "About Us", href: "#about", icon: Info },
  { label: "Training", href: "#training", icon: GraduationCap },
  { label: "Services", href: "#services", icon: Briefcase },
  { label: "Contact Us", href: "#contact", icon: Mail },
];

const phoneText = "+91-78400 78095";
const phoneHref = "tel:+917840078095";

function PhoneLink() {
  return (
    <a
      href={phoneHref}
      className="flex items-center gap-2 font-body text-sm font-bold"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-r from-primary-dark to-primary text-white">
        <Phone size={16} />
      </span>
      {phoneText}
    </a>
  );
}

const startOffset = (
  el: HTMLElement,
  anchor: HTMLElement,
  edge: "left" | "right"
) => {
  const calc = () => {
    const a = anchor.getBoundingClientRect();
    const e = el.getBoundingClientRect();
    const cx = gsap.getProperty(el, "x") as number;
    const cy = gsap.getProperty(el, "y") as number;
    return {
      x: a[edge] - (e[edge] - cx),
      y: a.top + window.scrollY - (e.top - cy),
    };
  };
  return { x: () => calc().x, y: () => calc().y };
};

export default function HeroNavbar() {
  const root = useRef<HTMLDivElement>(null);
  const h1 = useRef<HTMLHeadingElement>(null);
  const line1 = useRef<HTMLSpanElement>(null);
  const line2 = useRef<HTMLSpanElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const phone = useRef<HTMLDivElement>(null);
  const phoneAnchor = useRef<HTMLDivElement>(null);
  const nav = useRef<HTMLElement>(null);
  const sideMenu = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const h1El = h1.current;
      const line1El = line1.current;
      const line2El = line2.current;
      const logoEl = logo.current;
      const phoneEl = phone.current;
      const phoneAnchorEl = phoneAnchor.current;
      const navEl = nav.current;
      const sideMenuEl = sideMenu.current;
      if (
        !h1El ||
        !line1El ||
        !line2El ||
        !logoEl ||
        !phoneEl ||
        !phoneAnchorEl ||
        !navEl ||
        !sideMenuEl
      ) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.set(logoEl, { autoAlpha: 0 });
          let morph = { dx1: 0, hcy1: 0, lcy: 0, sc: 1, end: 1 };

          const phoneStart = startOffset(phoneEl, phoneAnchorEl, "left");
          const setPhoneColor = (p: number) => {
            phoneEl.style.color = `color-mix(in srgb, var(--color-primary-dark) ${
              p * 100
            }%, white)`;
          };
          setPhoneColor(0);
          gsap.fromTo(
            phoneEl,
            { x: phoneStart.x, y: phoneStart.y },
            {
              x: 0,
              y: 0,
              ease: "none",
              scrollTrigger: {
                start: 0,
                end: () => "+=" + Math.max(phoneStart.y(), 1),
                scrub: true,
                invalidateOnRefresh: true,
                onUpdate: (self) => setPhoneColor(self.progress),
                onRefresh: (self) => setPhoneColor(self.progress),
              },
            }
          );

          const items = Array.from(
            navEl.querySelectorAll<HTMLElement>("[data-nav-item]")
          );
          const anchors = Array.from(sideMenuEl.children) as HTMLElement[];
          const bg = navEl.querySelector<HTMLElement>("[data-nav-bg]");
          const lineEl = sideMenuEl.querySelector<HTMLElement>("[data-line]");
          const borderEl =
            navEl.querySelector<SVGRectElement>("[data-nav-border]");
          const slide = 60;
          const lead = 44;
          const labels = items.map((el) =>
            el.querySelector<HTMLElement>("[data-label]")
          );
          const icons = items.map((el) =>
            el.querySelector<HTMLElement>("[data-icon]")
          );
          const rings = items.map((el) =>
            el.querySelector<HTMLElement>("[data-ring]")
          );
          let begins: number[] = [];
          let startX: number[] = [];
          let stackX: number[][] = [];
          let barOn = false;

          const prog = (s: number, b: number) =>
            Math.min(Math.max((s - b) / slide, 0), 1);

          const measure = () => {
            gsap.set(items, { x: 0, y: 0 });
            gsap.set([line1El, line2El], { x: 0, y: 0, scale: 1 });
            const r1 = line1El.getBoundingClientRect();
            const lr = logoEl.getBoundingClientRect();
            const lcx = lr.left + lr.width / 2;
            const lcy = lr.top + lr.height / 2;
            const hcy1 = r1.top + window.scrollY + r1.height / 2;
            morph = {
              dx1: lcx - (r1.left + r1.width / 2),
              hcy1,
              lcy,
              sc: Math.min(lr.width / r1.width, lr.height / r1.height),
              end: Math.max(hcy1 - lcy, 1),
            };
            if (borderEl) {
              const bw = navEl.offsetWidth + 24 - 2;
              const bh = navEl.offsetHeight + 16 - 2;
              borderEl.setAttribute("width", String(bw));
              borderEl.setAttribute("height", String(bh));
              borderEl.setAttribute("rx", String(bh / 2));
              borderEl.setAttribute("ry", String(bh / 2));
            }
            const rects = items.map((el) => el.getBoundingClientRect());
            const n = items.length;
            const gap = n > 1 ? rects[1].left - rects[0].right : 0;
            const endRight = rects[n - 1].right;
            begins = [];
            startX = [];
            stackX = [];
            items.forEach((_, j) => {
              const a = anchors[j].getBoundingClientRect();
              const r = rects[j];
              begins.push(
                Math.max(
                  a.top + a.height / 2 + window.scrollY - (r.top + r.height / 2),
                  0
                )
              );
              startX.push(a.left + a.width / 2 - (r.left + r.width / 2));
              stackX.push([]);
              for (let k = 0; k <= n; k++) {
                let right = endRight;
                for (let m = j + 1; m < k; m++) right -= rects[m].width + gap;
                stackX[j][k] = right - r.width / 2 - (r.left + r.width / 2);
              }
            });
          };

          const update = (s: number) => {
            const n = items.length;
            const mp = Math.min(Math.max(s / morph.end, 0), 1);
            const mq = Math.min(Math.max((s - morph.end) / 140, 0), 1);
            const fade = Math.min(Math.max(s / (morph.end * 0.5), 0), 1);
            gsap.set(line1El, {
              x: morph.dx1 * mp,
              y: mp * (morph.lcy - (morph.hcy1 - s)),
              scale: 1 + (morph.sc - 1) * mp,
              opacity: 1 - mq,
              filter: `blur(${mq * 4}px)`,
            });
            gsap.set(line2El, {
              opacity: 1 - fade,
              filter: `blur(${fade * 6}px)`,
            });
            gsap.set(logoEl, {
              autoAlpha: mq,
              filter: `blur(${(1 - mq) * 4}px)`,
            });
            items.forEach((item, j) => {
              let x =
                startX[j] +
                (stackX[j][j + 1] - startX[j]) * prog(s, begins[j]);
              for (let i = j + 1; i < n; i++) {
                x +=
                  (stackX[j][i + 1] - stackX[j][i]) *
                  prog(s, begins[i] - lead - slide);
              }
              gsap.set(item, { x, y: Math.max(begins[j] - s, 0) });
              const f = prog(s, begins[j]);
              gsap.set(labels[j], {
                opacity: Math.min(Math.max((f - 0.4) / 0.6, 0), 1),
              });
              gsap.set(icons[j], { opacity: 1 - Math.min(f / 0.5, 1) });
              gsap.set(rings[j], { opacity: 1 - Math.min(f / 0.5, 1) });
            });
            const bq = Math.min(
              Math.max(
                (s - begins[0]) / Math.max(begins[n - 1] + slide - begins[0], 1),
                0
              ),
              1
            );
            if (borderEl) gsap.set(borderEl, { strokeDashoffset: 1 - bq });
            if (lineEl) gsap.set(lineEl, { opacity: 1 - bq });
            const shouldShow = s >= begins[n - 1] + slide;
            if (bg && shouldShow !== barOn) {
              barOn = shouldShow;
              gsap.to(bg, {
                autoAlpha: shouldShow ? 1 : 0,
                duration: 0.3,
                overwrite: true,
              });
            }
          };

          if (bg) gsap.set(bg, { autoAlpha: 0 });
          measure();
          update(window.scrollY);

          const onRefresh = () => update(window.scrollY);
          ScrollTrigger.addEventListener("refreshInit", measure);
          ScrollTrigger.addEventListener("refresh", onRefresh);
          ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => update(self.scroll()),
          });

          document.fonts.ready.then(() => {
            ScrollTrigger.refresh();
            gsap.set([phoneEl, navEl], { visibility: "visible" });
          });

          let animating = false;
          let tween: gsap.core.Tween | undefined;

          const aboutTop = () => {
            const el = document.getElementById("about");
            return el ? el.getBoundingClientRect().top + window.scrollY : 0;
          };

          const goTo = (y: number) => {
            tween?.kill();
            animating = true;
            const distance = Math.abs(y - window.scrollY);
            tween = gsap.to(window, {
              scrollTo: { y, autoKill: false },
              duration: Math.min(Math.max(distance / 500, 1), 2.2),
              ease: "power1.inOut",
              onComplete: () => {
                animating = false;
              },
            });
          };

          const decide = (down: boolean) => {
            const s = window.scrollY;
            const end = aboutTop();
            if (down && s < end - 2) {
              goTo(end);
              return true;
            }
            if (!down && s > 2 && s <= end + 2) {
              goTo(0);
              return true;
            }
            return false;
          };

          const onWheel = (e: WheelEvent) => {
            if (e.ctrlKey) return;
            if (animating) {
              e.preventDefault();
              return;
            }
            if (e.deltaY === 0) return;
            if (decide(e.deltaY > 0)) e.preventDefault();
          };

          const onKey = (e: KeyboardEvent) => {
            const t = e.target as HTMLElement | null;
            if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
            const down = ["ArrowDown", "PageDown", " "].includes(e.key);
            const up = ["ArrowUp", "PageUp"].includes(e.key);
            if (!down && !up) return;
            if (animating) {
              e.preventDefault();
              return;
            }
            if (decide(down)) e.preventDefault();
          };

          const onNavClick = (e: MouseEvent) => {
            const a = e.currentTarget as HTMLAnchorElement;
            const id = a.getAttribute("href")?.slice(1);
            const target = id ? document.getElementById(id) : null;
            if (!target) return;
            e.preventDefault();
            goTo(target.getBoundingClientRect().top + window.scrollY);
          };

          items.forEach((el) => el.addEventListener("click", onNavClick));
          window.addEventListener("wheel", onWheel, { passive: false });
          window.addEventListener("keydown", onKey);

          return () => {
            phoneEl.style.color = "";
            tween?.kill();
            items.forEach((el) => el.removeEventListener("click", onNavClick));
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("keydown", onKey);
            ScrollTrigger.removeEventListener("refreshInit", measure);
            ScrollTrigger.removeEventListener("refresh", onRefresh);
          };
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[5vw] py-4">
        <div className="flex items-center gap-6">
          <div
            ref={logo}
            className="pointer-events-auto origin-left lg:motion-safe:invisible"
          >
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Gennext"
                width={160}
                height={48}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>
          <div
            ref={phone}
            className="pointer-events-auto hidden text-primary-dark sm:block lg:motion-safe:invisible"
          >
            <PhoneLink />
          </div>
        </div>

        <nav
          ref={nav}
          className="pointer-events-auto relative hidden items-center gap-1 p-1.5 lg:flex lg:motion-safe:invisible"
        >
          <div
            data-nav-bg
            className="absolute -inset-x-3 -inset-y-2 -z-10 rounded-full bg-linear-to-r from-primary-dark to-primary"
          />
          <svg
            aria-hidden
            className="pointer-events-none absolute -left-3 -top-2 -z-10 h-[calc(100%+1rem)] w-[calc(100%+1.5rem)] overflow-visible"
          >
            <rect
              data-nav-border
              x="1"
              y="1"
              pathLength={1}
              fill="none"
              stroke="white"
              strokeWidth="2"
              style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
            />
          </svg>
          {links.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              data-nav-item
              aria-label={label}
              className="relative block font-body text-sm font-bold drop-shadow-md"
            >
              <span
                data-ring
                className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-primary-dark"
              />
              <span className="block px-4 py-2 text-white">
                <span data-label className="block">
                  {label}
                </span>
              </span>
              <span
                data-icon
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0"
              >
                <Icon size={16} />
              </span>
            </a>
          ))}
        </nav>
      </header>

      <section className="relative h-screen min-h-[640px] overflow-hidden">
        <Image
          src="/hero-banner01.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="relative z-10 flex h-full max-w-2xl flex-col justify-center px-[5vw]">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-0.5 w-10 bg-primary" />
            <span className="font-body text-[11px] font-bold uppercase tracking-widest text-white">
              Empowering a smarter tomorrow
            </span>
          </div>

          <h1
            ref={h1}
            className="w-fit origin-center font-heading text-4xl font-extrabold leading-tight text-white lg:text-6xl"
          >
            <span
              ref={line1}
              className="relative z-10 block w-fit origin-center text-white"
            >
              Gennext IT
            </span>
            <span ref={line2} className="relative block w-fit origin-center">
              Management &amp; Consulting
            </span>
          </h1>

          <p className="mt-5 max-w-md font-body text-base font-semibold text-white">
            We are a trusted IT training, consulting, and managed services
            company, helping individuals and businesses build the skills,
            solutions, and technologies for a smarter, more successful tomorrow.
          </p>

          <div
            ref={phoneAnchor}
            aria-hidden
            className="invisible mt-6 hidden lg:block motion-reduce:hidden"
          >
            <PhoneLink />
          </div>
        </div>

        <div
          ref={sideMenu}
          aria-hidden
          className="invisible absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-14 lg:flex motion-reduce:hidden"
        >
          {links.map(({ label }) => (
            <span key={label} className="h-9 w-9" />
          ))}
          <span
            data-line
            className="visible absolute bottom-[18px] left-1/2 top-[18px] w-0.5 -translate-x-1/2 rounded-full bg-white"
          />
        </div>
      </section>
    </div>
  );
}