import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["hi", "en"],
  defaultLocale: "hi",
  localePrefix: "always",
});

export type AppLocale = (typeof routing.locales)[number];
