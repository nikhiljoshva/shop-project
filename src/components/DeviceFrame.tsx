import React, { useState, useEffect } from 'react';
import { DeviceType, ScreenId } from '../types';
import { 
  Wifi, 
  Battery, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Moon, 
  Sun, 
  RotateCw, 
  Maximize2, 
  ZoomIn, 
  ZoomOut,
  ShoppingBag,
  Home,
  BarChart2,
  User,
  Code
} from 'lucide-react';

interface DeviceFrameProps {
  device: DeviceType;
  onDeviceChange: (device: DeviceType) => void;
  activeScreen: ScreenId;
  onScreenChange: (screen: ScreenId) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenInspector: () => void;
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  device,
  onDeviceChange,
  activeScreen,
  onScreenChange,
  cartCount,
  onOpenCart,
  onOpenInspector,
  children,
}) => {
  const [scale, setScale] = useState<number>(1);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<string>('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const getDeviceDimensions = () => {
    switch (device) {
      case 'iphone':
        return {
          width: '390px',
          height: '844px',
          borderRadius: '54px',
          borderWidth: '12px',
        };
      case 'pixel':
        return {
          width: '412px',
          height: '892px',
          borderRadius: '44px',
          borderWidth: '10px',
        };
      case 'tablet':
        return {
          width: '768px',
          height: '920px',
          borderRadius: '36px',
          borderWidth: '14px',
        };
      case 'responsive':
      default:
        return {
          width: '100%',
          maxWidth: '1200px',
          height: '860px',
          borderRadius: '24px',
          borderWidth: '4px',
        };
    }
  };

  const dims = getDeviceDimensions();

  return (
    <div className="flex flex-col items-center w-full min-h-screen pb-16">
      {/* Top Studio Toolbar */}
      <header className="w-full bg-neutral-900/90 backdrop-blur-xl border-b border-neutral-800 sticky top-0 z-50 px-4 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-white tracking-tight">ScreenCraft Studio</h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Live Hotlinks
              </span>
            </div>
            <p className="text-xs text-neutral-400">Multi-screen layout preview & HTML hotlink inspector</p>
          </div>
        </div>

        {/* Screen Switcher Pills */}
        <div className="flex items-center p-1 bg-neutral-950/80 rounded-xl border border-neutral-800">
          <button
            onClick={() => onScreenChange('home')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeScreen === 'home'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Discover</span>
          </button>

          <button
            onClick={() => onScreenChange('detail')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeScreen === 'detail'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Product Page</span>
          </button>

          <button
            onClick={() => onScreenChange('activity')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeScreen === 'activity'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Activity</span>
          </button>

          <button
            onClick={() => onScreenChange('profile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeScreen === 'profile'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile</span>
          </button>

          <button
            onClick={() => onScreenChange('importer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeScreen === 'importer'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm'
                : 'text-violet-300 hover:text-white hover:bg-violet-900/40'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>HTML Importer</span>
          </button>
        </div>

        {/* Viewport & Utility Tools */}
        <div className="flex items-center gap-2">
          {/* Device selectors */}
          <div className="flex items-center bg-neutral-950 p-1 rounded-xl border border-neutral-800">
            <button
              onClick={() => onDeviceChange('iphone')}
              title="iPhone 16 Pro Viewport"
              className={`p-1.5 rounded-lg text-xs transition ${
                device === 'iphone' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDeviceChange('pixel')}
              title="Google Pixel 9 Viewport"
              className={`p-1.5 rounded-lg text-xs transition ${
                device === 'pixel' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Smartphone className="w-4 h-4 rotate-90" />
            </button>
            <button
              onClick={() => onDeviceChange('tablet')}
              title="Tablet Viewport"
              className={`p-1.5 rounded-lg text-xs transition ${
                device === 'tablet' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDeviceChange('responsive')}
              title="Fluid Canvas View"
              className={`p-1.5 rounded-lg text-xs transition ${
                device === 'responsive' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>

          {/* Scale controls */}
          <div className="hidden sm:flex items-center bg-neutral-950 px-2 py-1 rounded-xl border border-neutral-800 text-xs text-neutral-400 gap-1">
            <button
              onClick={() => setScale(Math.max(0.7, scale - 0.1))}
              disabled={scale <= 0.7}
              className="p-1 hover:text-white disabled:opacity-30"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center font-mono">{Math.round(scale * 100)}%</span>
            <button
              onClick={() => setScale(Math.min(1.2, scale + 0.1))}
              disabled={scale >= 1.2}
              className="p-1 hover:text-white disabled:opacity-30"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Theme switcher */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            title="Toggle Device Theme (Dark/Light)"
            className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800 transition"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Hotlink Inspector Trigger */}
          <button
            onClick={onOpenInspector}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white border border-neutral-700 shadow-sm transition"
          >
            <span>Media Links</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 transition"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-neutral-900 animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Preview Work Area */}
      <main className="flex-1 w-full flex items-center justify-center p-4 md:p-8 overflow-auto">
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="relative transition-all duration-300"
        >
          {/* Device Mockup Shell */}
          <div
            style={{
              width: dims.width,
              height: dims.height,
              borderRadius: dims.borderRadius,
            }}
            className={`relative overflow-hidden shadow-2xl transition-all duration-300 border-neutral-800 ${
              device === 'responsive'
                ? 'border-2 shadow-neutral-950/80 bg-neutral-900'
                : 'border-[10px] sm:border-[12px] ring-1 ring-neutral-700/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] bg-neutral-900'
            }`}
          >
            {/* Dynamic Island / Camera Notch (for mobile phone views) */}
            {device === 'iphone' && (
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-40 h-7 w-28 bg-black rounded-full flex items-center justify-between px-2.5 shadow-md pointer-events-auto">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800" />
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[10px] font-mono text-neutral-300 font-bold">5G</span>
                </div>
              </div>
            )}

            {device === 'pixel' && (
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-40 h-4 w-4 bg-black rounded-full flex items-center justify-center ring-2 ring-neutral-800">
                <div className="w-2 h-2 rounded-full bg-neutral-900" />
              </div>
            )}

            {/* Simulated Status Bar (Mobile Only) */}
            {(device === 'iphone' || device === 'pixel') && (
              <div className="absolute top-0 left-0 right-0 h-10 px-6 flex items-center justify-between z-30 pointer-events-none text-xs font-semibold select-none text-neutral-200">
                <span>{currentTime}</span>
                <div className="flex items-center gap-2">
                  <Wifi className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono">5G</span>
                  <div className="flex items-center gap-0.5">
                    <span className="text-[10px]">98%</span>
                    <Battery className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )}

            {/* Inner Content Viewport */}
            <div
              className={`w-full h-full flex flex-col overflow-y-auto hide-scrollbar transition-colors duration-200 ${
                isDarkMode ? 'bg-neutral-950 text-neutral-100' : 'bg-slate-50 text-slate-900'
              } ${device === 'iphone' || device === 'pixel' ? 'pt-10 pb-16' : 'p-0'}`}
            >
              {children}
            </div>

            {/* Bottom Mobile Tab Bar (Inside Device Frame) */}
            {(device === 'iphone' || device === 'pixel') && (
              <nav
                className={`absolute bottom-0 left-0 right-0 h-16 border-t px-6 flex items-center justify-around z-30 backdrop-blur-xl ${
                  isDarkMode
                    ? 'bg-neutral-950/85 border-neutral-800/80 text-neutral-400'
                    : 'bg-white/85 border-slate-200 text-slate-500'
                }`}
              >
                <button
                  onClick={() => onScreenChange('home')}
                  className={`flex flex-col items-center gap-1 transition ${
                    activeScreen === 'home' ? 'text-indigo-400' : 'hover:text-neutral-200'
                  }`}
                >
                  <Home className="w-5 h-5" />
                  <span className="text-[10px] font-medium">Home</span>
                </button>

                <button
                  onClick={() => onScreenChange('detail')}
                  className={`flex flex-col items-center gap-1 transition ${
                    activeScreen === 'detail' ? 'text-indigo-400' : 'hover:text-neutral-200'
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span className="text-[10px] font-medium">Shop</span>
                </button>

                <button
                  onClick={() => onScreenChange('importer')}
                  className={`flex flex-col items-center gap-1 transition ${
                    activeScreen === 'importer' ? 'text-violet-400' : 'hover:text-neutral-200'
                  }`}
                >
                  <div className="w-7 h-7 -mt-2 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-full flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
                    <Code className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-bold">HTML</span>
                </button>

                <button
                  onClick={() => onScreenChange('activity')}
                  className={`flex flex-col items-center gap-1 transition ${
                    activeScreen === 'activity' ? 'text-indigo-400' : 'hover:text-neutral-200'
                  }`}
                >
                  <BarChart2 className="w-5 h-5" />
                  <span className="text-[10px] font-medium">Activity</span>
                </button>

                <button
                  onClick={() => onScreenChange('profile')}
                  className={`flex flex-col items-center gap-1 transition ${
                    activeScreen === 'profile' ? 'text-indigo-400' : 'hover:text-neutral-200'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="text-[10px] font-medium">Profile</span>
                </button>
              </nav>
            )}

            {/* Bottom Home Indicator Line (iPhone/Pixel) */}
            {(device === 'iphone' || device === 'pixel') && (
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-neutral-500/40 rounded-full z-40 pointer-events-none" />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
