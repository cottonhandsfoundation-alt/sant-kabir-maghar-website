import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FactBadge } from "@/components/ui/FactBadge";
import { SectionSubNav } from "@/components/site/SectionSubNav";
import { AttributedImage } from "@/components/ui/AttributedImage";
import { NAV_ITEMS } from "@/lib/nav";
import { IMAGE_SOURCES } from "@/content/image-sources";

const content = {
  hi: {
    kicker: "संत कबीर जी · कबीर पंथ",
    title: "कबीर पंथ",
    lead: "कबीर पंथ की स्थापना स्वयं कबीर ने नहीं की — यह उनके निर्वाण के बाद उनके शिष्यों द्वारा विकसित एक संस्थागत परंपरा है, जो उनकी शिक्षाओं को आगे बढ़ाने के लिए बनी।",
    sections: [
      {
        heading: "उत्पत्ति",
        badge: "verified" as const,
        body: "कबीर के निर्वाण के बाद उनके दो प्रमुख शिष्यों — धर्मदास और सूरत गोपाल — ने उनकी शिक्षाओं के प्रचार-प्रसार हेतु मठों (गद्दियों) की स्थापना की। सत्रहवीं शताब्दी तक यह परंपरा एक सुव्यवस्थित संस्थागत रूप ले चुकी थी।",
      },
      {
        heading: "काशी/कबीर चौरा-मगहर शाखा",
        badge: "verified" as const,
        body: "वाराणसी स्थित कबीर चौरा में केंद्रित यह शाखा, जिसकी एक उप-शाखा मगहर में भी है, सूरत गोपाल द्वारा स्थापित मानी जाती है — परंपरा के अनुसार लगभग 1559 ई. में। इस शाखा ने गुजरात, उत्तर प्रदेश और बिहार में प्रचार कार्य किया।",
      },
      {
        heading: "धर्मदासी शाखा (छत्तीसगढ़)",
        badge: "verified" as const,
        body: "धनी धर्मदास जी से जुड़ी यह शाखा मुख्यतः छत्तीसगढ़ में केंद्रित है। परंपरा के अनुसार कबीर ने धर्मदास को 'बयालिस वंश' (42 वंश-परंपराओं) का आशीर्वाद दिया था। यह शाखा आगे चलकर खरसिया और डमाखेड़ा (कबीर धर्म नगर डमाखेड़ा, बलौदा बाज़ार-भाटापारा जिला) — दो प्रमुख गद्दियों में विभाजित हुई, जिनमें डमाखेड़ा वर्तमान में सबसे बड़ा धर्मदासी केंद्र है।",
      },
      {
        heading: "अन्य शाखाएं",
        badge: "traditional" as const,
        body: "भागताही शाखा (बिहार के धनौती मठ पर केंद्रित) सहित कुछ अन्य क्षेत्रीय शाखाओं का उल्लेख भी मिलता है, जिनका दस्तावेज़ीकरण अपेक्षाकृत कम है।",
      },
      {
        heading: "ग्रंथ परंपरा",
        badge: "verified" as const,
        body: "कबीर पंथ के मूल ग्रंथ बीजक और अनुराग सागर हैं। बीजक तीन भागों में विभाजित है — रमैनी, शब्द और साखी — और यह पाठक को भ्रम व आडंबर त्यागकर सत्य के सीधे अनुभव की ओर प्रेरित करता है। इसके अतिरिक्त कबीर परिचय, साखी ग्रंथ और कबीर ग्रंथावली (राजस्थानी परंपरा) जैसे ग्रंथ भी विभिन्न शाखाओं में प्रचलित हैं।",
      },
      {
        heading: "संस्थागत संरचना",
        badge: "verified" as const,
        body: "स्थानीय कबीरपंथी समुदायों का नेतृत्व एक महंत करते हैं, जिनकी पहचान शंकु-आकार टोपी, तुलसी की माला (कंठी) और जपमाला से होती है। महंतों के लिए ब्रह्मचर्य अनिवार्य नहीं है — कुछ विवाहित भी होते हैं। उच्च आध्यात्मिक नेताओं को आचार्य या गुरु (जैसे डमाखेड़ा में 'वंशगुरु') जैसी उपाधियां दी जाती हैं।",
      },
    ],
  },
  en: {
    kicker: "Sant Kabir Ji · Kabir Panth",
    title: "Kabir Panth",
    lead: "The Kabir Panth was not founded by Kabir himself — it is an institutional tradition that developed after his passing, established by his disciples to carry his teachings forward.",
    sections: [
      {
        heading: "Origins",
        badge: "verified" as const,
        body: "After Kabir's passing, two of his principal disciples — Dharamdas and Surat Gopal — established maths (monastic centres/gaddis) to propagate his teachings. By the 17th century, this had crystallised into a well-organised institutional tradition.",
      },
      {
        heading: "Kashi/Kabir Chaura–Maghar Branch",
        badge: "verified" as const,
        body: "Centred at Kabir Chaura in Varanasi, with a branch presence at Maghar, this tradition is traditionally attributed to Surat Gopal, said to have been installed as its first missionary around 1559 CE. This branch conducted missionary work across Gujarat, Uttar Pradesh and Bihar.",
      },
      {
        heading: "Dharamdasi Branch (Chhattisgarh)",
        badge: "verified" as const,
        body: "Associated with Dhani Dharamdas, this branch is concentrated mainly in Chhattisgarh. Tradition holds that Kabir blessed Dharamdas with 'forty-two lineages' (bayalis vansh). The branch later split into two principal seats — Kharsia and Damakheda (Kabir Dharm Nagar Damakheda, in Baloda Bazar–Bhatapara district) — with Damakheda now the largest Dharamdasi centre.",
      },
      {
        heading: "Other Branches",
        badge: "traditional" as const,
        body: "Some accounts also mention other regional branches, including a Bhagatahi branch centred on the Dhanauti math in Bihar — these are comparatively less well documented.",
      },
      {
        heading: "Textual Tradition",
        badge: "verified" as const,
        body: "The core scriptures of the Kabir Panth are the Bijak and the Anurag Sagar. The Bijak is divided into three sections — Ramaini, Shabda and Sakhi — urging the reader to shed delusion and pretension in favour of a direct experience of truth. Texts such as Kabir Parachai, Sakhi Granth and Kabir Granthavali (the Rajasthani tradition) are also followed across various branches.",
      },
      {
        heading: "Institutional Structure",
        badge: "verified" as const,
        body: "Local Kabir Panthi communities are led by a mahant, identifiable by a conical cap, a tulsi-bead necklace (kanthi), and a rosary. Celibacy is not mandatory for mahants — some are married. Higher spiritual leaders carry titles such as Acharya or Guru (e.g. 'Vanshguru' at Damakheda).",
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = content[locale as "hi" | "en"];
  return {
    title: c.title,
    description: c.lead,
    alternates: {
      canonical: `/${locale}/sant-kabir/kabir-panth`,
      languages: { hi: "/hi/sant-kabir/kabir-panth", en: "/en/sant-kabir/kabir-panth" },
    },
  };
}

export default async function KabirPanthPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = content[locale as "hi" | "en"];
  const children = NAV_ITEMS.find((i) => i.href === "/sant-kabir")?.children ?? [];

  return (
    <>
      <SectionSubNav items={children} activeHref="/sant-kabir/kabir-panth" />
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="max-w-2xl">
            <SectionHeading kicker={c.kicker} title={c.title} />
            <p className="mt-5 font-body leading-relaxed text-ink-soft">{c.lead}</p>

            <div className="mt-10 space-y-8">
              {c.sections.map((s, i) => (
                <section key={i}>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h2 className="font-heading text-xl font-semibold text-ink">{s.heading}</h2>
                    <FactBadge kind={s.badge} />
                  </div>
                  <p className="font-body leading-relaxed text-ink-soft">{s.body}</p>
                </section>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <AttributedImage
              image={IMAGE_SOURCES.kabirWithSuratGopalDharamdas}
              locale={locale}
            />
            <AttributedImage image={IMAGE_SOURCES.kabirWithDisciple} locale={locale} />
          </div>
        </div>
      </Container>
    </>
  );
}
