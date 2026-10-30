export type ScreenId = 'home' | 'detail' | 'activity' | 'profile' | 'importer';

export type DeviceType = 'iphone' | 'pixel' | 'tablet' | 'responsive';

export interface HotlinkImage {
  id: string;
  url: string;
  title: string;
  category: string;
  aspectRatio?: string;
  photographer?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  inStock: boolean;
  featured?: boolean;
  badge?: string;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface ActivityMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  iconName: string;
}

export interface UserProfile {
  name: string;
  handle: string;
  avatar: string;
  coverImage: string;
  tier: string;
  points: number;
  savedCount: number;
  ordersCount: number;
}
