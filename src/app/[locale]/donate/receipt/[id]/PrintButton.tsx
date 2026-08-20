"use client";

import { Printer } from "lucide-react";

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center justify-center gap-2 rounded-sm bg-saffron px-6 py-3 font-body text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-saffron-dark print:hidden"
    >
      <Printer className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  );
}
