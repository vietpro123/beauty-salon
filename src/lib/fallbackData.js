// Fallback content if entities haven't been seeded yet.
export const FALLBACK_SERVICES = [
  {
    slug: "balayage",
    name: "Signature Balayage",
    category: "hair",
    tagline: "Hand-painted dimension, sun-kissed finish.",
    description:
      "A bespoke hair-painting technique that delivers soft, natural-looking highlights tailored to your face and lifestyle.",
    long_description:
      "Our Signature Balayage is a freehand color application performed by our master colorists. Each strand is hand-selected and painted to create movement, dimension, and a finish that grows out beautifully for up to four months. Includes consultation, color service, gloss treatment, bespoke blow-dry, and styling.",
    starting_price: 285,
    duration_minutes: 210,
    image_url: "https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/0e150b48b_generated_12a9b7fa.png",
    featured: true,
    preparation_steps: [
      "Arrive with hair washed 24–48 hours prior",
      "Bring reference images if helpful",
      "Skip heavy oils or leave-ins the day of your appointment",
      "Plan for up to 4 hours in the chair",
    ],
    faq: [
      { question: "How long does balayage last?", answer: "Depending on home care, most clients return every 10–14 weeks for a refresh." },
      { question: "Will it damage my hair?", answer: "We use bond-building systems throughout the service to preserve integrity and shine." },
      { question: "Can I do this on dark hair?", answer: "Absolutely — we customize lift levels to create dimension on any base tone." },
    ],
  },
  {
    slug: "precision-cut",
    name: "Precision Cut & Finish",
    category: "hair",
    tagline: "Architecture for your hair.",
    description: "A considered cut built around your bone structure, texture, and daily rituals.",
    long_description:
      "Every Precision Cut begins with a 15-minute consultation to understand your lifestyle, styling routine, and the silhouette you want to live in. Includes shampoo, scalp massage, cut, and a signature blow-dry.",
    starting_price: 120,
    duration_minutes: 75,
    image_url: "https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/7f5449c2f_generated_57642b9b.png",
    featured: false,
    preparation_steps: ["Wear something you'd normally wear", "Come with hair styled as you usually do", "Bring inspiration — we love collaboration"],
    faq: [{ question: "How often should I cut?", answer: "We typically recommend every 8–10 weeks for shape retention." }],
  },
  {
    slug: "glossing-treatment",
    name: "Luminous Gloss",
    category: "hair",
    tagline: "Liquid light for your hair.",
    description: "A shine-enhancing, tone-refining gloss that restores vibrancy between color appointments.",
    long_description:
      "This 45-minute treatment refreshes tone, seals the cuticle, and adds mirror-like shine. Perfect between balayage visits or as a standalone glow-up.",
    starting_price: 85,
    duration_minutes: 45,
    image_url: "https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/0e150b48b_generated_12a9b7fa.png",
    featured: false,
    preparation_steps: ["Arrive with clean, dry hair", "Avoid silicone-heavy products 24 hours prior"],
    faq: [{ question: "Is it a permanent color?", answer: "Gloss is semi-permanent and fades gracefully over 4–6 weeks." }],
  },
  {
    slug: "hydrafacial",
    name: "The HydraFacial Ritual",
    category: "skin",
    tagline: "Clinical hydration, editorial glow.",
    description: "A multi-step resurfacing treatment that cleanses, extracts, and infuses skin with potent serums.",
    long_description:
      "Our signature 60-minute HydraFacial Ritual includes a lymphatic primer, deep cleanse, gentle exfoliation, painless extractions, antioxidant infusion, and a finishing LED therapy. You'll leave with skin that feels quieter, brighter, and profoundly hydrated.",
    starting_price: 245,
    duration_minutes: 60,
    image_url: "https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/d7a50d4c8_generated_5d7fc6a8.png",
    featured: true,
    preparation_steps: [
      "Avoid retinoids for 3 days before",
      "Come with a bare face if possible",
      "Stay hydrated the morning of",
      "Skip exfoliating acids 48 hours prior",
    ],
    faq: [
      { question: "How often should I get a HydraFacial?", answer: "Most clients benefit from a treatment every 4 weeks." },
      { question: "Is there any downtime?", answer: "None — your skin will look radiant immediately after." },
      { question: "Can I wear makeup after?", answer: "We recommend waiting 4–6 hours so serums can fully absorb." },
    ],
  },
  {
    slug: "signature-facial",
    name: "Signature Bespoke Facial",
    category: "skin",
    tagline: "An hour of considered ritual.",
    description: "A fully customized facial tailored to your skin on the day.",
    long_description:
      "We begin with a thorough skin analysis, then design a 75-minute protocol that may include enzyme exfoliation, high-frequency therapy, a bespoke mask, and facial massage.",
    starting_price: 185,
    duration_minutes: 75,
    image_url: "https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/18817d61a_generated_67d1be5b.png",
    featured: false,
    preparation_steps: ["Arrive with clean skin", "Let us know about any recent treatments"],
    faq: [{ question: "Is this good for sensitive skin?", answer: "Yes — every protocol is adjusted to your skin's tolerance." }],
  },
  {
    slug: "gel-manicure",
    name: "Luxe Gel Manicure",
    category: "nails",
    tagline: "Two weeks of flawless finish.",
    description: "A refined manicure with long-wear gel polish and a hand ritual.",
    long_description:
      "Includes shape, cuticle care, a warm hand soak, exfoliation, massage with nourishing balm, and gel polish application in your chosen shade.",
    starting_price: 75,
    duration_minutes: 60,
    image_url: "https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/9afc0510b_generated_0a151b44.png",
    featured: false,
    preparation_steps: ["Remove previous polish or let us know to include removal", "Bring a reference if you have one"],
    faq: [{ question: "How long does gel last?", answer: "Typically 2–3 weeks with proper home care." }],
  },
  {
    slug: "signature-pedicure",
    name: "Signature Spa Pedicure",
    category: "nails",
    tagline: "A ritual of renewal from the ground up.",
    description: "An elevated pedicure experience with warm soak, exfoliation, and meticulous polish.",
    long_description:
      "Our 75-minute Signature Spa Pedicure begins with a warm herbal foot soak, followed by expert shaping, cuticle care, a revitalizing sugar scrub, and an extended massage with shea butter. Finished with your choice of classic or gel polish.",
    starting_price: 95,
    duration_minutes: 75,
    image_url: "https://media.base44.com/images/public/6a16aa721bc0ca9b12553699/11834e667_generated_image.png",
    featured: false,
    preparation_steps: ["Remove existing polish before arrival", "Wear open-toed shoes", "Let us know of any skin sensitivities"],
    faq: [{ question: "How long does a pedicure last?", answer: "With gel polish, expect 3–4 weeks of flawless wear." }],
  },
  {
    slug: "bridal-package",
    name: "Bridal Atelier",
    category: "hair",
    tagline: "A curated day of becoming.",
    description: "A full-service bridal package including trial, day-of hair and makeup.",
    long_description:
      "Designed for the bride who wants to feel unmistakably herself. Includes a 2-hour trial session, wedding-day styling, and a touch-up kit.",
    starting_price: 750,
    duration_minutes: 180,
    image_url: "https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/c058cb48b_generated_334ff08c.png",
    featured: true,
    preparation_steps: ["Book trial 4–6 weeks before", "Bring veil or accessories", "Share your dress neckline"],
    faq: [{ question: "Do you travel?", answer: "Yes, on-location services are available with a travel fee." }],
  },
];

