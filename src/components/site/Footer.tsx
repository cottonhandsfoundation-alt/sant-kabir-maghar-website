import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  YoutubeIcon,
  FacebookIcon,
  InstagramIcon,
  XIcon,
  WhatsappIcon,
} from "../ui/SocialIcons";
import { FOOTER_LEGAL_LINKS, NAV_ITEMS } from "@/lib/nav";
import { Logo } from "../ui/Logo";
import { getSiteSettings } from "@/lib/settings";
import { Container } from "../ui/Container";

export async function Footer() {
  const [t, tNav, settings] = await Promise.all([
    getTranslations("Footer"),
    getTranslations("Nav"),
    getSiteSettings(),
  ]);

  const year = new Date().getFullYear();
  const socialLinks = [
    { key: "social_youtube", Icon: YoutubeIcon, label: "YouTube" },
    { key: "social_facebook", Icon: FacebookIcon, label: "Facebook" },
    { key: "social_instagram", Icon: InstagramIcon, label: "Instagram" },
    { key: "social_twitter", Icon: XIcon, label: "X / Twitter" },
    { key: "social_whatsapp_channel", Icon: WhatsappIcon, label: "WhatsApp" },
  ] as const;

  const primaryLinks = NAV_ITEMS.filter((i) => i.href !== "/").slice(0, 6);

  return (
    <footer className="border-t border-border-soft bg-cream-soft">
      <Container className="grid gap-10 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-ink-soft">
            {t("about")}
          </p>
          <div className="mt-5 flex gap-3">
            {socialLinks.map(({ key, Icon, label }) => {
              const url = settings[key];
              if (!url) return null;
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink-soft transition-colors hover:border-saffron hover:text-saffron"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-ink">
            {t("quickLinks")}
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {primaryLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-body text-sm text-ink-soft hover:text-saffron"
                >
                  {tNav(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-ink">
            {t("legal")}
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {FOOTER_LEGAL_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-body text-sm text-ink-soft hover:text-saffron"
                >
                  {t(item.labelKey as Parameters<typeof t>[0])}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-ink">
            {t("connect")}
          </h3>
          <ul className="mt-4 flex flex-col gap-3 font-body text-sm text-ink-soft">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-saffron" aria-hidden="true" />
              <span>{settings.org_address_hi}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-saffron" aria-hidden="true" />
              <span>{settings.org_phone}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-saffron" aria-hidden="true" />
              <span>{settings.org_email}</span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="motif-divider" />

      <Container className="flex flex-col items-center justify-between gap-2 py-5 text-center font-body text-xs text-ink-faint sm:flex-row sm:text-left">
        <p>
          © {year} {settings.org_name_hi} — {t("copyright")}
        </p>
        <p>{t("placeholderOrgNotice")}</p>
      </Container>
    </footer>
  );
}
