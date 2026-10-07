import { Product } from '../types';

export const HERO_IMAGE = '/src/assets/images/ac_hero_sanctum_1791361831100.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-hidden-blade',
    sku: 'SANCTUM-BLD-001',
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
    description: 'Masterwork spring-loaded mechanical hidden blade mechanism housed within an embossed full-grain Italian leather bracer. Features dual-action ring pull trigger for seamless extension and stealth retraction.',
    materials: ['Damascus Carbon Steel', 'Vegetable-Tanned Italian Leather', 'Silver Filigree Rivets', 'Internal Spring Coil'],
    specs: {
      dimensions: 'Blade: 21 cm / Bracer: 28 cm',
      weight: '640 g',
      craftsmanship: 'Hand-assembled in Venice Armory guild',
      rarity: 'Legendary',
      serialPrefix: 'AC-ITA-1500',
      warranty: '2-Year Smithy Guarantee & Spring Replacement'
    },
    loreSnippet: '"A blade that moves like an extension of your own hand. Silence is your shield, swiftness your armor."',
    reviews: [
      {
        id: 'rev-1',
        author: 'Arno Dorian',
        rank: 'Master Assassin',
        rating: 5,
        date: '2026-09-18',
        comment: 'The mechanical dual-action is smooth and lightning-fast. The leather bracer fits snugly on the forearm and Damascus steel edge is razor-sharp.',
        verifiedBuyer: true
      },
      {
        id: 'rev-2',
        author: 'Kassandra of Sparta',
        rank: 'Legendary Mercenary',
        rating: 5,
        date: '2026-08-30',
        comment: 'Exquisite craftsmanship. The ring pull mechanism deployed reliably in high tension tests.',
        verifiedBuyer: true
      }
    ],
    featured: true
  },
  {
    id: 'prod-master-cloak',
    sku: 'SANCTUM-APP-002',
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
      rarity: 'Masterwork',
      serialPrefix: 'AC-LEV-1191',
      warranty: 'Lifetime Seam & Brooch Guarantee'
    },
    loreSnippet: '"We work in the dark to serve the light. The cowl shields the gaze of kings and cutthroats alike."',
    reviews: [
      {
        id: 'rev-3',
        author: 'Ezio Auditore',
        rank: 'Mentor',
        rating: 5,
        date: '2026-09-12',
        comment: 'Magnificent heavy wool drape. The crimson silk interior feels majestic, and the hood silhouette completely masks facial contours in low light.',
        verifiedBuyer: true
      }
    ],
    featured: true
  },
  {
    id: 'prod-apple-of-eden',
    sku: 'SANCTUM-ISU-003',
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
      rarity: 'First Civilization Isu',
      serialPrefix: 'ISU-EDEN-00',
      warranty: '3-Year Circuit & Internal Pulse Array Warranty'
    },
    loreSnippet: '"Knowledge. Power. Submission. Those who hold the Apple perceive the strands of time itself."',
    reviews: [
      {
        id: 'rev-4',
        author: 'Desmond Miles',
        rank: 'Master Assassin',
        rating: 5,
        date: '2026-09-24',
        comment: 'The amber light pulse feels almost alive. The brass weight in hand is heavy and authentic.',
        verifiedBuyer: true
      }
    ],
    featured: true
  },
  {
    id: 'prod-damascus-dagger',
    sku: 'SANCTUM-BLD-004',
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
      rarity: 'Masterwork',
      serialPrefix: 'AC-SYR-1191',
      warranty: 'Lifetime Damascus Steel Blade Warranty'
    },
    loreSnippet: '"When shadows tighten, the dagger whispers final peace to the corrupt."',
    reviews: [
      {
        id: 'rev-5',
        author: 'Altaïr Ibn-La\'Ahad',
        rank: 'Mentor of Masyaf',
        rating: 5,
        date: '2026-08-14',
        comment: 'Balanced at the hilt. The Damascus folding pattern is mesmerizing and holds an edge effortlessly.',
        verifiedBuyer: true
      }
    ],
    featured: true
  },
  {
    id: 'prod-ottoman-hookblade',
    sku: 'SANCTUM-ARM-005',
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
      rarity: 'Legendary',
      serialPrefix: 'AC-OTT-1511',
      warranty: '2-Year Hook & Rivet Replacement'
    },
    loreSnippet: '"The hookblade has two parts: the hook and the blade. One to climb, one to conquer."',
    reviews: [
      {
        id: 'rev-6',
        author: 'Yusuf Tazim',
        rank: 'Guild Leader',
        rating: 5,
        date: '2026-07-29',
        comment: 'Constantinople approved! The hook mechanism handles tension with absolute stability.',
        verifiedBuyer: true
      }
    ],
    featured: false
  },
  {
    id: 'prod-altair-sword',
    sku: 'SANCTUM-BLD-006',
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
      rarity: 'Legendary',
      serialPrefix: 'AC-MAS-1191',
      warranty: 'Lifetime Tang & Steel Guarantee'
    },
    loreSnippet: '"He who lives by the blade must wield it with clarity of soul."',
    reviews: [
      {
        id: 'rev-7',
        author: 'Malik Al-Sayf',
        rank: 'Bureau Leader',
        rating: 5,
        date: '2026-06-19',
        comment: 'A true weapon of the Mentor. Weight balance is located 3 inches forward from the guard, perfect for swift parries.',
        verifiedBuyer: true
      }
    ],
    featured: false
  },
  {
    id: 'prod-memory-codex',
    sku: 'SANCTUM-REL-007',
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
      rarity: 'Masterwork',
      serialPrefix: 'AC-COD-1200',
      warranty: '1-Year Binding Warranty'
    },
    loreSnippet: '"Only a mind freed from dogma can decode the true nature of peace."',
    reviews: [
      {
        id: 'rev-8',
        author: 'Leonardo da Vinci',
        rank: 'Guild Architect',
        rating: 5,
        date: '2026-05-11',
        comment: 'Fascinating blueprints. The schematics for the hidden blade modification are accurate down to the smallest spring.',
        verifiedBuyer: true
      }
    ],
    featured: false
  },
  {
    id: 'prod-caribbean-bracer',
    sku: 'SANCTUM-ARM-008',
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
      rarity: 'Masterwork',
      serialPrefix: 'AC-CAR-1715',
      warranty: '2-Year Leather & Buckle Warranty'
    },
    loreSnippet: '"In a world without gold, we might have been heroes. But freedom has its own price."',
    reviews: [
      {
        id: 'rev-9',
        author: 'Adéwalé',
        rank: 'Quartermaster',
        rating: 5,
        date: '2026-04-03',
        comment: 'Rugged leather that can weather any Atlantic storm. Hardware holds firm under strain.',
        verifiedBuyer: true
      }
    ],
    featured: false
  }
];

export const BKASH_CONFIG = {
  merchantNumber: '01712-889900',
  formattedNumber: '+880 1712-889900',
  accountType: 'bKash Merchant Account (Live)',
  qrPlaceholder: 'bKash Merchant QR Scanner Ready',
  sampleTrxIds: ['9AB8X7K4J2', 'BK48L9M10Z', '8V73Q6P2K1', 'TRX992014B']
};

export const STORE_SUPPORT = {
  phone: '+880 1712-889900',
  whatsappUrl: 'https://wa.me/8801712889900?text=Sanctum%20Creed%20Armory%20Support%20Inquiry',
  email: 'support@sanctumcreed.com',
  hours: '24/7 Brotherhood Encrypted Hotline'
};
