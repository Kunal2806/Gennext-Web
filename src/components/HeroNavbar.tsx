"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { Briefcase, GraduationCap, House, Mail, Phone } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

const links = [
  { label: "About Us", href: "#about", icon: House },
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
      className="flex items-center gap-2 font-body text-sm font-bold text-primary-dark"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary">
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
          let morph = { dx1: 0, dx2: 0, hcy1: 0, hcy2: 0, lcy: 0, sc: 1, end: 1 };

          const phoneStart = startOffset(phoneEl, phoneAnchorEl, "left");
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
              },
            }
          );

          const items = Array.from(
            navEl.querySelectorAll<HTMLElement>("[data-nav-item]")
          );
          const anchors = Array.from(sideMenuEl.children) as HTMLElement[];
          const bg = navEl.querySelector<HTMLElement>("[data-nav-bg]");
          const slide = 60;
          const lead = 44;
          const pills = items.map((el) =>
            el.querySelector<HTMLElement>("[data-pill]")
          );
          const labels = items.map((el) =>
            el.querySelector<HTMLElement>("[data-label]")
          );
          const icons = items.map((el) =>
            el.querySelector<HTMLElement>("[data-icon]")
          );
          let sizes: { w: number; h: number }[] = [];
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
            const r2 = line2El.getBoundingClientRect();
            const lr = logoEl.getBoundingClientRect();
            const lcx = lr.left + lr.width / 2;
            const lcy = lr.top + lr.height / 2;
            const hcy1 = r1.top + window.scrollY + r1.height / 2;
            morph = {
              dx1: lcx - (r1.left + r1.width / 2),
              dx2: lcx - (r2.left + r2.width / 2),
              hcy1,
              hcy2: r2.top + window.scrollY + r2.height / 2,
              lcy,
              sc: Math.min(lr.width / r1.width, lr.height / r1.height),
              end: Math.max(hcy1 - lcy, 1),
            };
            const rects = items.map((el) => el.getBoundingClientRect());
            const n = items.length;
            const gap = n > 1 ? rects[1].left - rects[0].right : 0;
            const endRight = rects[n - 1].right;
            sizes = rects.map((r) => ({ w: r.width, h: r.height }));
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
            const sink = Math.min(Math.max((mp - 0.45) / 0.55, 0), 1);
            gsap.set(line1El, {
              x: morph.dx1 * mp,
              y: mp * (morph.lcy - (morph.hcy1 - s)),
              scale: 1 + (morph.sc - 1) * mp,
              opacity: 1 - mq,
              filter: `blur(${mq * 4}px)`,
            });
            gsap.set(line2El, {
              x: morph.dx2 * mp,
              y: mp * (morph.lcy - (morph.hcy2 - s)),
              scale: 1 + (morph.sc - 1) * mp,
              opacity: 1 - sink,
              filter: `blur(${sink * 6}px)`,
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
              const inset = ((sizes[j].w - sizes[j].h) / 2) * (1 - f);
              gsap.set(pills[j], {
                clipPath: `inset(0px ${inset}px 0px ${inset}px round 999px)`,
              });
              gsap.set(labels[j], {
                opacity: Math.min(Math.max((f - 0.4) / 0.6, 0), 1),
              });
              gsap.set(icons[j], { opacity: 1 - Math.min(f / 0.5, 1) });
            });
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

          let animating = false;
          let locked = false;
          let lastWheel = 0;
          let tween: gsap.core.Tween | undefined;

          const aboutTop = () => {
            const el = document.getElementById("about");
            return el ? el.getBoundingClientRect().top + window.scrollY : 0;
          };

          const goTo = (y: number) => {
            animating = true;
            const distance = Math.abs(y - window.scrollY);
            tween = gsap.to(window, {
              scrollTo: { y, autoKill: false },
              duration: Math.min(Math.max(distance / 500, 1), 2.2),
              ease: "power1.inOut",
              onComplete: () => {
                animating = false;
                locked = true;
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
            const now = performance.now();
            const gap = now - lastWheel;
            lastWheel = now;
            if (animating) {
              e.preventDefault();
              return;
            }
            if (locked) {
              if (gap < 120) {
                e.preventDefault();
                return;
              }
              locked = false;
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

          window.addEventListener("wheel", onWheel, { passive: false });
          window.addEventListener("keydown", onKey);

          return () => {
            tween?.kill();
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("keydown", onKey);
            ScrollTrigger.removeEventListener("refreshInit", measure);
            ScrollTrigger.removeEventListener("refresh", onRefresh);
          };
        }
      );

      document.fonts.ready.then(() => ScrollTrigger.refresh());

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[5vw] py-4">
        <div className="flex items-center gap-6">
          <div ref={logo} className="pointer-events-auto origin-left">
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
          <div ref={phone} className="pointer-events-auto hidden sm:block">
            <PhoneLink />
          </div>
        </div>

        <nav
          ref={nav}
          className="pointer-events-auto relative hidden items-center gap-1 p-1.5 lg:flex"
        >
          <div
            data-nav-bg
            className="absolute inset-0 -z-10 rounded-full bg-primary-dark"
          />
          {links.map(({ label, href, icon: Icon }, i) => (
            <a
              key={label}
              href={href}
              data-nav-item
              aria-label={label}
              className="relative block font-body text-sm font-bold drop-shadow-md"
            >
              <span
                data-pill
                className={`block rounded-full px-4 py-2 ${
                  i === links.length - 1
                    ? "bg-white text-primary"
                    : "bg-primary text-white"
                }`}
              >
                <span data-label className="block">
                  {label}
                </span>
              </span>
              <span
                data-icon
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 ${
                  i === links.length - 1 ? "text-primary" : "text-white"
                }`}
              >
                <Icon size={16} />
              </span>
            </a>
          ))}
        </nav>
      </header>

      <section className="relative h-screen min-h-[640px] overflow-hidden">
        <Image
          src="/hero-banner.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="relative z-10 flex h-full max-w-2xl flex-col justify-center px-[5vw]">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-0.5 w-10 bg-primary" />
            <span className="font-body text-[11px] font-bold uppercase tracking-widest text-primary-dark">
              Empowering a smarter tomorrow
            </span>
          </div>

          <h1
            ref={h1}
            className="w-fit origin-center font-heading text-4xl font-extrabold leading-tight text-primary-dark lg:text-6xl"
          >
            <span
              ref={line1}
              className="relative z-10 block w-fit origin-center text-primary"
            >
              Gennext IT
            </span>
            <span ref={line2} className="relative block w-fit origin-center">
              Management &amp; Consulting
            </span>
          </h1>

          <p className="mt-5 max-w-md font-body text-base font-semibold text-primary-dark">
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
          <span className="visible absolute bottom-[18px] left-1/2 top-[18px] w-0.5 -translate-x-1/2 rounded-full bg-primary/30" />
        </div>
      </section>
    </div>
  );
}