export const FALLBACK_STYLISTS = [
  {
    slug: "amelia-voss",
    name: "Amelia Voss",
    title: "Master Colorist & Creative Director",
    bio: [
      "With 14 years and training at Vidal Sassoon London, Amelia is known for her painterly approach to balayage.",
      "She builds color stories that feel inevitably right — dimensional, personal, and impossibly natural."
    ],
    portrait_url: "https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/03f5b8c3e_generated_02d64bdd.png",
    portrait_color_url: "https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/61a7ba9a2_generated_d52caeb7.png",
    specialties: ["Balayage", "Blonde Specialist", "Editorial Color"],
    years_experience: 14,
    display_order: 1,
  },
  {
    slug: "julian-reyes",
    name: "Julian Reyes",
    title: "Senior Stylist",
    bio: [
      "Julian's precision cutting has been featured in three international editorials.",
      "His work is architectural — built around the way you actually live."
    ],
    portrait_url: "https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/55cf38649_generated_6de6482d.png",
    portrait_color_url: "https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/32005f737_generated_3c1da01b.png",
    specialties: ["Precision Cuts", "Men's Grooming", "Curly Hair"],
    years_experience: 9,
    display_order: 2,
  },
  {
    slug: "nadia-okafor",
    name: "Nadia Okafor",
    title: "Lead Esthetician",
    bio: [
      "A licensed medical esthetician, Nadia brings a clinical sensibility to every facial.",
      "Her HydraFacial protocols are the reason many of our clients travel across the city."
    ],
    portrait_url: "https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/d07bb64cf_generated_412f7bbb.png",
    portrait_color_url: "https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/14299a6d8_generated_51d38518.png",
    specialties: ["HydraFacial", "Acne Protocols", "Corrective Skin"],
    years_experience: 11,
    display_order: 3,
  },
];

