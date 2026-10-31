type Props = {
  children: React.ReactNode;
  light?: boolean;
  center?: boolean;
};

export default function SectionLabel({ children, light = false, center = false }: Props) {
  return (
    <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
      <span className={`h-0.5 w-10 ${light ? "bg-white" : "bg-primary"}`} />
      <span
        className={`font-body text-xs font-bold uppercase tracking-[0.35em] ${
          light ? "text-white/80" : "text-slate-400"
        }`}
      >
        {children}
      </span>
    </div>
  );
}