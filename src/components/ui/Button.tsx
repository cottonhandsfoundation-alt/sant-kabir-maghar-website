import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 font-body text-sm font-semibold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary: "bg-saffron text-cream hover:bg-saffron-dark",
  secondary: "bg-ink text-cream hover:bg-ink/90",
  outline: "border border-ink/30 text-ink hover:border-saffron hover:text-saffron",
  ghost: "text-ink hover:text-saffron",
  gold: "bg-gold text-cream hover:bg-saffron-dark",
};

export function Button({
  variant = "primary",
  className,
  href,
  external,
  ...props
}: {
  variant?: keyof typeof variants;
  className?: string;
  href?: string;
  external?: boolean;
} & Omit<ComponentProps<"button">, "className">) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {props.children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {props.children as React.ReactNode}
      </Link>
    );
  }

  return <button className={classes} {...props} />;
}
