import { ProductItem, UserProfile, ActivityMetric } from '../types';

export const SAMPLE_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    name: 'Acoustic Horizon ANC Headphones',
    brand: 'SÖNDER SOUND',
    category: 'Audio',
    price: 349,
    originalPrice: 429,
    rating: 4.9,
    reviewsCount: 384,
    description: 'Precision-machined anodized aluminum with lambskin leather cushions. Features adaptive active noise cancellation, lossless 24-bit 96kHz playback, and 42-hour battery life with rapid USB-C fast charging.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80',
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#1c1c1e' },
      { name: 'Moon Silver', hex: '#d1d5db' },
      { name: 'Champagne Gold', hex: '#e2cca6' },
    ],
    sizes: ['Standard'],
    inStock: true,
    featured: true,
    badge: 'Staff Pick',
  },
  {
    id: 'prod-2',
    name: 'Chronograph Minimalist Automatic',
    brand: 'VANGUARD 1884',
    category: 'Watches',
    price: 580,
    originalPrice: 650,
    rating: 4.8,
    reviewsCount: 192,
    description: 'Swiss-engineered mechanical movement with 48-hour reserve. Sapphire crystal dome with anti-reflective coating, 5ATM water resistance, and an interchangeable full-grain Horween leather strap.',
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
    ],
    colors: [
      { name: 'Smoked Slate', hex: '#334155' },
      { name: 'Rosewood Gold', hex: '#c59b79' },
      { name: 'Midnight Onyx', hex: '#0f172a' },
    ],
    sizes: ['38mm', '42mm'],
    inStock: true,
    featured: true,
    badge: 'Limited Run',
  },
  {
    id: 'prod-3',
    name: 'Aerolight Runner V2 Studio',
    brand: 'KINETIC LABS',
    category: 'Footwear',
    price: 195,
    originalPrice: 220,
    rating: 4.7,
    reviewsCount: 512,
    description: 'Engineered breathable monofilament mesh with supercritical nitrogen-infused foam midsole for maximum energy return and supreme cloud cushioning on road or track.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
    ],
    colors: [
      { name: 'Crimson Flame', hex: '#dc2626' },
      { name: 'Ghost White', hex: '#f8fafc' },
      { name: 'Cyber Neon', hex: '#10b981' },
    ],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    inStock: true,
    featured: false,
    badge: 'Popular',
  },
  {
    id: 'prod-4',
    name: 'Modular Tech-Pack Urban 28L',
    brand: 'NORDIC CARRY',
    category: 'Bags',
    price: 220,
    originalPrice: 260,
    rating: 4.9,
    reviewsCount: 230,
    description: 'Weatherproof 840D Cordura ballistic nylon with YKK AquaGuard zippers. Includes dedicated 16-inch fleece laptop sleeve, hidden RFID passport compartment, and magnetic Fidlock buckles.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80',
    ],
    colors: [
      { name: 'Matte Charcoal', hex: '#27272a' },
      { name: 'Desert Dune', hex: '#a3907c' },
      { name: 'Deep Moss', hex: '#2e4334' },
    ],
    sizes: ['20L', '28L', '35L'],
    inStock: true,
    featured: true,
    badge: 'New Season',
  },
  {
    id: 'prod-5',
    name: 'Titanium Ceramic Polarized Shades',
    brand: 'AURA OPTICS',
    category: 'Eyewear',
    price: 185,
    rating: 4.6,
    reviewsCount: 94,
    description: 'Ultralight Japanese grade-5 beta-titanium frame weighing just 14 grams. Category-3 polarized nylon lenses with oleophobic dirt and smudge repellent treatment.',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=80',
    ],
    colors: [
      { name: 'Titanium Bronze', hex: '#785b46' },
      { name: 'Stealth Black', hex: '#18181b' },
    ],
    sizes: ['Medium', 'Large'],
    inStock: true,
    featured: false,
  },
  {
    id: 'prod-6',
    name: 'Smart Ambient Luminary Pillar',
    brand: 'LUMEN STUDIO',
    category: 'Home',
    price: 275,
    originalPrice: 310,
    rating: 4.9,
    reviewsCount: 147,
    description: 'Warm circadian rhythm dynamic LED luminaire crafted from turned Scandinavian oak and frosted blown borosilicate glass. Syncs with Apple HomeKit and Google Home.',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80',
    ],
    colors: [
      { name: 'Natural Oak', hex: '#bfa07d' },
      { name: 'Charred Ash', hex: '#262626' },
    ],
    sizes: ['40cm', '60cm'],
    inStock: true,
    featured: true,
    badge: 'Eco Award',
  },
];

export const CURRENT_USER: UserProfile = {
  name: 'Elena Rostova',
  handle: '@elena_design',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  tier: 'Black Diamond VIP',
  points: 14250,
  savedCount: 38,
  ordersCount: 12,
};

export const ACTIVITY_METRICS: ActivityMetric[] = [
  {
    id: 'm1',
    title: 'Spending Balance',
    value: '$2,840.50',
    change: '+14.2% vs last month',
    isPositive: true,
    iconName: 'Wallet',
  },
  {
    id: 'm2',
    title: 'Reward Cashbacks',
    value: '$340.00',
    change: '+8.4% unlocked',
    isPositive: true,
    iconName: 'Sparkles',
  },
  {
    id: 'm3',
    title: 'Eco Offset Units',
    value: '184 kg CO₂',
    change: 'Certified 100% Green',
    isPositive: true,
    iconName: 'Leaf',
  },
  {
    id: 'm4',
    title: 'Active Shipments',
    value: '2 En Route',
    change: 'ETA Tomorrow 3:00 PM',
    isPositive: true,
    iconName: 'Truck',
  },
];

