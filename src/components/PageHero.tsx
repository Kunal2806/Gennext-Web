import SectionLabel from "@/components/SectionLabel";

type Props = {
  eyebrow: string;
  title: string;
  text?: string;
};

export default function PageHero({ eyebrow, title, text }: Props) {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-primary-dark to-primary px-[5vw] pb-20 pt-16 text-white lg:pb-28 lg:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-primary/40 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl">
        <SectionLabel light>{eyebrow}</SectionLabel>
        <h1 className="mt-5 max-w-4xl font-heading text-4xl font-extrabold leading-tight lg:text-6xl">
          {title}
        </h1>
        {text && (
          <p className="mt-5 max-w-2xl font-body text-lg font-semibold text-white/85">{text}</p>
        )}
      </div>
    </section>
  );
}