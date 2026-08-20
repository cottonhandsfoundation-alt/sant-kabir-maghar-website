export type DohaTheme =
  | "guru"
  | "prem"
  | "satya"
  | "ahankar"
  | "manavta"
  | "bhakti"
  | "karma"
  | "jaati"
  | "dharma"
  | "maya"
  | "atmagyan";

export type DohaEntry = {
  hindiText: string;
  meaningHindi: string;
  meaningEnglish: string;
  theme: DohaTheme;
};

/**
 * These couplets are centuries-old, orally transmitted, public-domain
 * literary text attributed to Sant Kabir across the Bijak, Kabir
 * Granthavali and Sakhi Granth traditions — safe to reproduce verbatim.
 * The Hindi/English "meaning" explanations below are written originally
 * for this website, not copied from any existing translation, so they may
 * read a little differently from other sources — that is intentional.
 */
export const DOHAS: DohaEntry[] = [
  {
    hindiText:
      "बुरा जो देखन मैं चला, बुरा न मिलिया कोय। जो दिल खोजा आपना, मुझसे बुरा न कोय।।",
    meaningHindi:
      "कबीर कहते हैं कि जब वे संसार में बुराई खोजने निकले, तो कोई बुरा नहीं मिला। जब उन्होंने अपने ही मन को टटोला, तो पाया कि उनसे बुरा और कोई नहीं। यह दोहा आत्म-निरीक्षण और दूसरों को जज करने से पहले स्वयं को देखने की सीख देता है।",
    meaningEnglish:
      "Kabir says that when he set out to find evil in the world, he found none — but when he searched his own heart, he found no one worse than himself. The verse is a call to self-examination before judging others.",
    theme: "ahankar",
  },
  {
    hindiText:
      "गुरु गोविंद दोउ खड़े, काके लागूं पांय। बलिहारी गुरु आपने, गोविन्द दियो बताय।।",
    meaningHindi:
      "यदि गुरु और स्वयं ईश्वर (गोविंद) दोनों एक साथ खड़े हों, तो पहले किसके चरण छुए जाएं? कबीर कहते हैं कि गुरु के प्रति समर्पण होना चाहिए, क्योंकि गुरु ने ही ईश्वर को पहचानने और उस तक पहुंचने का मार्ग दिखाया।",
    meaningEnglish:
      "If both the guru and the divine stood before you, whose feet would you touch first? Kabir says the guru deserves that gratitude first, since it was the guru who revealed the divine at all.",
    theme: "guru",
  },
  {
    hindiText:
      "माटी कहे कुम्हार से, तू क्या रौंदे मोय। एक दिन ऐसा आएगा, मैं रौंदूंगी तोय।।",
    meaningHindi:
      "मिट्टी कुम्हार से कहती है — तू आज मुझे रौंद रहा है, पर एक दिन ऐसा आएगा जब तू भी मिट्टी में मिल जाएगा और मैं तुझे ढक लूंगी। यह दोहा जीवन की नश्वरता और अहंकार की व्यर्थता की याद दिलाता है।",
    meaningEnglish:
      "The clay says to the potter: today you shape and tread on me, but a day will come when you too return to the earth, and I will cover you. A reminder of mortality and the futility of pride.",
    theme: "maya",
  },
  {
    hindiText:
      "चाह मिटी, चिंता मिटी, मनवा बेपरवाह। जिसको कुछ नहीं चाहिए, वह शहंशाह।।",
    meaningHindi:
      "जब इच्छाएं मिट जाती हैं, तो चिंताएं भी समाप्त हो जाती हैं और मन निश्चिंत हो जाता है। कबीर कहते हैं कि जिसे कुछ भी नहीं चाहिए, वही सच्चा राजा है — सच्चा संतोष ही सबसे बड़ा वैभव है।",
    meaningEnglish:
      "When desire ends, worry ends with it, and the mind becomes free. Kabir says the one who wants nothing is the true emperor — contentment itself is the greatest wealth.",
    theme: "atmagyan",
  },
  {
    hindiText:
      "जब मैं था तब हरि नहीं, अब हरि है मैं नाही। सब अँधियारा मिट गया, दीपक देखा माही।।",
    meaningHindi:
      "जब तक मेरे भीतर अहंकार (मैं) था, तब तक ईश्वर का अनुभव नहीं हुआ। जब अहंकार मिटा, तो ईश्वर का अनुभव हुआ। जैसे दीपक जलते ही अंधकार अपने आप मिट जाता है, वैसे ही आत्मज्ञान होते ही अहंकार का अंधकार समाप्त हो जाता है।",
    meaningEnglish:
      "As long as my ego ('I') remained, the divine was absent; once the ego dissolved, the divine was found. Just as lighting a lamp instantly dispels darkness, self-realisation dissolves the darkness of ego.",
    theme: "ahankar",
  },
  {
    hindiText:
      "पोथी पढ़ि पढ़ि जग मुआ, पंडित भया न कोय। ढाई आखर प्रेम का, पढ़े सो पंडित होय।।",
    meaningHindi:
      "बड़े-बड़े ग्रंथ पढ़कर भी संसार में कोई सच्चा ज्ञानी नहीं बन पाया। कबीर कहते हैं कि जो व्यक्ति 'प्रेम' के ढाई अक्षर पढ़ और समझ ले, वही वास्तव में विद्वान और ज्ञानी है — शास्त्रीय ज्ञान से बढ़कर प्रेम की अनुभूति है।",
    meaningEnglish:
      "Reading endless scriptures, the world has not truly become wise. Kabir says the one who reads and lives the two-and-a-half letters of 'love' becomes the real scholar — direct love outweighs bookish learning.",
    theme: "prem",
  },
  {
    hindiText:
      "साधु ऐसा चाहिए, जैसा सूप सुभाय। सार-सार को गहि रहै, थोथा देई उड़ाय।।",
    meaningHindi:
      "सच्चा साधु सूप (अनाज फटकने का पात्र) के समान होना चाहिए, जो सार (अच्छे अनाज) को रख लेता है और थोथा (भूसा) उड़ा देता है। इसी तरह विवेकवान व्यक्ति सत्य और सार को ग्रहण करता है, व्यर्थ को त्याग देता है।",
    meaningEnglish:
      "A true seeker should be like a grain-sieve — keeping what is essential and blowing away the husk. A person of discernment holds on to truth and lets go of what is worthless.",
    theme: "satya",
  },
  {
    hindiText:
      "जाति न पूछो साधु की, पूछ लीजिये ज्ञान। मोल करो तरवार का, पड़ा रहन दो म्यान।।",
    meaningHindi:
      "किसी साधु या सज्जन की जाति मत पूछो, उसका ज्ञान पूछो। जैसे तलवार का मोल उसकी धार से होता है, म्यान से नहीं — वैसे ही मनुष्य का मूल्य उसके गुण और ज्ञान से है, जन्म से नहीं।",
    meaningEnglish:
      "Do not ask a holy person's caste — ask about their knowledge and character instead. Just as a sword is valued for its blade, not its sheath, a person's worth lies in their virtue, not their birth.",
    theme: "jaati",
  },
  {
    hindiText:
      "निंदक नियरे राखिए, आँगन कुटी छवाय। बिन पानी, साबुन बिना, निर्मल करे सुभाय।।",
    meaningHindi:
      "अपनी निंदा करने वाले को पास ही रखो, यहां तक कि उसके लिए आंगन में कुटिया बनवा दो। क्योंकि वह बिना पानी और साबुन के भी तुम्हारे स्वभाव को निर्मल कर देता है — आलोचना आत्म-सुधार का अवसर बन सकती है।",
    meaningEnglish:
      "Keep your critic close, even build them a hut in your courtyard — for without water or soap, they purify your character simply by pointing out your faults. Criticism, taken well, becomes a chance for self-improvement.",
    theme: "atmagyan",
  },
  {
    hindiText:
      "धीरे-धीरे रे मना, धीरे सब कुछ होय। माली सींचे सौ घड़ा, ॠतु आए फल होय।।",
    meaningHindi:
      "हे मन, धैर्य रखो, सब कुछ अपने समय पर होता है। माली चाहे सैकड़ों घड़े पानी सींच दे, फल तो ऋतु आने पर ही लगेगा। यह दोहा जल्दबाज़ी छोड़कर सही समय की प्रतीक्षा करने की सीख देता है।",
    meaningEnglish:
      "Be patient, O mind — everything happens in its own time. However many pots of water a gardener pours, fruit ripens only in its season. A lesson in patience over haste.",
    theme: "karma",
  },
  {
    hindiText:
      "माला फेरत जुग भया, फिरा न मन का फेर। कर का मनका डार दे, मन का मनका फेर।।",
    meaningHindi:
      "हाथ में माला फेरते-फेरते युग बीत गया, पर मन की फिरन (भटकाव) नहीं बदली। कबीर कहते हैं कि हाथ की माला छोड़कर मन की माला फेरो — बाहरी कर्मकांड से अधिक महत्वपूर्ण है भीतर का परिवर्तन।",
    meaningEnglish:
      "Ages have passed turning prayer beads in the hand, yet the mind's restlessness never turned. Kabir says: drop the beads in your hand and turn the beads of your mind instead — inner transformation matters more than outer ritual.",
    theme: "bhakti",
  },
  {
    hindiText:
      "जिन खोजा तिन पाइयां, गहरे पानी पैठ। मैं बपुरा बूडन डरा, रहा किनारे बैठ।।",
    meaningHindi:
      "जिन्होंने गहरे पानी में उतरकर खोजा, उन्हें ही सत्य मिला। कबीर कहते हैं कि मैं डूबने के डर से किनारे बैठा रह गया। सच्चे ज्ञान की प्राप्ति के लिए गहन और साहसिक खोज आवश्यक है, सतही प्रयास पर्याप्त नहीं।",
    meaningEnglish:
      "Only those who dove into deep water and searched actually found what they sought. Kabir admits that fear of drowning kept him sitting at the shore. Real truth demands committed, courageous seeking — not a shallow effort.",
    theme: "atmagyan",
  },
  {
    hindiText:
      "तिनका कबहुँ ना निंदिये, जो पाँवन तर होय। कबहुँ उड़ी आँखिन पड़े, तो पीर घनेरी होय।।",
    meaningHindi:
      "पैरों तले पड़े एक छोटे तिनके को भी कभी तुच्छ मत समझो। यदि वही तिनका उड़कर आंख में पड़ जाए, तो बहुत पीड़ा देता है। कोई भी व्यक्ति या वस्तु, चाहे कितनी छोटी लगे, उसका अनादर नहीं करना चाहिए।",
    meaningEnglish:
      "Never belittle even a straw lying underfoot — should it blow into your eye, it causes great pain. No person or thing, however small it may seem, deserves to be looked down upon.",
    theme: "manavta",
  },
  {
    hindiText:
      "कबीरा खड़ा बाज़ार में, माँगे सबकी खैर। ना काहू से दोस्ती, न काहू से बैर।।",
    meaningHindi:
      "कबीर बाज़ार में खड़े होकर सबकी भलाई मांगते हैं — न किसी से विशेष मित्रता, न किसी से शत्रुता। यह दोहा समभाव और सार्वभौमिक शुभकामना का संदेश देता है, जो कबीर की मानवतावादी दृष्टि का केंद्र है।",
    meaningEnglish:
      "Kabir stands in the marketplace wishing everyone well — with special friendship for none, and enmity toward none. A statement of even-handed goodwill toward all, central to Kabir's humanist outlook.",
    theme: "manavta",
  },
  {
    hindiText:
      "माया मुई न मन मुआ, मरि-मरि गया सरीर। आसा त्रिसना न मुई, कह गए दास कबीर।।",
    meaningHindi:
      "शरीर बार-बार मरता है, पर माया (मोह) और मन की तृष्णा (लालसा) नहीं मरती। कबीर कहते हैं कि आशा और तृष्णा को भीतर से जीतना ही सच्ची उपलब्धि है, केवल शरीर का नष्ट होना कुछ नहीं बदलता।",
    meaningEnglish:
      "The body dies again and again, yet worldly attachment and craving never die with it. Kabir says true achievement lies in conquering desire and craving from within — the body's death alone changes nothing.",
    theme: "maya",
  },
  {
    hindiText:
      "मन के हारे हार है, मन के जीते जीत। कहे कबीर हरि पाइए, मन ही की परतीत।।",
    meaningHindi:
      "हार और जीत मन की ही अवस्था है — मन हारे तो हार, मन जीते तो जीत। कबीर कहते हैं कि ईश्वर की प्राप्ति भी मन के दृढ़ विश्वास से ही होती है। मनोबल जीवन में हर सफलता का आधार है।",
    meaningEnglish:
      "Defeat and victory both begin in the mind — a defeated mind loses, a resolute mind wins. Kabir says even the divine is found through firm inner conviction. Strength of mind underlies every success.",
    theme: "karma",
  },
  {
    hindiText:
      "पानी केरा बुदबुदा, अस मानुस की जात। एक दिना छिप जायेगा, ज्यों तारा परभात।।",
    meaningHindi:
      "मनुष्य का जीवन पानी के बुलबुले के समान क्षणभंगुर है। जैसे सुबह होते ही तारा आकाश से छिप जाता है, वैसे ही एक दिन यह जीवन भी समाप्त हो जाएगा। यह दोहा जीवन की नश्वरता का बोध कराता है।",
    meaningEnglish:
      "Human life is as fragile as a bubble on water. Just as a star disappears from the sky at dawn, this life too will one day end. A reminder of life's impermanence.",
    theme: "maya",
  },
  {
    hindiText:
      "कस्तूरी कुंडल बसै, मृग ढूँढ़े वन माहिं। ऐसे घट-घट राम हैं, दुनिया देखे नाहिं।।",
    meaningHindi:
      "कस्तूरी मृग की अपनी नाभि में ही होती है, पर वह उसे वन में ढूंढता फिरता है। वैसे ही ईश्वर प्रत्येक हृदय में विद्यमान है, पर संसार उसे बाहर खोजता रहता है। सत्य भीतर है, बाहर नहीं।",
    meaningEnglish:
      "The musk lies within the deer's own navel, yet it wanders the forest searching for its source. In the same way, the divine dwells in every heart, though the world keeps searching outside. Truth lies within, not without.",
    theme: "atmagyan",
  },
  {
    hindiText:
      "काल करे सो आज कर, आज करे सो अब। पल में परलय होयगी, बहुरि करेगा कब।।",
    meaningHindi:
      "जो काम कल करना है, उसे आज कर लो, और जो आज करना है, उसे अभी कर लो। क्योंकि एक पल में सब कुछ बदल सकता है — फिर तुम कब करोगे? यह दोहा शुभ कार्य में देरी न करने की सीख देता है।",
    meaningEnglish:
      "Do tomorrow's work today, and today's work right now — because everything can change in an instant, and then when will you ever do it? A call not to delay doing what is right.",
    theme: "karma",
  },
  {
    hindiText:
      "दुख में सुमिरन सब करे, सुख में करे न कोय। जो सुख में सुमिरन करे, तो दुख काहे को होय।।",
    meaningHindi:
      "दुख में तो सभी ईश्वर को याद करते हैं, पर सुख में कोई नहीं करता। कबीर कहते हैं कि यदि व्यक्ति सुख में भी ईश्वर का स्मरण करे, तो दुख आए ही क्यों। सच्ची भक्ति शर्तों पर आधारित नहीं होनी चाहिए।",
    meaningEnglish:
      "Everyone remembers the divine in times of suffering, but almost no one does in times of joy. Kabir says if one remembered the divine in joy too, why would sorrow ever come? True devotion should not be conditional on hardship.",
    theme: "bhakti",
  },
];

export const DOHA_THEME_LABELS: Record<DohaTheme, { hi: string; en: string }> = {
  guru: { hi: "गुरु", en: "Guru" },
  prem: { hi: "प्रेम", en: "Love" },
  satya: { hi: "सत्य", en: "Truth" },
  ahankar: { hi: "अहंकार", en: "Ego" },
  manavta: { hi: "मानवता", en: "Humanity" },
  bhakti: { hi: "भक्ति", en: "Devotion" },
  karma: { hi: "कर्म", en: "Action" },
  jaati: { hi: "जाति", en: "Caste" },
  dharma: { hi: "धर्म", en: "Religion" },
  maya: { hi: "माया", en: "Worldly Illusion" },
  atmagyan: { hi: "आत्मज्ञान", en: "Self-Knowledge" },
};
