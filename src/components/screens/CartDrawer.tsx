import React, { useState } from 'react';
import { CartItem } from '../../types';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onShowToast: (message: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onShowToast,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 200 || subtotal === 0 ? 0 : 15;
  const taxes = Math.round(subtotal * 0.08 * 100) / 100;
  const total = Math.max(0, subtotal - discount + shipping + taxes);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'STITCH10' || promoCode.trim().toUpperCase() === 'HOTLINK') {
      setDiscount(30);
      setPromoApplied(true);
      onShowToast('VIP discount voucher applied: $30 OFF!');
    } else if (promoCode.trim().length > 0) {
      setDiscount(15);
      setPromoApplied(true);
      onShowToast('Welcome code applied: $15 OFF!');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      onClearCart();
      onShowToast('Order confirmed! Dispatching priority package.');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-neutral-900 border-l border-neutral-800 h-full flex flex-col justify-between shadow-2xl p-6 overflow-hidden">
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Your Shopping Bag</h2>
              <p className="text-xs text-neutral-400">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} ready to ship
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {orderComplete ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white">Payment Authorized!</h3>
            <p className="text-xs text-neutral-400 max-w-xs leading-relaxed">
              Order #SC-89241 has been securely placed. A tracking hotlink and digital invoice have been issued.
            </p>
            <button
              onClick={() => {
                setOrderComplete(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg transition"
            >
              Continue Exploring
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-neutral-800/80 text-neutral-500 flex items-center justify-center">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h4 className="text-sm font-bold text-neutral-200">Your bag is currently empty</h4>
            <p className="text-xs text-neutral-400 max-w-xs">
              Explore the curated pieces on the Home or Detail screens and add items to inspect.
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-xl"
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <>
            {/* Items Scroll Area */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3 hide-scrollbar">
              {cartItems.map((item, idx) => (
                <div
                  key={`${item.product.id}-${idx}`}
                  className="flex gap-3 bg-neutral-950/60 p-3 rounded-2xl border border-neutral-800/80"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-xl object-cover border border-neutral-800"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="text-xs font-bold text-white line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-neutral-500 hover:text-rose-400 transition ml-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[10px] text-neutral-400 mt-0.5">
                        {item.selectedColor} · {item.selectedSize}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-black text-white font-mono">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <div className="flex items-center bg-neutral-800 rounded-lg px-2 py-0.5 border border-neutral-700/60">
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                          className="w-5 text-center text-xs text-neutral-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-neutral-100">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="w-5 text-center text-xs text-neutral-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Voucher & Order Summary */}
            <div className="pt-4 border-t border-neutral-800 space-y-3">
              {/* Promo code input */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-400" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code: STITCH10"
                    disabled={promoApplied}
                    className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 disabled:opacity-50"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  disabled={promoApplied || !promoCode}
                  className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-xs font-semibold text-white rounded-xl transition"
                >
                  {promoApplied ? 'Applied' : 'Apply'}
                </button>
              </div>

              {/* Calculations breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-400 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-mono">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>VIP Promotion</span>
                    <span className="font-mono">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span className="text-white font-mono">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="text-white font-mono">${taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-neutral-800">
                  <span>Total Amount</span>
                  <span className="font-mono text-indigo-400">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Secure Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <span>Securing Transaction...</span>
                ) : (
                  <>
                    <span>Proceed to Instant Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
