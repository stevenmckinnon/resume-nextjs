interface SectionHeadingProps {
  title: string;
  /** 1-based position in the page. Rendered zero-padded, e.g. 3 -> "03". */
  number: number;
}

export const SectionHeading = ({ title, number }: SectionHeadingProps) => (
  <div className="border-primary/40 flex flex-row items-center gap-4 border-b pb-4 md:flex-col md:items-start md:border-b-0 md:border-l-2 md:pb-0 md:pl-6">
    <span className="text-primary font-mono text-sm tracking-widest tabular-nums opacity-70">
      {String(number).padStart(2, "0")}
    </span>
    <h2 className="text-foreground text-xl font-black tracking-tight wrap-break-word uppercase md:text-2xl md:break-normal lg:text-3xl">
      {title}
    </h2>
  </div>
);
