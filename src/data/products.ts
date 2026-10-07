import { Product } from '../types';

export const HERO_IMAGE = '/src/assets/images/ac_hero_sanctum_1791361831100.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-hidden-blade',
    name: 'Dual-Action Phantom Hidden Blade',
    category: 'blades',
    priceBDT: 8500,
    priceUSD: 75,
    rating: 4.95,
    reviewsCount: 142,
    inStock: true,
    stockCount: 14,
    image: '/src/assets/images/ac_hidden_blade_replica_1791361850702.jpg',
    era: 'Italian Renaissance, 1500',
    description: 'Masterwork spring-loaded hidden blade mechanism housed within an embossed full-grain Italian leather bracer. Features dual-action ring pull trigger for seamless extension and stealth retraction.',
    materials: ['Damascus Carbon Steel', 'Vegetable-Tanned Italian Leather', 'Silver Filigree Rivets', 'Internal Spring Coil'],
    specs: {
      dimensions: 'Blade: 21 cm / Bracer: 28 cm',
      weight: '640 g',
      craftsmanship: 'Hand-assembled in Venice Armory guild',
      rarity: 'Legendary'
    },
    loreSnippet: '"A blade that moves like an extension of your own hand. Silence is your shield, swiftness your armor."',
    featured: true
  },
  {
    id: 'prod-master-cloak',
    name: 'Master Assassin Velvet & Wool Cloak',
    category: 'apparel',
    priceBDT: 12900,
    priceUSD: 115,
    rating: 4.88,
    reviewsCount: 96,
    inStock: true,
    stockCount: 8,
    image: '/src/assets/images/ac_master_cloak_1791361867778.jpg',
    era: 'Masyaf Levant, 1191',
    description: 'Heavyweight charcoal brushed virgin wool cape featuring tailored crimson silk lining, deep shadow-casting cowl hood, and solid cast antique bronze brotherhood eagle clasp.',
    materials: ['Virgin Charcoal Wool (480 GSM)', 'Crimson Mulberry Silk Lining', 'Cast Bronze Eagle Brooch', 'Waxed Cord Stitching'],
    specs: {
      dimensions: 'Full Length: 145 cm (Drop Hem)',
      weight: '1.4 kg',
      craftsmanship: 'Hand-loomed archival weave with weather-repellent finish',
      rarity: 'Masterwork'
    },
    loreSnippet: '"We work in the dark to serve the light. The cowl shields the gaze of kings and cutthroats alike."',
    featured: true
  },
  {
    id: 'prod-apple-of-eden',
    name: 'The Apple of Eden (First Civilization Relic)',
    category: 'relics',
    priceBDT: 18500,
    priceUSD: 165,
    rating: 5.0,
    reviewsCount: 210,
    inStock: true,
    stockCount: 5,
    image: '/src/assets/images/ac_apple_of_eden_1791361883424.jpg',
    era: 'Precursor Isu Era',
    description: 'Full-scale 1:1 artifact replica forged in solid brushed brass with illuminated internal amber precursor luminescence. Activated by touch sensors with rhythmic Isu glyph breathing pulses.',
    materials: ['Antiqued Brushed Brass Shell', 'Amber LED Precursor Pulse Array', 'Magnetic Display Pedestal', 'Rechargeable USB-C Core'],
    specs: {
      dimensions: 'Diameter: 9.8 cm (Sphere)',
      weight: '1.1 kg',
      craftsmanship: 'Precision CNC engraved Isu script with micro-patina',
      rarity: 'First Civilization Isu'
    },
    loreSnippet: '"Knowledge. Power. Submission. Those who hold the Apple perceive the strands of time itself."',
    featured: true
  },
  {
    id: 'prod-damascus-dagger',
    name: 'Brotherhood Damascus Combat Dagger',
    category: 'blades',
    priceBDT: 6800,
    priceUSD: 60,
    rating: 4.92,
    reviewsCount: 78,
    inStock: true,
    stockCount: 19,
    image: '/src/assets/images/ac_brotherhood_dagger_1791361894696.jpg',
    era: 'Crusades Era, 1191',
    description: 'Traditional close-quarters assassin sidearm forged from 288 layers of 1095 and 15N20 high-carbon Damascus steel. Features sculpted eagle pommel and dark braided leather grip.',
    materials: ['Folded Damascus High-Carbon Steel', 'Aged Buffalo Horn Grip', 'Bronze Eagle Pommel', 'Hardened Leather Scabbard'],
    specs: {
      dimensions: 'Blade: 26 cm / Total: 39 cm',
      weight: '520 g',
      craftsmanship: 'Oil quenched 58-60 HRC edge hardness',
      rarity: 'Masterwork'
    },
    loreSnippet: '"When shadows tighten, the dagger whispers final peace to the corrupt."',
    featured: true
  },
  {
    id: 'prod-ottoman-hookblade',
    name: 'Ottoman Hookblade & Combat Bracer',
    category: 'armor',
    priceBDT: 9200,
    priceUSD: 82,
    rating: 4.85,
    reviewsCount: 64,
    inStock: true,
    stockCount: 11,
    image: '/src/assets/images/ac_hidden_blade_replica_1791361850702.jpg',
    era: 'Constantinople, 1511',
    description: 'Engineered for rooftop traverses and counter-attacks. Features the dual curved hook mechanism invented by the Ottoman Assassins, mounted on reinforced steel-plated arm wraps.',
    materials: ['Tempered Spring Steel Hook', 'Riveted Black Kip Leather', 'Forged Gear Mechanism', 'Brass Stud Accents'],
    specs: {
      dimensions: 'Hook: 14 cm / Forearm: 30 cm',
      weight: '780 g',
      craftsmanship: 'Calibrated for traversal hook grip strength',
      rarity: 'Legendary'
    },
    loreSnippet: '"The hookblade has two parts: the hook and the blade. One to climb, one to conquer."',
    featured: false
  },
  {
    id: 'prod-altair-sword',
    name: "Altaïr's Master Longsword of Masyaf",
    category: 'blades',
    priceBDT: 14500,
    priceUSD: 130,
    rating: 4.97,
    reviewsCount: 112,
    inStock: true,
    stockCount: 6,
    image: '/src/assets/images/ac_brotherhood_dagger_1791361894696.jpg',
    era: 'Holy Land, 1191',
    description: 'Full-tang master sword featuring avian eagle wing crossguard and counter-balanced pommel. Hand-ground distally tapered blade tuned for lightning parries and execution precision.',
    materials: ['5160 High-Carbon Spring Steel', 'Cast Steel Wing Crossguard', 'Ray-Skin Wrapped Wooden Hilt', 'Wooden Core Velvet Scabbard'],
    specs: {
      dimensions: 'Blade: 84 cm / Total: 104 cm',
      weight: '1.25 kg',
      craftsmanship: 'Individually heat treated and battle-balanced',
      rarity: 'Legendary'
    },
    loreSnippet: '"He who lives by the blade must wield it with clarity of soul."',
    featured: false
  },
  {
    id: 'prod-memory-codex',
    name: 'Memory Seal Codex of the Brotherhood',
    category: 'relics',
    priceBDT: 5400,
    priceUSD: 48,
    rating: 4.79,
    reviewsCount: 53,
    inStock: true,
    stockCount: 22,
    image: '/src/assets/images/ac_apple_of_eden_1791361883424.jpg',
    era: 'Levantine Brotherhood Archives',
    description: 'Archival replica of the illuminated codex containing 52 anatomical diagrams, hidden blade schematic upgrades, poison crafting notes, and Altaïr’s personal philosophical reflections.',
    materials: ['Aged Parchment Vellum Paper', 'Debossed Leather Binding', 'Brass Corner Cornerstones', 'Wax Ribbon Bookmark'],
    specs: {
      dimensions: '22 cm x 30 cm (240 Pages)',
      weight: '890 g',
      craftsmanship: 'Hand-sewn Coptic stitch binding with gilded edges',
      rarity: 'Masterwork'
    },
    loreSnippet: '"Only a mind freed from dogma can decode the true nature of peace."',
    featured: false
  },
  {
    id: 'prod-caribbean-bracer',
    name: 'Edward Kenway Buccaneer Gauntlet & Holster',
    category: 'armor',
    priceBDT: 7900,
    priceUSD: 70,
    rating: 4.81,
    reviewsCount: 47,
    inStock: true,
    stockCount: 15,
    image: '/src/assets/images/ac_master_cloak_1791361867778.jpg',
    era: 'West Indies, 1715',
    description: 'Weathered harness leather bandolier gauntlet with pirate insignia, dual flintlock holster clips, and reinforced parrying wrist guards built to withstand naval boarding clashes.',
    materials: ['Heavy Bridle Leather', 'Aged Antique Brass Buckles', 'Twisted Hemp Cord Accents', 'Steel Reinforcing Plate'],
    specs: {
      dimensions: 'Adjustable Harness (Chest 36"-48")',
      weight: '950 g',
      craftsmanship: 'Hand-distressed sea-salt patina effect',
      rarity: 'Masterwork'
    },
    loreSnippet: '"In a world without gold, we might have been heroes. But freedom has its own price."',
    featured: false
  }
];

export const BKASH_CONFIG = {
  merchantNumber: '01712-889900',
  formattedNumber: '+880 1712-889900',
  accountType: 'Merchant Gateway (Live)',
  qrPlaceholder: 'bKash Merchant QR Scanner Ready',
  sampleTrxIds: ['9AB8X7K4J2', 'BK48L9M10Z', '8V73Q6P2K1', 'TRX992014B']
};