export const PRESET_HTML_SNIPPETS = [
  {
    name: 'Google Stitch Mobile Commerce Screen',
    description: 'Modern luxury retail layout with hotlinked product imagery, badge chips, and sticky buy bar',
    code: `<div class="max-w-md mx-auto bg-slate-900 text-slate-100 rounded-3xl overflow-hidden shadow-2xl p-6 font-sans">
  <!-- Header -->
  <div class="flex items-center justify-between pb-4 border-b border-slate-800">
    <div class="flex items-center space-x-3">
      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Avatar" class="w-10 h-10 rounded-full border border-indigo-400" />
      <div>
        <p class="text-xs text-slate-400">Welcome Back</p>
        <h3 class="text-sm font-bold text-white">Elena Rostova</h3>
      </div>
    </div>
    <span class="px-2.5 py-1 text-xs font-semibold bg-indigo-500/20 text-indigo-400 rounded-full border border-indigo-500/30">VIP Club</span>
  </div>

  <!-- Featured Banner -->
  <div class="relative mt-5 rounded-2xl overflow-hidden group">
    <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80" alt="Headphones" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
    <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-4 flex flex-col justify-end">
      <span class="text-xs uppercase tracking-wider font-bold text-amber-400">Featured Release</span>
      <h2 class="text-lg font-bold text-white">Sönder Horizon ANC Series</h2>
      <p class="text-xs text-slate-300">$349.00 USD · Free Expedited Shipping</p>
    </div>
  </div>

  <!-- Trending Grid -->
  <h4 class="mt-6 mb-3 text-xs uppercase tracking-wider font-bold text-slate-400">Hot Picks Today</h4>
  <div class="grid grid-cols-2 gap-3">
    <div class="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
      <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80" alt="Running Shoes" class="w-full h-28 object-cover rounded-lg" />
      <h5 class="text-xs font-bold mt-2 text-white truncate">Kinetic Aerolight</h5>
      <p class="text-xs font-semibold text-indigo-400 mt-1">$195.00</p>
    </div>
    <div class="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
      <img src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=400&q=80" alt="Watch" class="w-full h-28 object-cover rounded-lg" />
      <h5 class="text-xs font-bold mt-2 text-white truncate">Vanguard 1884 Auto</h5>
      <p class="text-xs font-semibold text-indigo-400 mt-1">$580.00</p>
    </div>
  </div>

  <!-- Bottom CTA -->
  <button class="w-full mt-6 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-xl transition shadow-lg shadow-indigo-600/30">
    Explore Summer Collection →
  </button>
</div>`,
  },
  {
    name: 'Nomad Travel & Discovery Screen',
    description: 'Scenic resort destination feed with hotlinked photography and booking rate cards',
    code: `<div class="max-w-md mx-auto bg-stone-900 text-stone-100 rounded-3xl overflow-hidden shadow-2xl p-6 font-sans">
  <div class="flex justify-between items-center mb-4">
    <span class="text-xs tracking-widest text-amber-300 font-mono">EXPLORE · STAY</span>
    <span class="text-xs text-stone-400">Kyoto, Japan 🇯🇵</span>
  </div>
  <div class="relative rounded-2xl overflow-hidden mb-4">
    <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80" alt="Kyoto Shrine" class="w-full h-52 object-cover" />
    <div class="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-white">★ 4.98 (240)</div>
  </div>
  <h2 class="text-xl font-bold text-white">Hoshinoya Zen Sanctuary</h2>
  <p class="text-xs text-stone-400 mt-1">Arashiyama Riverside, Kyoto · Private onsen hot bath with panoramic forest views.</p>
  <div class="flex items-center justify-between mt-5 pt-4 border-t border-stone-800">
    <div>
      <span class="text-lg font-bold text-amber-400">$480</span>
      <span class="text-xs text-stone-400"> / night</span>
    </div>
    <button class="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-md">
      Reserve Now
    </button>
  </div>
</div>`,
  },
  {
    name: 'Artisan Culinary & Cafe Screen',
    description: 'Minimalist espresso bar menu card with hotlinked product images and notes',
    code: `<div class="max-w-md mx-auto bg-zinc-950 text-zinc-100 rounded-3xl overflow-hidden p-6 border border-zinc-800 shadow-2xl font-sans">
  <div class="flex items-center space-x-3 mb-5">
    <img src="https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=200&q=80" alt="Coffee beans" class="w-12 h-12 rounded-xl object-cover" />
    <div>
      <h3 class="text-sm font-bold text-white">Kurasu Specialty Roastery</h3>
      <p class="text-xs text-zinc-400">Single Origin Geisha · Gesha Village Lot 71</p>
    </div>
  </div>
  <div class="rounded-2xl overflow-hidden relative mb-4">
    <img src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80" alt="Latte Art" class="w-full h-44 object-cover" />
  </div>
  <div class="flex gap-2 mb-4">
    <span class="px-2.5 py-1 text-[11px] bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300">Bergamot</span>
    <span class="px-2.5 py-1 text-[11px] bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300">Jasmine</span>
    <span class="px-2.5 py-1 text-[11px] bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300">White Peach</span>
  </div>
  <div class="flex justify-between items-center pt-2">
    <span class="text-base font-bold text-white">$14.50</span>
    <button class="px-4 py-2 bg-white text-zinc-950 font-bold text-xs rounded-lg hover:bg-zinc-200 transition">Order Drip</button>
  </div>
</div>`,
  },
];