export const FALLBACK_GALLERY = [
  { title: "Radiance Facial", category: "skin", image_url: "https://media.base44.com/images/public/6a16aa721bc0ca9b12553699/fe4ba3d20_generated_image.png", description: "Hydrating vitamin C facial with luminous results." },
  { title: "Bridal Chignon", category: "bridal", image_url: "https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/c058cb48b_generated_334ff08c.png", description: "Low chignon with pearl detailing." },
  { title: "Architectural Bob", category: "cuts", image_url: "https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/04e7a210e_generated_270fe41f.png", description: "A sharp, glossy one-length bob." },
  { title: "Copper Renaissance", category: "color", image_url: "https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/69d46f537_generated_9c8d3588.png", description: "Rich, dimensional copper with gloss finish." },
  { title: "Minimalist Manicure", category: "nails", image_url: "https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/982264062_generated_7a2441d4.png", description: "Nude French with subtle glow." },
  { title: "Luminous Complexion", category: "skin", image_url: "https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/643101723_generated_e96cbe87.png", description: "Post-HydraFacial glow." },
  { title: "Layered Texture", category: "cuts", image_url: "https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/b28ed9df4_generated_187b3d03.png", description: "Soft curtain layers on caramel hair." },
  { title: "Soft Wave Bride", category: "bridal", image_url: "https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/c058cb48b_generated_334ff08c.png", description: "Undone bridal waves." },
  { title: "Chrome Manicure", category: "nails", image_url: "https://media.base44.com/images/public/6a16aa721bc0ca9b12553699/383024eba_generated_image.png", description: "Subtle chrome finish on nude gel." },
  { title: "Chocolate Balayage", category: "color", image_url: "https://media.base44.com/images/public/6a16aa721bc0ca9b12553699/a94fec8fa_generated_image.png", description: "Rich chocolate tones with soft dimension." },
  { title: "Calming Ritual", category: "skin", image_url: "https://media.base44.com/images/public/6a16aa721bc0ca9b12553699/11fe7131c_generated_image.png", description: "Calming green tea mask treatment." },
  { title: "LED Therapy", category: "skin", image_url: "https://media.base44.com/images/public/6a16aa721bc0ca9b12553699/f798c2515_generated_image.png", description: "Revitalizing LED light therapy facial." },
];

export const FALLBACK_TESTIMONIALS = [
  { client_name: "Elena M.", service: "Signature Balayage", quote: "Amelia didn't give me a hair color — she gave me a version of myself I didn't know I was looking for. Four months later, it still looks effortless.", rating: 5 },
  { client_name: "Tobias R.", service: "Precision Cut", quote: "Julian asked me more thoughtful questions in ten minutes than any stylist has in a decade. The cut has held its shape through three weeks of travel.", rating: 5 },
  { client_name: "Priya S.", service: "HydraFacial Ritual", quote: "I walked out feeling like my skin had exhaled. Nadia is equal parts clinician and artist — a rare combination.", rating: 5 },
  { client_name: "Margot L.", service: "Bridal Atelier", quote: "My wedding day felt like a continuation of myself, not a costume. I can't think of a higher compliment for a bridal stylist.", rating: 5 },
];