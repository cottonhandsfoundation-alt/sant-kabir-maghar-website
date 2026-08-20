export type NavChild = {
  href: string;
  labelKey: string;
};

export type NavItem = {
  href: string;
  labelKey: string;
  children?: NavChild[];
};

/** Central nav tree — drives the header dropdowns, mobile menu, and footer
 * link columns so all three stay in sync. `labelKey` refers to the `Nav`
 * namespace in messages/{locale}.json. */
export const NAV_ITEMS: NavItem[] = [
  { href: "/", labelKey: "home" },
  {
    href: "/sant-kabir",
    labelKey: "santKabir",
    children: [
      { href: "/sant-kabir/jivan-parichay", labelKey: "santKabirJivanParichay" },
      { href: "/sant-kabir/shikshayein", labelKey: "santKabirShikshayein" },
      { href: "/sant-kabir/dohe", labelKey: "santKabirDohe" },
      { href: "/sant-kabir/vani", labelKey: "santKabirVani" },
      { href: "/sant-kabir/samanta-manavta", labelKey: "santKabirSamanta" },
      { href: "/sant-kabir/dharmik-sadbhav", labelKey: "santKabirSadbhav" },
      { href: "/sant-kabir/maghar-sambandh", labelKey: "santKabirMagharSambandh" },
      { href: "/sant-kabir/kabir-panth", labelKey: "santKabirPanth" },
    ],
  },
  {
    href: "/mahant-vichar-das-ji",
    labelKey: "mahantJi",
    children: [
      { href: "/mahant-vichar-das-ji/parichay", labelKey: "mahantJiParichay" },
      { href: "/mahant-vichar-das-ji/jivan-yatra", labelKey: "mahantJiJivanYatra" },
      { href: "/mahant-vichar-das-ji/shikshayein", labelKey: "mahantJiShikshayein" },
      { href: "/mahant-vichar-das-ji/pravachan", labelKey: "mahantJiPravachan" },
      { href: "/mahant-vichar-das-ji/karyakram", labelKey: "mahantJiKaryakram" },
      { href: "/mahant-vichar-das-ji/photo", labelKey: "mahantJiPhoto" },
      { href: "/mahant-vichar-das-ji/video", labelKey: "mahantJiVideo" },
    ],
  },
  {
    href: "/maghar",
    labelKey: "maghar",
    children: [
      { href: "/maghar/mahatva", labelKey: "magharMahatva" },
      { href: "/maghar/nirvan-sthali", labelKey: "magharNirvanSthali" },
      { href: "/maghar/kabir-chaura", labelKey: "magharKabirChaura" },
      { href: "/maghar/samadhi", labelKey: "magharSamadhi" },
      { href: "/maghar/mazar", labelKey: "magharMazar" },
      { href: "/maghar/parampara", labelKey: "magharParampara" },
      { href: "/maghar/kaise-pahunche", labelKey: "magharKaisePahunche" },
      { href: "/maghar/yatra-darshan", labelKey: "magharYatraDarshan" },
    ],
  },
  { href: "/activities", labelKey: "activities" },
  { href: "/events", labelKey: "events" },
  { href: "/gallery", labelKey: "gallery" },
  { href: "/seva", labelKey: "seva" },
  { href: "/contact", labelKey: "contact" },
];

export const FOOTER_LEGAL_LINKS = [
  { href: "/privacy-policy", labelKey: "privacyPolicy" },
  { href: "/terms", labelKey: "terms" },
  { href: "/donation-terms", labelKey: "donationTerms" },
  { href: "/refund-policy", labelKey: "refundPolicy" },
  { href: "/disclaimer", labelKey: "disclaimer" },
  { href: "/media-attribution", labelKey: "mediaAttribution" },
];
