export type ProductCategory = 'all' | 'blades' | 'apparel' | 'relics' | 'armor';

export interface Review {
  id: string;
  author: string;
  rank: string;
  rating: number;
  date: string;
  comment: string;
  verifiedBuyer: boolean;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  priceBDT: number;
  priceUSD: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  image: string;
  era: string;
  description: string;
  materials: string[];
  specs: {
    dimensions: string;
    weight: string;
    craftsmanship: string;
    rarity: 'Common' | 'Masterwork' | 'Legendary' | 'First Civilization Isu';
    serialPrefix: string;
    warranty: string;
  };
  loreSnippet: string;
  reviews: Review[];
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'bkash' | 'cod' | 'card';

export type OrderStatus = 
  | 'verifying_payment'
  | 'payment_confirmed'
  | 'forging_armory'
  | 'courier_dispatched'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface TrackingCheckpoint {
  id: string;
  status: OrderStatus;
  title: string;
  location: string;
  timestamp: string;
  description: string;
  completed: boolean;
}

export interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    notes?: string;
  };
  items: CartItem[];
  subtotalBDT: number;
  deliveryFeeBDT: number;
  discountBDT: number;
  totalBDT: number;
  payment: {
    method: PaymentMethod;
    bkashSenderNumber?: string;
    bkashTrxId?: string;
    isVerified: boolean;
    verifiedAt?: string;
  };
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
  trackingHistory: TrackingCheckpoint[];
  courier: {
    name: string;
    code: string;
    phone: string;
    currentDistrict: string;
    etaMinutes: number;
    coords: { x: number; y: number };
  };
}

export interface CustomerProfile {
  name: string;
  assassinAlias: string;
  email: string;
  phone: string;
  rank: 'Initiate' | 'Assassin' | 'Master Assassin' | 'Mentor';
  syncLevel: number;
  safehouseAddress: string;
  safehouseCity: string;
  joinedDate: string;
}

export type PolicyType = 'terms' | 'shipping' | 'refund' | 'privacy';
