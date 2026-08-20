/**
 * The installed lucide-react version no longer ships brand/social icons
 * (Youtube, Facebook, Instagram, Twitter etc. were removed upstream in
 * favour of the separate `simple-icons` package). Rather than pull in a
 * whole extra icon library for five glyphs, these are small hand-drawn
 * inline SVGs matching lucide's 24x24 / stroke-free glyph style.
 */
type IconProps = { className?: string };

export function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.6 7.2a2.9 2.9 0 0 0-2-2.05C17.9 4.7 12 4.7 12 4.7s-5.9 0-7.6.45a2.9 2.9 0 0 0-2 2.05A30.6 30.6 0 0 0 2 12a30.6 30.6 0 0 0 .4 4.8 2.9 2.9 0 0 0 2 2.05c1.7.45 7.6.45 7.6.45s5.9 0 7.6-.45a2.9 2.9 0 0 0 2-2.05A30.6 30.6 0 0 0 22 12a30.6 30.6 0 0 0-.4-4.8ZM10 15.2V8.8L15.6 12Z" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M14 13.5h2.5l1-4H14V7.5c0-1.03 0-2 2-2h1.5V2.14C17.17 2.1 15.9 2 14.55 2 11.74 2 9.8 3.66 9.8 6.7v2.8H6.7v4h3.1V22h4.2Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M3 3l7.3 9.2L3.2 21h2.4l6-6.9 4.7 6.9H21l-7.6-9.7L20.4 3H18l-5.5 6.4L8 3Z" />
    </svg>
  );
}

export function WhatsappIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.1 8.1 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.1.2-.3.2-.6.1-.2-.1-1-.4-2-1.2-.7-.6-1.2-1.4-1.4-1.6-.1-.2 0-.4.1-.5l.4-.5c.1-.1.2-.3.2-.4 0-.1 0-.3 0-.4 0-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}
