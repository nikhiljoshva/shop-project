import React, { useState } from 'react';
import { SAMPLE_PRODUCTS, CURRENT_USER } from '../data/mockScreens';
import { 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  Image as ImageIcon, 
  Search, 
  Sparkles,
  Link2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface MediaInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (message: string) => void;
}

export const MediaInspectorModal: React.FC<MediaInspectorModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [filterQuery, setFilterQuery] = useState('');
  const [testUrl, setTestUrl] = useState('');
  const [testResult, setTestResult] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  // Gather all hotlink images used throughout the application
  const allImages = [
    {
      category: 'User Avatar & Cover',
      title: 'Elena Rostova Avatar',
      url: CURRENT_USER.avatar,
    },
    {
      category: 'User Avatar & Cover',
      title: 'Studio Abstract Cover Banner',
      url: CURRENT_USER.coverImage,
    },
    ...SAMPLE_PRODUCTS.flatMap((p) =>
      p.images.map((img, idx) => ({
        category: p.category,
        title: `${p.name} - Angle ${idx + 1}`,
        url: img,
      }))
    ),
    {
      category: 'Travel & Cafe',
      title: 'Kyoto Zen Shrine Sanctuary',
      url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    },
    {
      category: 'Travel & Cafe',
      title: 'Artisan Espresso Latte Art',
      url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const filtered = allImages.filter(
    (item) =>
      item.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.url.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    onShowToast('Direct image hotlink copied to clipboard!');
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleTestHotlink = () => {
    if (!testUrl.trim()) return;
    setTestResult('loading');
    const img = new Image();
    img.onload = () => {
      setTestResult('success');
      onShowToast('Image hotlink validated successfully!');
    };
    img.onerror = () => {
      setTestResult('error');
      onShowToast('Image hotlink failed to load (check CORS or URL).');
    };
    img.src = testUrl.trim();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl flex flex-col max-h-[85vh] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Hotlinked Assets Hub</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300">
                  {allImages.length} Direct CDN Links
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Browse and copy any live hotlink image URL used across screens
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hotlink URL Tester Bar */}
        <div className="p-4 bg-neutral-950/60 border-b border-neutral-800 space-y-2">
          <label className="text-[11px] font-bold text-neutral-300 flex items-center gap-1.5">
            <Link2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Validate Any Hotlink URL:</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={testUrl}
              onChange={(e) => {
                setTestUrl(e.target.value);
                setTestResult('idle');
              }}
              placeholder="Paste any https://images.unsplash.com/... or CDN link to test"
              className="flex-1 px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 font-mono"
            />
            <button
              onClick={handleTestHotlink}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md transition"
            >
              Test Link
            </button>
          </div>

          {testResult === 'success' && (
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
              <span>Valid live image! Ready for hotlinking into your screens.</span>
            </div>
          )}
          {testResult === 'error' && (
            <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 p-2 rounded-xl border border-rose-500/20">
              <AlertCircle className="w-4 h-4" />
              <span>Unable to load image. Verify URL permissions and hotlink access.</span>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="px-5 pt-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-neutral-400" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter by product, category, or URL..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-700"
            />
          </div>
        </div>

        {/* Scrollable Hotlinks Grid */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3 hide-scrollbar">
          {filtered.map((item, index) => (
            <div
              key={index}
              className="p-3 bg-neutral-950/80 rounded-2xl border border-neutral-800 flex items-center justify-between gap-4 hover:border-neutral-700 transition"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-14 h-14 rounded-xl object-cover border border-neutral-800 flex-shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[10px] font-mono font-semibold uppercase text-indigo-400">
                    {item.category}
                  </span>
                  <h5 className="text-xs font-bold text-white truncate">{item.title}</h5>
                  <p className="text-[10px] text-neutral-500 font-mono truncate mt-0.5 max-w-sm">
                    {item.url}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleCopy(item.url)}
                  className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold flex items-center gap-1.5 border border-neutral-700 transition"
                >
                  {copiedUrl === item.url ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Hotlink</span>
                    </>
                  )}
                </button>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition"
                  title="Open image directly"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
