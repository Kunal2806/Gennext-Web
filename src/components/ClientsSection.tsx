import Image from "next/image";
import Reveal from "@/components/Reveal";

const clients = [
  { name: "1218 Global", file: "1218global.png" },
  { name: "Client", file: "5bb2184952faff000c279344.png" },
  { name: "BDO", file: "BDO_logo.png" },
  { name: "Big Blue Dots", file: "big-blue-dots.png" },
  { name: "CSC", file: "csc-logo.png" },
  { name: "Futuremed", file: "Futuremed-logo.png" },
  { name: "Grant Thornton", file: "grantthortaon.png" },
  { name: "i2k2 Networks", file: "i2k2-networks-logo.png" },
  { name: "Indiamart", file: "indianmart.png" },
  { name: "LazerKen", file: "lazerKen.png" },
  { name: "Lenskart", file: "lenskart.svg" },
  { name: "Mahaveer Cotton", file: "Mahaveer-cotton.png" },
  { name: "Monet", file: "monetLogo.png" },
  { name: "NIIT", file: "NIIT-logo.png" },
  { name: "NMC Genetics", file: "nmcgeneticslogo.png" },
  { name: "Nulearn", file: "Nulearn-logo.svg" },
  { name: "OYO", file: "OYOlogo.png" },
  { name: "RBS", file: "r-b-s-logo.png" },
  { name: "Sarvodaya", file: "Sarvodaya.png" },
  { name: "Synergy Consulting", file: "synergy-consulting_0.png" },
  { name: "UNA General Trading", file: "UNADXB-logo.png" },
  { name: "UPSMA", file: "upsma-logo.png" },
  { name: "Vareya", file: "vareyajpg.png" },
  { name: "Ventura Corp", file: "Venturacorp.png" },
  { name: "Vision Helpdesk", file: "vision-desk.png" },
  { name: "Woo Digi", file: "woodigi.png" },
  { name: "Zomato", file: "zomato-logo.png" },
];

const rowA = clients.slice(0, 14);
const rowB = clients.slice(14);

function Row({
  items,
  reverse = false,
}: {
  items: typeof clients;
  reverse?: boolean;
}) {
  const loop = [...items, ...items];
  return (
    <div className="marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className={`marquee-track${reverse ? " reverse" : ""}`}>
        {loop.map((c, i) => {
          const copy = i >= items.length;
          return (
            <div
              key={`${c.file}-${i}`}
              aria-hidden={copy}
              className="group mr-5 flex h-24 w-48 shrink-0 items-center justify-center rounded-2xl border border-primary/10 bg-white px-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/15"
            >
              <Image
                src={`/clients/${c.file}`}
                alt={copy ? "" : c.name}
                width={160}
                height={64}
                className="h-12 w-auto max-w-full object-contain opacity-60 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ClientsSection() {
  return (
    <section id="clients" className="overflow-x-clip bg-white py-24 lg:py-28">
      <Reveal className="mx-auto max-w-3xl px-[5vw] text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="h-0.5 w-10 bg-primary" />
          <span className="font-body text-xs font-bold uppercase tracking-[0.35em] text-slate-400">
            Our Clients
          </span>
          <span className="h-0.5 w-10 bg-primary" />
        </div>
        <h2 className="mt-5 font-heading text-4xl font-extrabold text-primary-dark lg:text-5xl">
          Trusted by{" "}
          <span className="bg-linear-to-r from-primary to-primary-dark bg-clip-text text-transparent shimmer-text">
            294+
          </span>{" "}
          happy clients
        </h2>
        <p className="mt-5 font-body text-lg leading-8 text-slate-500">
          Businesses across industries trust us with their technology.
        </p>
      </Reveal>

      <div className="mt-14 space-y-5">
        <Reveal from="left">
          <Row items={rowA} />
        </Reveal>
        <Reveal from="right" delay={150}>
          <Row items={rowB} reverse />
        </Reveal>
      </div>
    </section>
  );
}