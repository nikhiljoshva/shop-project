import React, { useState } from 'react';
import { UserProfile, ProductItem } from '../../types';
import { 
  User, 
  Settings, 
  Award, 
  Bookmark, 
  Bell, 
  Shield, 
  Sliders, 
  LogOut, 
  ChevronRight, 
  Check, 
  Copy,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface ProfileScreenProps {
  user: UserProfile;
  favoriteProducts: ProductItem[];
  onSelectProduct: (product: ProductItem) => void;
  onShowToast: (message: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  favoriteProducts,
  onSelectProduct,
  onShowToast,
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [copiedAvatar, setCopiedAvatar] = useState(false);

  const handleCopyAvatarUrl = () => {
    navigator.clipboard.writeText(user.avatar);
    setCopiedAvatar(true);
    onShowToast('Avatar image hotlink copied!');
    setTimeout(() => setCopiedAvatar(false), 2000);
  };

  return (
    <div className="w-full flex-1 flex flex-col pb-8">
      {/* Cover Image */}
      <div className="relative h-32 w-full bg-neutral-900 overflow-hidden">
        <img
          src={user.coverImage}
          alt="Profile Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
      </div>

      <div className="px-4 -mt-12 space-y-5">
        {/* Avatar & User Details */}
        <div className="flex items-end justify-between">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-3xl object-cover ring-4 ring-neutral-950 shadow-xl"
            />
            <button
              onClick={handleCopyAvatarUrl}
              title="Copy avatar hotlink"
              className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition"
            >
              {copiedAvatar ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>

          <div className="flex gap-2">
            <span className="px-3 py-1 rounded-xl text-xs font-bold bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> {user.tier}
            </span>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white">{user.name}</h2>
          <p className="text-xs text-neutral-400 font-mono">{user.handle}</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 text-center">
          <div>
            <span className="text-base font-extrabold text-white font-mono">
              {user.points.toLocaleString()}
            </span>
            <p className="text-[10px] text-neutral-400 font-medium">VIP Points</p>
          </div>
          <div className="border-x border-neutral-800">
            <span className="text-base font-extrabold text-white font-mono">
              {favoriteProducts.length}
            </span>
            <p className="text-[10px] text-neutral-400 font-medium">Saved Items</p>
          </div>
          <div>
            <span className="text-base font-extrabold text-white font-mono">
              {user.ordersCount}
            </span>
            <p className="text-[10px] text-neutral-400 font-medium">Total Orders</p>
          </div>
        </div>

        {/* Saved Favorites Showcase */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-indigo-400" />
              <span>Saved Hotlink Pieces</span>
            </h4>
            <span className="text-[11px] text-neutral-500">
              {favoriteProducts.length} collected
            </span>
          </div>

          {favoriteProducts.length === 0 ? (
            <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800 text-center text-xs text-neutral-500">
              Tap the heart icon on any product to save hotlinked items here.
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {favoriteProducts.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectProduct(item)}
                  className="group relative aspect-square rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 cursor-pointer"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
                    <span className="text-[10px] font-bold text-white truncate font-mono">
                      ${item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Preferences & Settings */}
        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            App & Session Preferences
          </h4>

          <div className="space-y-2">
            <div className="p-3 rounded-2xl bg-neutral-900/70 border border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-neutral-800 text-neutral-300">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-white">Push Notifications</h5>
                  <p className="text-[10px] text-neutral-400">Order updates & exclusive drops</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setNotificationsEnabled(!notificationsEnabled);
                  onShowToast(notificationsEnabled ? 'Notifications silenced' : 'Notifications active');
                }}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  notificationsEnabled ? 'bg-indigo-600' : 'bg-neutral-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-neutral-900/70 border border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-neutral-800 text-neutral-300">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-white">Biometric Sign-In</h5>
                  <p className="text-[10px] text-neutral-400">FaceID / TouchID protection</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setBiometricsEnabled(!biometricsEnabled);
                  onShowToast(biometricsEnabled ? 'Biometrics disabled' : 'Biometrics enabled');
                }}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  biometricsEnabled ? 'bg-indigo-600' : 'bg-neutral-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    biometricsEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
