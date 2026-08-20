/**
 * Central registry of every externally-sourced image used on the public
 * site. This is the single source of truth for IMAGE_SOURCES.md and for
 * the on-page attribution captions rendered by <AttributedImage>. Every
 * entry here was verified during project research to be genuinely
 * reusable (Wikimedia Commons, CC-licensed or public domain) — do not add
 * an image here without confirming its license the same way.
 */
export type ImageSource = {
  id: string;
  url: string;
  width: number;
  height: number;
  titleHi: string;
  titleEn: string;
  creator: string;
  source: string;
  license: string;
  attributionRequired: boolean;
  dateAccessed: string;
};

export const IMAGE_SOURCES: Record<string, ImageSource> = {
  kabirWeavingLoom: {
    id: "kabirWeavingLoom",
    url: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Kabir004.jpg",
    width: 800,
    height: 1024,
    titleHi: "करघे पर कार्यरत संत कबीर (जयपुर सेंट्रल म्यूज़ियम, लगभग 1825)",
    titleEn: "Kabir weaving at his loom (Jaipur Central Museum, c. 1825)",
    creator: "Unknown artist",
    source: "https://commons.wikimedia.org/wiki/File:Kabir004.jpg",
    license: "Public Domain",
    attributionRequired: false,
    dateAccessed: "2026-08-19",
  },
  kabirWithRavidas: {
    id: "kabirWithRavidas",
    url: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Painting_of_Kabir_with_Ravidas%2C_Mughal%2C_1625.jpg",
    width: 800,
    height: 1000,
    titleHi: "संत कबीर एवं संत रविदास, मुगल शैली चित्रकला, 1625",
    titleEn: "Kabir with Ravidas, Mughal-style painting, 1625",
    creator: "Unknown artist",
    source:
      "https://commons.wikimedia.org/wiki/File:Painting_of_Kabir_with_Ravidas,_Mughal,_1625.jpg",
    license: "Public Domain",
    attributionRequired: false,
    dateAccessed: "2026-08-19",
  },
  kabirGatheringHolyMen: {
    id: "kabirGatheringHolyMen",
    url: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Detail_of_Bhagat_Kabir_from_a_painting_of_a_gathering_of_holy_men_of_different_faiths%2C_by_Mir_Kalan_Khan%2C_ca.1770%E2%80%9375.jpg",
    width: 800,
    height: 950,
    titleHi: "विभिन्न आस्थाओं के संतों की सभा में भक्त कबीर (मीर कलां खान, लगभग 1770-75)",
    titleEn: "Bhagat Kabir in a gathering of holy men of different faiths (Mir Kalan Khan, c. 1770–75)",
    creator: "Mir Kalan Khan",
    source:
      "https://commons.wikimedia.org/wiki/File:Detail_of_Bhagat_Kabir_from_a_painting_of_a_gathering_of_holy_men_of_different_faiths,_by_Mir_Kalan_Khan,_ca.1770-75.jpg",
    license: "CC0 1.0 (Public Domain Dedication)",
    attributionRequired: false,
    dateAccessed: "2026-08-19",
  },
  kabirAmberPainting: {
    id: "kabirAmberPainting",
    url: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Painting_of_Kabir%2C_Amber%2C_ca.1750%E2%80%931800.jpg",
    width: 800,
    height: 1050,
    titleHi: "करघे पर संत कबीर, आमेर शैली, लगभग 1750-1800",
    titleEn: "Kabir seated at his loom, Amber school, c. 1750–1800",
    creator: "Qa'im Khan Bin Zafar Bahadur",
    source: "https://commons.wikimedia.org/wiki/File:Painting_of_Kabir,_Amber,_ca.1750-1800.jpg",
    license: "Public Domain",
    attributionRequired: false,
    dateAccessed: "2026-08-19",
  },
  kabirWithDisciple: {
    id: "kabirWithDisciple",
    url: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Painting_of_bhagat_%28saint%29_Kabir_%28left%29_with_a_disciple_%28right%29%2C_Mughal_school_of_art.jpg",
    width: 800,
    height: 1000,
    titleHi: "भक्त कबीर अपने एक शिष्य के साथ, मुगल शैली",
    titleEn: "Bhagat Kabir with a disciple, Mughal school of art",
    creator: "Unknown artist",
    source:
      "https://commons.wikimedia.org/wiki/File:Painting_of_bhagat_(saint)_Kabir_(left)_with_a_disciple_(right),_Mughal_school_of_art.jpg",
    license: "Public Domain",
    attributionRequired: false,
    dateAccessed: "2026-08-19",
  },
  kabirWithSuratGopalDharamdas: {
    id: "kabirWithSuratGopalDharamdas",
    url: "https://upload.wikimedia.org/wikipedia/commons/8/82/Painting_of_bhagat_Kabir_%28seated_near_the_centre_of_the_frame%29%2C_his_son_Kamal_%28fly-whisk_attendant%3B_standing_to_the_right%29%2C_and_two_of_his_disciples_Surat_Gopal_%28seated_left%29_and_Dharam_Das_%28seated_right%29.jpg",
    width: 800,
    height: 1000,
    titleHi: "भक्त कबीर, पुत्र कमाल तथा शिष्य सूरत गोपाल एवं धर्मदास सहित",
    titleEn: "Bhagat Kabir with his son Kamal and disciples Surat Gopal and Dharam Das",
    creator: "Unknown artist (from R.V. Russell, Tribes and Castes of the Central Provinces of India)",
    source:
      "https://commons.wikimedia.org/wiki/File:Painting_of_bhagat_Kabir_(seated_near_the_centre_of_the_frame),_his_son_Kamal_(fly-whisk_attendant;_standing_to_the_right),_and_two_of_his_disciples_Surat_Gopal_(seated_left)_and_Dharam_Das_(seated_right).jpg",
    license: "Public Domain",
    attributionRequired: false,
    dateAccessed: "2026-08-19",
  },
  kabirModernIllustration: {
    id: "kabirModernIllustration",
    url: "https://upload.wikimedia.org/wikipedia/commons/3/32/Kabir_Das.jpg",
    width: 800,
    height: 1000,
    titleHi: "संत कबीर दास जी — समकालीन डिजिटल चित्रण",
    titleEn: "Sant Kabir Das Ji — contemporary digital illustration",
    creator: "ShubhamSay (Wikimedia Commons)",
    source: "https://commons.wikimedia.org/wiki/File:Kabir_Das.jpg",
    license: "CC BY-SA 4.0",
    attributionRequired: true,
    dateAccessed: "2026-08-19",
  },
  magharSamadhiMazar1: {
    id: "magharSamadhiMazar1",
    url: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Kabir-Samadhi-and-Majar-at-Magahar-01.jpg",
    width: 1200,
    height: 900,
    titleHi: "मगहर में संत कबीर की समाधि और मजार",
    titleEn: "Sant Kabir's Samadhi and Mazar at Maghar",
    creator: "सत्यम् मिश्र (SM7, Wikimedia Commons)",
    source: "https://commons.wikimedia.org/wiki/File:Kabir-Samadhi-and-Majar-at-Magahar-01.jpg",
    license: "CC BY-SA 4.0",
    attributionRequired: true,
    dateAccessed: "2026-08-19",
  },
  magharSamadhiMazar2: {
    id: "magharSamadhiMazar2",
    url: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Kabir-Samadhi-and-Majar-at-Magahar-02.jpg",
    width: 1200,
    height: 900,
    titleHi: "मगहर में दरगाह (जीर्णोद्धार कार्य के दौरान) और समाधि",
    titleEn: "The Dargah (under restoration) and Samadhi at Maghar",
    creator: "सत्यम् मिश्र (SM7, Wikimedia Commons)",
    source: "https://commons.wikimedia.org/wiki/File:Kabir-Samadhi-and-Majar-at-Magahar-02.jpg",
    license: "CC BY-SA 4.0",
    attributionRequired: true,
    dateAccessed: "2026-08-19",
  },
  sadhanaGupha1: {
    id: "sadhanaGupha1",
    url: "https://upload.wikimedia.org/wikipedia/commons/3/33/Kabir%27s-Sadhana-Gupha-01.jpg",
    width: 1200,
    height: 900,
    titleHi: "संत कबीर की साधना गुफा, मगहर",
    titleEn: "Sant Kabir's Sadhna Gupha (meditation cave), Maghar",
    creator: "सत्यम् मिश्र (SM7, Wikimedia Commons)",
    source: "https://commons.wikimedia.org/wiki/File:Kabir's-Sadhana-Gupha-01.jpg",
    license: "CC BY-SA 4.0",
    attributionRequired: true,
    dateAccessed: "2026-08-19",
  },
  sadhanaGupha2: {
    id: "sadhanaGupha2",
    url: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Kabir%27s-Sadhana-Gupha-02.jpg",
    width: 1200,
    height: 900,
    titleHi: "साधना गुफा का अग्र भाग, मगहर",
    titleEn: "Front view of the Sadhna Gupha, Maghar",
    creator: "सत्यम् मिश्र (SM7, Wikimedia Commons)",
    source: "https://commons.wikimedia.org/wiki/File:Kabir's-Sadhana-Gupha-02.jpg",
    license: "CC BY-SA 4.0",
    attributionRequired: true,
    dateAccessed: "2026-08-19",
  },
  sadhanaGuphaInfoBoard: {
    id: "sadhanaGuphaInfoBoard",
    url: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Information-Board-at-Kabir%27s-Sadhana-Gupha-Maghar.jpg",
    width: 1200,
    height: 900,
    titleHi: "साधना गुफा पर सूचना पट्ट (उ.प्र. राज्य पुरातत्व विभाग)",
    titleEn: "Information board at the Sadhna Gupha (UP State Archaeology Department)",
    creator: "सत्यम् मिश्र (SM7, Wikimedia Commons)",
    source:
      "https://commons.wikimedia.org/wiki/File:Information-Board-at-Kabir's-Sadhana-Gupha-Maghar.jpg",
    license: "CC BY-SA 4.0",
    attributionRequired: true,
    dateAccessed: "2026-08-19",
  },
  aamiRiver: {
    id: "aamiRiver",
    url: "https://upload.wikimedia.org/wikipedia/commons/3/37/Aami-river-at-Maghar.jpg",
    width: 1200,
    height: 800,
    titleHi: "मगहर में आमी नदी",
    titleEn: "The Aami River at Maghar",
    creator: "सत्यम् मिश्र (SM7, Wikimedia Commons)",
    source: "https://commons.wikimedia.org/wiki/File:Aami-river-at-Maghar.jpg",
    license: "CC BY-SA 4.0",
    attributionRequired: true,
    dateAccessed: "2026-08-19",
  },
  kabirChauraMagharSign: {
    id: "kabirChauraMagharSign",
    url: "https://upload.wikimedia.org/wikipedia/commons/4/4c/KABIR_CHAURA_MAGHAR_UP_INDIA_PIN272173.jpg",
    width: 1200,
    height: 900,
    titleHi: "कबीर चौरा मगहर परिसर",
    titleEn: "Kabir Chaura Maghar complex",
    creator: "Badre Alam Khan (Wikimedia Commons)",
    source: "https://commons.wikimedia.org/wiki/File:KABIR_CHAURA_MAGHAR_UP_INDIA_PIN272173.jpg",
    license: "CC BY-SA 3.0",
    attributionRequired: true,
    dateAccessed: "2026-08-19",
  },
  sadguruKabirSamadhiSthali: {
    id: "sadguruKabirSamadhiSthali",
    url: "https://upload.wikimedia.org/wikipedia/commons/1/18/SADGURU_KABIR_SAMADHI_STHALI.JPG",
    width: 1200,
    height: 900,
    titleHi: "सद्गुरु कबीर समाधि स्थली, मगहर",
    titleEn: "Sadguru Kabir Samadhi Sthali, Maghar",
    creator: "Mahantvicharsaheb (Wikimedia Commons)",
    source: "https://commons.wikimedia.org/wiki/File:SADGURU_KABIR_SAMADHI_STHALI.JPG",
    license: "CC BY-SA 4.0",
    attributionRequired: true,
    dateAccessed: "2026-08-19",
  },
};
