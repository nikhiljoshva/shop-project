import React, { useState } from 'react';
import { ScreenId, DeviceType, ProductItem, CartItem } from './types';
import { SAMPLE_PRODUCTS, CURRENT_USER, ACTIVITY_METRICS } from './data/mockScreens';
import { DeviceFrame } from './components/DeviceFrame';
import { HomeScreen } from './components/screens/HomeScreen';
import { DetailScreen } from './components/screens/DetailScreen';
import { ActivityScreen } from './components/screens/ActivityScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { HtmlImporterScreen } from './components/screens/HtmlImporterScreen';
import { CartDrawer } from './components/screens/CartDrawer';
import { MediaInspectorModal } from './components/MediaInspectorModal';
import { Check, Sparkles } from 'lucide-react';

export default function App() {
  const [device, setDevice] = useState<DeviceType>('iphone');
  const [activeScreen, setActiveScreen] = useState<ScreenId>('home');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem>(SAMPLE_PRODUCTS[0]);
  const [favorites, setFavorites] = useState<string[]>(['prod-1', 'prod-2']);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: SAMPLE_PRODUCTS[0],
      quantity: 1,
      selectedColor: 'Matte Obsidian',
      selectedSize: 'Standard',
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleSelectProduct = (product: ProductItem) => {
    setSelectedProduct(product);
    setActiveScreen('detail');
  };

  const handleToggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Item removed from saved wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Item saved to your profile collection ❤️');
        return [...prev, productId];
      }
    });
  };

  const handleAddToCart = (
    product: ProductItem,
    color = product.colors[0]?.name || 'Standard',
    size = product.sizes[0] || 'Standard',
    quantity = 1
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += quantity;
        return copy;
      } else {
        return [...prev, { product, quantity, selectedColor: color, selectedSize: size }];
      }
    });
    showToast(`Added ${quantity}x "${product.name}" to Bag!`);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems((prev) => {
      const copy = [...prev];
      copy[index].quantity = newQty;
      return copy;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    showToast('Item removed from bag');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const favoriteProducts = SAMPLE_PRODUCTS.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans relative selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-neutral-900 border border-indigo-500/40 text-neutral-100 shadow-2xl text-xs font-semibold animate-bounce shadow-indigo-500/10">
          <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Check className="w-3 h-3 text-indigo-400" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Studio Device Viewport Frame */}
      <DeviceFrame
        device={device}
        onDeviceChange={setDevice}
        activeScreen={activeScreen}
        onScreenChange={setActiveScreen}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenInspector={() => setIsInspectorOpen(true)}
      >
        {activeScreen === 'home' && (
          <HomeScreen
            products={SAMPLE_PRODUCTS}
            onSelectProduct={handleSelectProduct}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={handleAddToCart}
            onShowToast={showToast}
          />
        )}

        {activeScreen === 'detail' && (
          <DetailScreen
            product={selectedProduct}
            onBack={() => setActiveScreen('home')}
            isFavorite={favorites.includes(selectedProduct.id)}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={handleAddToCart}
            onShowToast={showToast}
          />
        )}

        {activeScreen === 'activity' && (
          <ActivityScreen
            metrics={ACTIVITY_METRICS}
            onShowToast={showToast}
          />
        )}

        {activeScreen === 'profile' && (
          <ProfileScreen
            user={CURRENT_USER}
            favoriteProducts={favoriteProducts}
            onSelectProduct={handleSelectProduct}
            onShowToast={showToast}
          />
        )}

        {activeScreen === 'importer' && (
          <HtmlImporterScreen onShowToast={showToast} />
        )}
      </DeviceFrame>

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onShowToast={showToast}
      />

      {/* Hotlink Assets Inspector Modal */}
      <MediaInspectorModal
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
        onShowToast={showToast}
      />
    </div>
  );
}
