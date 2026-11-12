export const serviceCategories = [
  { id: "bridal", name: { en: "Bridal", hi: "ब्राइडल" } },
  { id: "makeup", name: { en: "Makeup", hi: "मेकअप" } },
  { id: "hair", name: { en: "Hair", hi: "केश सज्जा" } },
  { id: "skin", name: { en: "Skin", hi: "त्वचा देखभाल" } },
  { id: "hands-feet", name: { en: "Hands & Feet", hi: "हाथ और पैर" } },
  { id: "mehendi", name: { en: "Mehendi", hi: "मेहंदी" } },
]

export const services = [
  // BRIDAL
  {
    id: "hd-bridal-makeup",
    category: "bridal",
    name: {
      en: "HD Bridal Makeup",
      hi: "एचडी ब्राइडल मेकअप",
    },
    description: {
      en: "Flawless camera-ready finish with premium HD products, lashes and hair styling.",
      hi: "प्रीमियम उत्पादों के साथ बेदाग कैमरा-रेडी फिनिश, पलकें और संपूर्ण हेयर स्टाइलिंग।",
    },
    price: 11000,
    priceFormatted: "₹11,000",
    duration: {
      en: "3.5 Hours",
      hi: "3.5 घंटे",
    },
    image: "/images/service-bridal.webp",
  },
  {
    id: "airbrush-bridal-makeup",
    category: "bridal",
    name: {
      en: "Airbrush Bridal Makeup",
      hi: "एयरब्रश ब्राइडल मेकअप",
    },
    description: {
      en: "Ultra-fine silicon-based coverage that stays waterproof and weightless all night.",
      hi: "अल्ट्रा-फाइन सिलिकॉन बेस जो पूरी रात वाटरप्रूफ और हल्का बना रहता है।",
    },
    price: 18000,
    priceFormatted: "₹18,000",
    duration: {
      en: "4 Hours",
      hi: "4 घंटे",
    },
    image: "/images/shaadi.webp",
  },
  {
    id: "engagement-look",
    category: "bridal",
    name: {
      en: "Engagement Look",
      hi: "सगाई शृंगार (एंगेजमेंट लुक)",
    },
    description: {
      en: "Soft glowy base, defined eyes, elegant hairdo, and dupatta draping.",
      hi: "हल्का चमकदार बेस, सुंदर आंखें, सुरुचिपूर्ण हेयरडू और दुपट्टा ड्रेपिंग।",
    },
    price: 5500,
    priceFormatted: "₹5,500",
    duration: {
      en: "2.5 Hours",
      hi: "2.5 घंटे",
    },
    image: "/images/gallery-02.webp",
  },
  {
    id: "reception-look",
    category: "bridal",
    name: {
      en: "Reception Look",
      hi: "रिसेप्शन लुक",
    },
    description: {
      en: "Glamorous evening makeup with modern hair styling and jewellery placement.",
      hi: "आधुनिक हेयर स्टाइलिंग और आभूषण सज्जा के साथ आकर्षक शाम का मेकअप।",
    },
    price: 6500,
    priceFormatted: "₹6,500",
    duration: {
      en: "2.5 Hours",
      hi: "2.5 घंटे",
    },
    image: "/images/reception.webp",
  },
  {
    id: "haldi-look",
    category: "bridal",
    name: {
      en: "Haldi Look",
      hi: "हल्दी शृंगार",
    },
    description: {
      en: "Fresh dewy base, floral jewellery setting, and sweat-proof makeup.",
      hi: "ताजा ड्यूई बेस, फूलों के गहनों की सेटिंग और पसीना-रोधी हल्का मेकअप।",
    },
    price: 2500,
    priceFormatted: "₹2,500",
    duration: {
      en: "1.5 Hours",
      hi: "1.5 घंटे",
    },
    image: "/images/haldi.webp",
  },
  {
    id: "bridal-trial-session",
    category: "bridal",
    name: {
      en: "Bridal Trial Session",
      hi: "ब्राइडल ट्रायल सत्र",
    },
    description: {
      en: "Complete undertone matching, eye makeup trial, and bridal look consultation before wedding day.",
      hi: "विवाह पूर्व त्वचा टोन का मिलान, आई मेकअप का परीक्षण और संपूर्ण ब्राइडल लुक परामर्श।",
    },
    price: 2100,
    priceFormatted: "₹2,100",
    duration: {
      en: "2 Hours",
      hi: "2 घंटे",
    },
    image: "/images/service-bridal.webp",
  },

  // MAKEUP
  {
    id: "party-makeup",
    category: "makeup",
    name: {
      en: "Party Makeup",
      hi: "पार्टी मेकअप",
    },
    description: {
      en: "Classic evening base, liner, soft lips, and basic hair styling.",
      hi: "सुंदर शाम का बेस, लाइनर, सॉफ्ट लिप्स और सामान्य हेयर स्टाइलिंग।",
    },
    price: 1800,
    priceFormatted: "₹1,800",
    duration: {
      en: "1.5 Hours",
      hi: "1.5 घंटे",
    },
    image: "/images/service-makeup.webp",
  },
  {
    id: "hd-party-makeup",
    category: "makeup",
    name: {
      en: "HD Party Makeup",
      hi: "एचडी पार्टी मेकअप",
    },
    description: {
      en: "High-definition contouring and eye makeup for sisters and close relatives.",
      hi: "बहनों और करीबी रिश्तेदारों के लिए हाई-डेफिनिशन कंटूरिंग और आई मेकअप।",
    },
    price: 2800,
    priceFormatted: "₹2,800",
    duration: {
      en: "2 Hours",
      hi: "2 घंटे",
    },
    image: "/images/gallery-04.webp",
  },
  {
    id: "saree-draping",
    category: "makeup",
    name: {
      en: "Saree Draping",
      hi: "साड़ी ड्रेपिंग",
    },
    description: {
      en: "Crisp pleating in traditional, Bengali, Gujarati, or lehenga style.",
      hi: "पारंपरिक, बंगाली, गुजराती या लहंगा स्टाइल में साफ प्लीट्स के साथ ड्रेपिंग।",
    },
    price: 400,
    priceFormatted: "₹400",
    duration: {
      en: "30 Mins",
      hi: "30 मिनट",
    },
    image: "/images/gallery-05.webp",
  },
  {
    id: "family-member-makeup",
    category: "makeup",
    name: {
      en: "Family Member Makeup",
      hi: "पारिवारिक सदस्य मेकअप",
    },
    description: {
      en: "Neat, graceful event makeup suited for mothers and relatives.",
      hi: "माताओं और परिजनों के लिए शालीन और सुंदर मेकअप।",
    },
    price: 1500,
    priceFormatted: "₹1,500",
    duration: {
      en: "1 Hour",
      hi: "1 घंटा",
    },
    image: "/images/gallery-06.webp",
  },
  {
    id: "airbrush-party-makeup",
    category: "makeup",
    name: {
      en: "Airbrush Party Makeup",
      hi: "एयरब्रश पार्टी मेकअप",
    },
    description: {
      en: "Weightless HD airbrush coverage for cocktail parties, engagements, and sangeet.",
      hi: "कॉकटेल पार्टी, एंगेजमेंट और संगीत के लिए हल्का व टिकाऊ एयरब्रश मेकअप।",
    },
    price: 3500,
    priceFormatted: "₹3,500",
    duration: {
      en: "2 Hours",
      hi: "2 घंटे",
    },
    image: "/images/service-makeup.webp",
  },
  {
    id: "eye-makeup-lashes",
    category: "makeup",
    name: {
      en: "Eye Artistry & 3D Lashes",
      hi: "आई आर्टिस्ट्री एवं 3D लैशेज़",
    },
    description: {
      en: "Smokey or shimmer eye look with precise wing liner and featherlight 3D lash application.",
      hi: "स्मोकी अथवा शिमर आई लुक, सटीक विंग लाइनर और हल्की 3D पलकों की सेटिंग।",
    },
    price: 900,
    priceFormatted: "₹900",
    duration: {
      en: "45 Mins",
      hi: "45 मिनट",
    },
    image: "/images/gallery-04.webp",
  },

  // HAIR
  {
    id: "haircut",
    category: "hair",
    name: {
      en: "Haircut & Styling",
      hi: "हेयरकट और स्टाइलिंग",
    },
    description: {
      en: "Layered, feather, or precision cut followed by a professional blow-dry.",
      hi: "लेयर, फेदर या सटीक कटिंग के साथ पेशेवर ब्लो-ड्राई फिनिश।",
    },
    price: 300,
    priceFormatted: "₹300",
    duration: {
      en: "45 Mins",
      hi: "45 मिनट",
    },
    image: "/images/service-hair.webp",
  },
  {
    id: "hair-spa",
    category: "hair",
    name: {
      en: "Hair Spa",
      hi: "हेयर स्पा",
    },
    description: {
      en: "Deep scalp nourishment, steam therapy, and smoothing hair mask.",
      hi: "गहरा पोषण, स्टीम थेरेपी और बालों को मुलायम बनाने वाला मास्क।",
    },
    price: 900,
    priceFormatted: "₹900",
    duration: {
      en: "1 Hour",
      hi: "1 घंटा",
    },
    image: "/images/gallery-07.webp",
  },
  {
    id: "keratin-treatment",
    category: "hair",
    name: {
      en: "Keratin Treatment",
      hi: "केराटिन ट्रीटमेंट",
    },
    description: {
      en: "Intense frizz control and silk shine lasting up to four months.",
      hi: "चार महीने तक चलने वाला फ्रिज़ नियंत्रण और रेशमी चमक।",
    },
    price: 3500,
    priceFormatted: "₹3,500 से",
    duration: {
      en: "3 Hours",
      hi: "3 घंटे",
    },
    image: "/images/gallery-08.webp",
  },
  {
    id: "bridal-hairstyle",
    category: "hair",
    name: {
      en: "Bridal Hairstyle",
      hi: "ब्राइडल जूड़ा व हेयरडू",
    },
    description: {
      en: "Ornate traditional bun, fresh flower setting, and matha patti pinning.",
      hi: "सजावटी जूड़ा, ताजे फूलों की सेटिंग और माथा पट्टी की सुरक्षित पिनिंग।",
    },
    price: 1500,
    priceFormatted: "₹1,500",
    duration: {
      en: "1 Hour",
      hi: "1 घंटा",
    },
    image: "/images/gallery-09.webp",
  },
  {
    id: "hair-colour",
    category: "hair",
    name: {
      en: "Hair Colour",
      hi: "हेयर कलरिंग",
    },
    description: {
      en: "Root touch-up or global shades with ammonia-free safe formulations.",
      hi: "अमोनिया-मुक्त सुरक्षित रंगों से रूट टच-अप अथवा ग्लोबल कलर।",
    },
    price: 1200,
    priceFormatted: "₹1,200 से",
    duration: {
      en: "1.5 Hours",
      hi: "1.5 घंटे",
    },
    image: "/images/gallery-10.webp",
  },
  {
    id: "hair-botox",
    category: "hair",
    name: {
      en: "Hair Botox & Deep Repair",
      hi: "हेयर बोटॉक्स एवं डीप रिपेयर",
    },
    description: {
      en: "Deep restructuring therapy restoring silk softness, strength, and brilliant shine to dull hair.",
      hi: "रूखे बालों को गहराई से पोषण, रेशमी कोमलता और प्राकृतिक मजबूती प्रदान करने वाला उपचार।",
    },
    price: 2800,
    priceFormatted: "₹2,800 से",
    duration: {
      en: "2.5 Hours",
      hi: "2.5 घंटे",
    },
    image: "/images/service-hair.webp",
  },

  // SKIN
  {
    id: "cleanup",
    category: "skin",
    name: {
      en: "Skin Clean-up",
      hi: "स्किन क्लीन-अप",
    },
    description: {
      en: "Gentle exfoliation, blackhead clearing, steam, and pore soothing pack.",
      hi: "डेड स्किन और ब्लैकहेड्स हटाना, स्टीम और त्वचा को शांत करने वाला पैक।",
    },
    price: 500,
    priceFormatted: "₹500",
    duration: {
      en: "45 Mins",
      hi: "45 मिनट",
    },
    image: "/images/service-skin.webp",
  },
  {
    id: "fruit-facial",
    category: "skin",
    name: {
      en: "Fruit Facial",
      hi: "फ्रूट फेशियल",
    },
    description: {
      en: "Natural fruit extract therapy to refresh tired skin and boost moisture.",
      hi: "प्राकृतिक फलों के सत्व से त्वचा में ताजगी और नमी का संचार।",
    },
    price: 800,
    priceFormatted: "₹800",
    duration: {
      en: "1 Hour",
      hi: "1 घंटा",
    },
    image: "/images/gallery-11.webp",
  },
  {
    id: "gold-facial",
    category: "skin",
    name: {
      en: "Gold Facial",
      hi: "गोल्ड फेशियल",
    },
    description: {
      en: "Luxurious radiance treatment imparting a warm, festive golden glow.",
      hi: "उत्सव के अवसर के लिए चेहरे पर निखार और सुनहरा निखार देने वाला उपचार।",
    },
    price: 1500,
    priceFormatted: "₹1,500",
    duration: {
      en: "1.5 Hours",
      hi: "1.5 घंटे",
    },
    image: "/images/gallery-12.webp",
  },
  {
    id: "bridal-glow-facial",
    category: "skin",
    name: {
      en: "Bridal Glow Facial",
      hi: "ब्राइडल ग्लो फेशियल",
    },
    description: {
      en: "Multi-step deep brightening ritual customized for upcoming wedding dates.",
      hi: "विवाह के लिए विशेष बहु-चरणीय त्वचा निखार और चमक देने वाला फेशियल।",
    },
    price: 2500,
    priceFormatted: "₹2,500",
    duration: {
      en: "2 Hours",
      hi: "2 घंटे",
    },
    image: "/images/service-skin.webp",
  },
  {
    id: "threading",
    category: "skin",
    name: {
      en: "Eyebrow Threading",
      hi: "आईब्रो थ्रेडिंग",
    },
    description: {
      en: "Precise eyebrow shaping with sanitized organic cotton thread.",
      hi: "साफ-सुथरे कॉटन धागे से सटीक और आरामदायक आइब्रो शेपिंग।",
    },
    price: 40,
    priceFormatted: "₹40",
    duration: {
      en: "15 Mins",
      hi: "15 मिनट",
    },
    image: "/images/service-makeup.webp",
  },
  {
    id: "full-arms-waxing",
    category: "skin",
    name: {
      en: "Full Arms Waxing",
      hi: "फुल आर्म्स वैक्सिंग",
    },
    description: {
      en: "Smooth hair removal using skin-friendly gentle chocolate wax.",
      hi: "स्किन-फ्रेंडली चॉकलेट वैक्स से कोमल और साफ त्वचा।",
    },
    price: 350,
    priceFormatted: "₹350",
    duration: {
      en: "30 Mins",
      hi: "30 मिनट",
    },
    image: "/images/gallery-01.webp",
  },

  // HANDS & FEET
  {
    id: "manicure",
    category: "hands-feet",
    name: {
      en: "Luxury Manicure",
      hi: "लक्ज़री मैनीक्योर",
    },
    description: {
      en: "Nail shaping, cuticle therapy, softening scrub, and relaxing hand massage.",
      hi: "नाखूनों की शेपिंग, क्यूटिकल केयर, स्क्रब और आरामदायक हैंड मसाज।",
    },
    price: 500,
    priceFormatted: "₹500",
    duration: {
      en: "45 Mins",
      hi: "45 मिनट",
    },
    image: "/images/service-nails.webp",
  },
  {
    id: "pedicure",
    category: "hands-feet",
    name: {
      en: "Luxury Pedicure",
      hi: "लक्ज़री पेडीक्योर",
    },
    description: {
      en: "Warm foot soak, heel buffing, herbal scrub, and soothing foot care.",
      hi: "गुनगुने पानी में सोक, एड़ी की सफाई, हर्बल स्क्रब और फुट केयर।",
    },
    price: 700,
    priceFormatted: "₹700",
    duration: {
      en: "1 Hour",
      hi: "1 घंटा",
    },
    image: "/images/gallery-03.webp",
  },
  {
    id: "gel-nails",
    category: "hands-feet",
    name: {
      en: "Gel Nails Extensions",
      hi: "जेल नेल्स एक्सटेंशन",
    },
    description: {
      en: "Durable extensions with chip-resistant gel polish and subtle bridal accents.",
      hi: "मजबूत एक्सटेंशन, लंबे समय तक टिकने वाली जेल पॉलिश और सुंदर डिजाइन।",
    },
    price: 1200,
    priceFormatted: "₹1,200",
    duration: {
      en: "1.5 Hours",
      hi: "1.5 घंटे",
    },
    image: "/images/service-nails.webp",
  },

  // MEHENDI
  {
    id: "bridal-mehendi",
    category: "mehendi",
    name: {
      en: "Bridal Mehendi (Hands & Feet)",
      hi: "ब्राइडल मेहंदी (दोनों हाथ व पैर)",
    },
    description: {
      en: "Intricate traditional Rajasthani and figure motifs with organic natural cone.",
      hi: "प्राकृतिक ऑर्गेनिक मेहंदी से पारंपरिक राजस्थानी और सुंदर आकृतियों वाला डिजाइन।",
    },
    price: 5100,
    priceFormatted: "₹5,100",
    duration: {
      en: "5 Hours",
      hi: "5 घंटे",
    },
    image: "/images/service-mehendi.webp",
  },
  {
    id: "party-mehendi",
    category: "mehendi",
    name: {
      en: "Party Mehendi",
      hi: "पार्टी मेहंदी",
    },
    description: {
      en: "Arabic or delicate floral patterns for hands on festive occasions.",
      hi: "त्योहारों और उत्सवों के लिए अरेबिक या बारीक फूलों वाला मेहंदी डिजाइन।",
    },
    price: 800,
    priceFormatted: "₹800",
    duration: {
      en: "1 Hour",
      hi: "1 घंटा",
    },
    image: "/images/mehendi.webp",
  },
  {
    id: "engagement-mehendi",
    category: "mehendi",
    name: {
      en: "Sangeet & Engagement Mehendi",
      hi: "संगीत एवं सगाई मेहंदी",
    },
    description: {
      en: "Elbow-length intricate floral and jali patterns using 100% natural organic dark-stain henna.",
      hi: "शुद्ध प्राकृतिक मेंहदी से कोहनी तक सुंदर जाल और फूलों वाला उत्सव डिजाइन।",
    },
    price: 2100,
    priceFormatted: "₹2,100",
    duration: {
      en: "2.5 Hours",
      hi: "2.5 घंटे",
    },
    image: "/images/service-mehendi.webp",
  },
]
