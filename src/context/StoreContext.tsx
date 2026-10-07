import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, CustomerProfile, ProductCategory, OrderStatus, Review, PolicyType } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { playAnimusSound } from '../utils/audio';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  profile: CustomerProfile;
  currency: 'BDT' | 'USD';
  selectedCategory: ProductCategory;
  searchQuery: string;
  selectedProduct: Product | null;
  activeTrackingId: string;
  // Modals & Drawers
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isTrackingOpen: boolean;
  isDashboardOpen: boolean;
  isBkashGuideOpen: boolean;
  isHostingGuideOpen: boolean;
  isSupportOpen: boolean;
  isAdminModalOpen: boolean;
  isAdminLoginOpen: boolean;
  isAdminAuthenticated: boolean;
  activePolicyModal: PolicyType | null;
  invoiceOrder: Order | null;
  toast: { message: string; type: 'success' | 'info' | 'warn' } | null;
  // Admin Mode
  isAdminMode: boolean;
  toggleAdminMode: () => void;
  openAdminPortal: () => void;
  adminLogin: (id: string, pass: string) => boolean;
  adminLogout: () => void;
  setIsAdminLoginOpen: (b: boolean) => void;
  // Actions
  setCurrency: (c: 'BDT' | 'USD') => void;
  setSelectedCategory: (c: ProductCategory) => void;
  setSearchQuery: (q: string) => void;
  setSelectedProduct: (p: Product | null) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsTrackingOpen: (open: boolean) => void;
  setIsDashboardOpen: (open: boolean) => void;
  setIsBkashGuideOpen: (open: boolean) => void;
  setIsHostingGuideOpen: (open: boolean) => void;
  setIsSupportOpen: (open: boolean) => void;
  setIsAdminModalOpen: (open: boolean) => void;
  setActivePolicyModal: (p: PolicyType | null) => void;
  setInvoiceOrder: (o: Order | null) => void;
  setActiveTrackingId: (id: string) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'trackingHistory' | 'courier' | 'estimatedDelivery'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  verifyOrderPayment: (orderId: string) => void;
  updateCourierLocation: (orderId: string, district: string, eta: number, coords: { x: number; y: number }) => void;
  deleteOrder: (orderId: string) => void;
  updateProductStock: (productId: string, deltaOrSet: number, isSet?: boolean) => void;
  addReview: (productId: string, review: Omit<Review, 'id' | 'date'>) => void;
  updateProfile: (profile: Partial<CustomerProfile>) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warn') => void;
  formatPrice: (amountBDT: number) => string;
  cartTotalBDT: number;
  cartCount: number;
  totalRevenueBDT: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const SEED_ORDERS: Order[] = [
  {
    id: 'CREED-8924',
    customer: {
      name: 'Ezio Auditore da Firenze',
      email: 'saifomarcrtf@gmail.com',
      phone: '+880 1712-334455',
      address: 'Sanctuary Tower, Road 27, Dhanmondi',
      city: 'Dhaka',
      postalCode: '1209',
      notes: 'Leave package behind the falcon sigil gate'
    },
    items: [
      { product: INITIAL_PRODUCTS[0], quantity: 1 },
      { product: INITIAL_PRODUCTS[3], quantity: 1 }
    ],
    subtotalBDT: 15300,
    deliveryFeeBDT: 120,
    discountBDT: 1000,
    totalBDT: 14420,
    payment: {
      method: 'bkash',
      bkashSenderNumber: '01712334455',
      bkashTrxId: '9AB8X7K4J2',
      isVerified: true,
      verifiedAt: '2026-10-06 14:22'
    },
    status: 'courier_dispatched',
    createdAt: '2026-10-06 14:15',
    estimatedDelivery: 'Today by 18:30',
    trackingHistory: [
      {
        id: 'chk-1',
        status: 'verifying_payment',
        title: 'Order Placed & bKash Initiated',
        location: 'Sanctum Vault Portal',
        timestamp: '14:15',
        description: 'Order registered via encrypted sanctuary network. bKash payment requested.',
        completed: true
      },
      {
        id: 'chk-2',
        status: 'payment_confirmed',
        title: 'bKash TrxID Verified',
        location: 'Dhaka Central bKash Gateway',
        timestamp: '14:22',
        description: 'TrxID 9AB8X7K4J2 cleared. ৳14,420 credited to Sanctum Merchant 01712-889900.',
        completed: true
      },
      {
        id: 'chk-3',
        status: 'forging_armory',
        title: 'Damascus Steel Forged & Inspected',
        location: 'Masyaf Master Smithy Guild',
        timestamp: '15:10',
        description: 'Dual-Action blade oiled, tension springs calibrated, eagle insignia embossed.',
        completed: true
      },
      {
        id: 'chk-4',
        status: 'courier_dispatched',
        title: 'Brotherhood Courier En Route',
        location: 'Dhanmondi Sector 4 Transit Hub',
        timestamp: '16:05',
        description: 'Courier Brother Tariq has taken custody of the armory parcel.',
        completed: true
      },
      {
        id: 'chk-5',
        status: 'delivered',
        title: 'Arrival at Safehouse',
        location: 'Sanctuary Tower, Dhanmondi',
        timestamp: 'Pending (ETA 28 min)',
        description: 'Delivery to recipient safehouse.',
        completed: false
      }
    ],
    courier: {
      name: 'Brother Tariq',
      code: 'Eagle Courier #09',
      phone: '+880 1812-443322',
      currentDistrict: 'Dhanmondi Lake Perimeter',
      etaMinutes: 28,
      coords: { x: 58, y: 44 }
    }
  },
  {
    id: 'CREED-7103',
    customer: {
      name: 'Ezio Auditore da Firenze',
      email: 'saifomarcrtf@gmail.com',
      phone: '+880 1712-334455',
      address: 'Sanctuary Tower, Road 27, Dhanmondi',
      city: 'Dhaka',
      postalCode: '1209'
    },
    items: [
      { product: INITIAL_PRODUCTS[2], quantity: 1 }
    ],
    subtotalBDT: 18500,
    deliveryFeeBDT: 0,
    discountBDT: 500,
    totalBDT: 18000,
    payment: {
      method: 'bkash',
      bkashSenderNumber: '01712334455',
      bkashTrxId: 'BK48L9M10Z',
      isVerified: true,
      verifiedAt: '2026-09-28 11:04'
    },
    status: 'delivered',
    createdAt: '2026-09-28 11:00',
    estimatedDelivery: 'Delivered',
    trackingHistory: [
      {
        id: 'chk-1',
        status: 'verifying_payment',
        title: 'Order Placed',
        location: 'Sanctum Portal',
        timestamp: '11:00',
        description: 'Order confirmed with bKash TrxID BK48L9M10Z.',
        completed: true
      },
      {
        id: 'chk-2',
        status: 'delivered',
        title: 'Delivered to Recipient',
        location: 'Sanctuary Tower, Dhanmondi',
        timestamp: '17:45',
        description: 'Piece of Eden securely synchronized into safehouse custody.',
        completed: true
      }
    ],
    courier: {
      name: 'Brother Malik',
      code: 'Eagle Courier #03',
      phone: '+880 1819-998877',
      currentDistrict: 'Safehouse Vault',
      etaMinutes: 0,
      coords: { x: 75, y: 72 }
    }
  }
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('creed_products_commercial');
      if (!saved) return INITIAL_PRODUCTS;
      const parsed: Product[] = JSON.parse(saved);
      // Merge with INITIAL_PRODUCTS to guarantee new fields (sku, warranty, reviews) always exist
      return INITIAL_PRODUCTS.map(initial => {
        const found = parsed.find(p => p.id === initial.id);
        if (!found) return initial;
        return {
          ...initial,
          ...found,
          stockCount: found.stockCount ?? initial.stockCount,
          reviews: found.reviews && found.reviews.length > 0 ? found.reviews : initial.reviews,
          specs: { ...initial.specs, ...(found.specs || {}) }
        };
      });
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('creed_cart');
      if (!saved) return [{ product: INITIAL_PRODUCTS[0], quantity: 1 }];
      const parsed: CartItem[] = JSON.parse(saved);
      return parsed.map(item => {
        const liveProd = INITIAL_PRODUCTS.find(p => p.id === item.product?.id) || item.product;
        return {
          ...item,
          product: liveProd ? { ...liveProd, ...item.product } : INITIAL_PRODUCTS[0]
        };
      });
    } catch {
      return [{ product: INITIAL_PRODUCTS[0], quantity: 1 }];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('creed_wishlist');
      return saved ? JSON.parse(saved) : [INITIAL_PRODUCTS[1].id, INITIAL_PRODUCTS[2].id];
    } catch {
      return [INITIAL_PRODUCTS[1].id, INITIAL_PRODUCTS[2].id];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('creed_orders');
      return saved ? JSON.parse(saved) : SEED_ORDERS;
    } catch {
      return SEED_ORDERS;
    }
  });

  const [profile, setProfile] = useState<CustomerProfile>(() => {
    try {
      const saved = localStorage.getItem('creed_profile');
      return saved ? JSON.parse(saved) : {
        name: 'Ezio Auditore da Firenze',
        assassinAlias: 'Mentor of the Brotherhood',
        email: 'saifomarcrtf@gmail.com',
        phone: '+880 1712-334455',
        rank: 'Master Assassin',
        syncLevel: 98.4,
        safehouseAddress: 'Sanctuary Tower, Road 27, Dhanmondi',
        safehouseCity: 'Dhaka',
        joinedDate: 'October 2025'
      };
    } catch {
      return {
        name: 'Ezio Auditore da Firenze',
        assassinAlias: 'Mentor of the Brotherhood',
        email: 'saifomarcrtf@gmail.com',
        phone: '+880 1712-334455',
        rank: 'Master Assassin',
        syncLevel: 98.4,
        safehouseAddress: 'Sanctuary Tower, Road 27, Dhanmondi',
        safehouseCity: 'Dhaka',
        joinedDate: 'October 2025'
      };
    }
  });

  const [currency, setCurrency] = useState<'BDT' | 'USD'>('BDT');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTrackingId, setActiveTrackingId] = useState<string>('CREED-8924');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isBkashGuideOpen, setIsBkashGuideOpen] = useState(false);
  const [isHostingGuideOpen, setIsHostingGuideOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('creed_admin_auth') === 'true';
  });
  const [activePolicyModal, setActivePolicyModal] = useState<PolicyType | null>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warn' } | null>(null);

  // Admin Mode & Security Credentials
  const [isAdminMode, setIsAdminMode] = useState(false);

  const ADMIN_CREDS = {
    loginId: 'mentor_saif',
    password: 'CreedVault#2026@Masyaf'
  };

  const openAdminPortal = () => {
    if (isAdminAuthenticated) {
      setIsAdminModalOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const adminLogin = (id: string, pass: string): boolean => {
    if (id.trim() === ADMIN_CREDS.loginId && pass === ADMIN_CREDS.password) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('creed_admin_auth', 'true');
      setIsAdminLoginOpen(false);
      setIsAdminModalOpen(true);
      playAnimusSound('success');
      showToast('Master Smith Credentials Verified. Welcome, Mentor.', 'success');
      return true;
    }
    playAnimusSound('click');
    showToast('Access Denied: Invalid Master Smith Key or Password.', 'warn');
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('creed_admin_auth');
    setIsAdminModalOpen(false);
    playAnimusSound('click');
    showToast('Admin Vault Session Locked.', 'info');
  };

  // Listen for Ctrl+Shift+A or secret #admin hash
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        openAdminPortal();
      }
    };
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        openAdminPortal();
        try {
          window.history.replaceState(null, '', window.location.pathname);
        } catch {}
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', checkHash);
    checkHash();
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', checkHash);
    };
  }, [isAdminAuthenticated]);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('creed_products_commercial', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('creed_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('creed_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('creed_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('creed_profile', JSON.stringify(profile));
  }, [profile]);

  const showToast = (message: string, type: 'success' | 'info' | 'warn' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const toggleAdminMode = () => {
    playAnimusSound('blade');
    setIsAdminMode(prev => !prev);
    showToast(isAdminMode ? 'Customer Storefront Mode Active' : 'Master Smith Merchant Admin Mode Active', 'info');
  };

  const addToCart = (product: Product, quantity = 1) => {
    if (product.stockCount <= 0) {
      showToast(`"${product.name}" is currently out of stock in the forge.`, 'warn');
      return;
    }
    playAnimusSound('blade');
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to Armory satchel.`);
  };

  const removeFromCart = (productId: string) => {
    playAnimusSound('click');
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    playAnimusSound('click');
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Brotherhood Wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to Brotherhood Wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const updateProductStock = (productId: string, deltaOrSet: number, isSet = false) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id !== productId) return p;
        const newCount = isSet ? deltaOrSet : Math.max(0, p.stockCount + deltaOrSet);
        return {
          ...p,
          stockCount: newCount,
          inStock: newCount > 0
        };
      })
    );
  };

  const addReview = (productId: string, newRev: Omit<Review, 'id' | 'date'>) => {
    const revWithMeta: Review = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };

    setProducts(prev =>
      prev.map(p => {
        if (p.id !== productId) return p;
        const updatedReviews = [revWithMeta, ...(p.reviews || [])];
        const newTotalScore = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
        const newRating = Number((newTotalScore / updatedReviews.length).toFixed(2));
        return {
          ...p,
          reviews: updatedReviews,
          reviewsCount: updatedReviews.length,
          rating: newRating
        };
      })
    );

    // If active product modal is open, sync it
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(prev => prev ? {
        ...prev,
        reviews: [revWithMeta, ...(prev.reviews || [])],
        reviewsCount: (prev.reviewsCount || 0) + 1
      } : null);
    }

    playAnimusSound('sync');
    showToast('Brotherhood review submitted and verified!', 'success');
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'trackingHistory' | 'courier' | 'estimatedDelivery'>): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `CREED-${randomNum}`;
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const dateStr = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;

    // Decrement stock for ordered items
    orderData.items.forEach(it => {
      updateProductStock(it.product.id, -it.quantity);
    });

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      createdAt: `${dateStr} ${timeStr}`,
      status: orderData.payment.isVerified ? 'payment_confirmed' : 'verifying_payment',
      estimatedDelivery: 'Within 24-48 Hours',
      trackingHistory: [
        {
          id: `chk-${Date.now()}-1`,
          status: 'verifying_payment',
          title: 'Order Placed & bKash Verified',
          location: 'Sanctum Vault Core',
          timestamp: timeStr,
          description: `bKash TrxID ${orderData.payment.bkashTrxId || 'N/A'} verified with Merchant 01712-889900. Total: ৳${orderData.totalBDT.toLocaleString()}`,
          completed: true
        },
        {
          id: `chk-${Date.now()}-2`,
          status: 'forging_armory',
          title: 'Forging Armory Gear',
          location: 'Brotherhood Smithy',
          timestamp: 'In Progress',
          description: 'Master smiths inspecting Damascus steel, blade mechanisms, and leather straps.',
          completed: false
        },
        {
          id: `chk-${Date.now()}-3`,
          status: 'courier_dispatched',
          title: 'Courier En Route',
          location: 'Sector Safehouse Hub',
          timestamp: 'Pending',
          description: 'Encrypted courier dispatched with your sealed package.',
          completed: false
        },
        {
          id: `chk-${Date.now()}-4`,
          status: 'delivered',
          title: 'Delivery to Safehouse',
          location: `${orderData.customer.city} Safehouse`,
          timestamp: 'Pending',
          description: 'Package delivered into your hands.',
          completed: false
        }
      ],
      courier: {
        name: 'Brother Altair V',
        code: 'Eagle Courier #07',
        phone: '+880 1812-991188',
        currentDistrict: `${orderData.customer.city} Armory Depot`,
        etaMinutes: 45,
        coords: { x: 42, y: 38 }
      }
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setActiveTrackingId(orderId);
    playAnimusSound('success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;
        
        const updatedHistory = ord.trackingHistory.map(chk => {
          if (chk.status === newStatus) {
            return { ...chk, completed: true, timestamp: 'Just Now' };
          }
          return chk;
        });

        let coords = ord.courier.coords;
        let district = ord.courier.currentDistrict;
        let eta = ord.courier.etaMinutes;

        if (newStatus === 'forging_armory') {
          coords = { x: 30, y: 35 };
          district = 'Guild Blacksmith Vault';
          eta = 40;
        } else if (newStatus === 'courier_dispatched') {
          coords = { x: 55, y: 48 };
          district = 'City Transit Highway';
          eta = 22;
        } else if (newStatus === 'out_for_delivery') {
          coords = { x: 70, y: 65 };
          district = `${ord.customer.city} District Safehouse Gate`;
          eta = 8;
        } else if (newStatus === 'delivered') {
          coords = { x: 78, y: 74 };
          district = 'Safehouse Vault (Arrived)';
          eta = 0;
        }

        return {
          ...ord,
          status: newStatus,
          trackingHistory: updatedHistory,
          courier: {
            ...ord.courier,
            coords,
            currentDistrict: district,
            etaMinutes: eta
          }
        };
      })
    );
    showToast(`Order ${orderId} status set to: ${newStatus.replace(/_/g, ' ').toUpperCase()}`);
  };

  const verifyOrderPayment = (orderId: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;
        return {
          ...ord,
          status: 'payment_confirmed',
          payment: {
            ...ord.payment,
            isVerified: true,
            verifiedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
          }
        };
      })
    );
    playAnimusSound('success');
    showToast(`Order ${orderId} bKash Payment Approved by Master Smith!`);
  };

  const updateCourierLocation = (orderId: string, district: string, eta: number, coords: { x: number; y: number }) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;
        return {
          ...ord,
          courier: {
            ...ord.courier,
            currentDistrict: district,
            etaMinutes: eta,
            coords
          }
        };
      })
    );
    showToast(`Courier GPS Telemetry Updated: ${district} (${eta}m ETA)`);
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
    showToast(`Order ${orderId} purged from ledger.`, 'info');
  };

  const updateProfile = (updated: Partial<CustomerProfile>) => {
    setProfile(prev => ({ ...prev, ...updated }));
    showToast('Brotherhood profile updated successfully.');
  };

  const formatPrice = (amountBDT: number): string => {
    if (currency === 'USD') {
      const usd = Math.round(amountBDT / 112);
      return `$${usd.toLocaleString()}`;
    }
    return `৳${amountBDT.toLocaleString()}`;
  };

  const cartTotalBDT = cart.reduce((acc, item) => acc + item.product.priceBDT * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalRevenueBDT = orders.reduce((sum, ord) => sum + (ord.status !== 'cancelled' ? ord.totalBDT : 0), 0);

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        profile,
        currency,
        selectedCategory,
        searchQuery,
        selectedProduct,
        activeTrackingId,
        isCartOpen,
        isCheckoutOpen,
        isTrackingOpen,
        isDashboardOpen,
        isBkashGuideOpen,
        isHostingGuideOpen,
        isSupportOpen,
        isAdminModalOpen,
        isAdminLoginOpen,
        isAdminAuthenticated,
        openAdminPortal,
        adminLogin,
        adminLogout,
        setIsAdminLoginOpen,
        activePolicyModal,
        invoiceOrder,
        toast,
        isAdminMode,
        toggleAdminMode,
        setCurrency,
        setSelectedCategory,
        setSearchQuery,
        setSelectedProduct,
        setIsCartOpen,
        setIsCheckoutOpen,
        setIsTrackingOpen,
        setIsDashboardOpen,
        setIsBkashGuideOpen,
        setIsHostingGuideOpen,
        setIsSupportOpen,
        setIsAdminModalOpen,
        setActivePolicyModal,
        setInvoiceOrder,
        setActiveTrackingId,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        createOrder,
        updateOrderStatus,
        verifyOrderPayment,
        updateCourierLocation,
        deleteOrder,
        updateProductStock,
        addReview,
        updateProfile,
        showToast,
        formatPrice,
        cartTotalBDT,
        cartCount,
        totalRevenueBDT
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
