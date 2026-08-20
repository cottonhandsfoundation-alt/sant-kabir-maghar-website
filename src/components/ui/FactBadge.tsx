import { getTranslations } from "next-intl/server";
import { BookOpen, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Visually distinguishes VERIFIED information (government sources,
 * encyclopedias, reputable news) from TRADITIONAL/BELIEVED information
 * (religious tradition, oral history, legend) throughout the site — a core
 * requirement for this project's fact-checking discipline. See
 * /research-sources for the full methodology.
 */
export async function FactBadge({
  kind,
  className,
}: {
  kind: "verified" | "traditional";
  className?: string;
}) {
  const t = await getTranslations("Common");
  const isVerified = kind === "verified";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-body text-[0.7rem] font-medium",
        isVerified
          ? "border-green/30 bg-green/10 text-green"
          : "border-gold/40 bg-gold-pale text-gold",
        className
      )}
    >
      {isVerified ? (
        <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
      ) : (
        <BookOpen className="h-3 w-3" aria-hidden="true" />
      )}
      {isVerified ? t("verifiedLabel") : t("traditionLabel")}
    </span>
  );
}
