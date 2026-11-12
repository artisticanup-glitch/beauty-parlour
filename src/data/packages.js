export const bridalPackageItems = [
  {
    id: "haldi",
    type: "toggle",
    name: {
      en: "Haldi Ceremony Look",
      hi: "हल्दी रस्म शृंगार",
    },
    description: {
      en: "Dewy radiant base, floral jewellery setting & hair styling",
      hi: "ताज़ा चमकदार बेस, फूलों के गहनों की सेटिंग और हेयर स्टाइलिंग",
    },
    price: 2500,
    priceFormatted: "₹2,500",
    defaultSelected: false,
  },
  {
    id: "mehendi_look",
    type: "toggle",
    name: {
      en: "Mehendi Ceremony Look",
      hi: "मेहंदी रस्म शृंगार",
    },
    description: {
      en: "Vibrant festive makeup, hair braid/curls & styling",
      hi: "जीवंत उत्सव मेकअप, हेयर स्टाइलिंग और टच-अप",
    },
    price: 3500,
    priceFormatted: "₹3,500",
    defaultSelected: false,
  },
  {
    id: "shaadi",
    type: "choice",
    name: {
      en: "Wedding Day Bridal Look (Shaadi)",
      hi: "मुख्य विवाह शृंगार (शादी)",
    },
    options: [
      {
        id: "shaadi_hd",
        name: {
          en: "HD Bridal Makeup",
          hi: "एचडी ब्राइडल मेकअप",
        },
        description: {
          en: "Lashes, hair bun, dupatta setting & jewellery placement",
          hi: "पलकें, ब्राइडल जूड़ा, दुपट्टा सेटिंग व आभूषण सज्जा",
        },
        price: 11000,
        priceFormatted: "₹11,000",
      },
      {
        id: "shaadi_airbrush",
        name: {
          en: "Airbrush Bridal Makeup",
          hi: "एयरब्रश ब्राइडल मेकअप",
        },
        description: {
          en: "Waterproof silicon airbrush, premium lashes, deluxe styling",
          hi: "वाटरप्रूफ सिलिकॉन बेस, प्रीमियम पलकें, संपूर्ण लक्ज़री स्टाइलिंग",
        },
        price: 18000,
        priceFormatted: "₹18,000",
      },
    ],
    defaultSelected: "shaadi_hd",
  },
  {
    id: "reception",
    type: "toggle",
    name: {
      en: "Reception Evening Look",
      hi: "रिसेप्शन संध्या शृंगार",
    },
    description: {
      en: "Modern glamorous makeup, open waves styling & gown draping",
      hi: "आधुनिक ग्लैमरस मेकअप, हेयर वेव्स और परिधान ड्रेपिंग",
    },
    price: 6500,
    priceFormatted: "₹6,500",
    defaultSelected: false,
  },
  {
    id: "bridal_mehendi",
    type: "toggle",
    name: {
      en: "Bridal Mehendi (Hands & Feet)",
      hi: "ब्राइडल मेहंदी (दोनों हाथ व पैर)",
    },
    description: {
      en: "Elbow to fingertip intricate figure work with pure natural henna",
      hi: "कोहनी तक बारीक आकृतियों वाली प्राकृतिक मेहंदी",
    },
    price: 5100,
    priceFormatted: "₹5,100",
    defaultSelected: false,
  },
  {
    id: "family_members",
    type: "stepper",
    name: {
      en: "Family Members & Sisters Makeup",
      hi: "परिवार के सदस्यों व बहनों का मेकअप",
    },
    description: {
      en: "Graceful party look for mother, sisters & relatives",
      hi: "माताजी, बहनों व परिवार के सदस्यों के लिए पार्टी मेकअप",
    },
    unitPrice: 1500,
    unitPriceFormatted: "₹1,500 प्रति व्यक्ति",
    min: 0,
    max: 10,
    defaultCount: 0,
  },
]
