import { cn } from "@/lib/utils";

export function SectionHeading({
  kicker,
  title,
  align = "left",
  className,
}: {
  kicker?: string;
  title: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {kicker ? (
        <p className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-saffron">
          {kicker}
        </p>
      ) : null}
      <h2 className="font-heading text-3xl font-semibold leading-tight text-ink sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
