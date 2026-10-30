import React, { useState, useMemo } from 'react';
import { PRESET_HTML_SNIPPETS } from '../../data/mockScreens';
import { 
  Code, 
  Play, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  FileCode, 
  Image as ImageIcon,
  Layers,
  RefreshCw,
  Plus
} from 'lucide-react';

interface HtmlImporterScreenProps {
  onShowToast: (message: string) => void;
}

export const HtmlImporterScreen: React.FC<HtmlImporterScreenProps> = ({ onShowToast }) => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [htmlCode, setHtmlCode] = useState(PRESET_HTML_SNIPPETS[0].code);
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'images'>('preview');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Parse all <img src="..."> hotlinks from the HTML code
  const extractedImages = useMemo(() => {
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    const altRegex = /alt=["']([^"']*)["']/i;
    const matches: { url: string; alt: string; tag: string }[] = [];
    let match;

    while ((match = imgRegex.exec(htmlCode)) !== null) {
      const fullTag = match[0];
      const src = match[1];
      const altMatch = altRegex.exec(fullTag);
      const alt = altMatch ? altMatch[1] : 'Hotlinked Asset';
      matches.push({ url: src, alt, tag: fullTag });
    }

    return matches;
  }, [htmlCode]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    onShowToast(`${label} copied to clipboard!`);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleSelectPreset = (index: number) => {
    setSelectedPresetIndex(index);
    setHtmlCode(PRESET_HTML_SNIPPETS[index].code);
    onShowToast(`Loaded ${PRESET_HTML_SNIPPETS[index].name}`);
  };

  const handleAddSampleImage = (unsplashUrl: string) => {
    setHtmlCode((prev) => `${prev}\n<div class="mt-4"><img src="${unsplashUrl}" alt="Added Screen Asset" class="w-full rounded-2xl object-cover h-40 shadow-md" /></div>`);
    onShowToast('Hotlinked image inserted into screen HTML!');
  };

  return (
    <div className="w-full flex-1 flex flex-col px-4 pt-3 pb-8 space-y-5">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-violet-400">
              HTML Screen Engine
            </span>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">
              Live Parser
            </span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-white">
            HTML & Hotlink Studio
          </h2>
        </div>
        <button
          onClick={() => handleCopy(htmlCode, 'Screen HTML')}
          className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition"
          title="Copy HTML code"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-neutral-400 leading-relaxed -mt-2">
        Paste HTML from Stitch, Figma, or design prototypes below. Images are automatically detected, extracted, and hotlinked live inside the viewport.
      </p>

      {/* Preset Screen Templates */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
          Reference Screen Presets:
        </label>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {PRESET_HTML_SNIPPETS.map((preset, idx) => (
            <button
              key={preset.name}
              onClick={() => handleSelectPreset(idx)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition text-left ${
                selectedPresetIndex === idx
                  ? 'bg-violet-600/20 border-violet-500 text-white'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <span>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* View Mode Tabs: Preview | Code Editor | Hotlink Assets */}
      <div className="flex items-center bg-neutral-900 p-1 rounded-xl border border-neutral-800">
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeTab === 'preview'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Play className="w-3.5 h-3.5 text-emerald-400" />
          <span>Live Render</span>
        </button>

        <button
          onClick={() => setActiveTab('code')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeTab === 'code'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Code className="w-3.5 h-3.5 text-indigo-400" />
          <span>Edit HTML</span>
        </button>

        <button
          onClick={() => setActiveTab('images')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeTab === 'images'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5 text-violet-400" />
          <span>Hotlinks ({extractedImages.length})</span>
        </button>
      </div>

      {/* Tab 1: Live Render Container */}
      {activeTab === 'preview' && (
        <div className="space-y-4">
          <div className="p-3 bg-neutral-950/90 rounded-2xl border border-neutral-800/90 shadow-inner">
            <div
              className="preview-sandbox"
              dangerouslySetInnerHTML={{ __html: htmlCode }}
            />
          </div>

          <div className="p-3 rounded-2xl bg-violet-950/30 border border-violet-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-xs text-neutral-300">
                {extractedImages.length} images hotlinked dynamically from CDN
              </span>
            </div>
            <button
              onClick={() => setActiveTab('images')}
              className="text-xs text-violet-400 font-bold hover:underline"
            >
              View Assets →
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: HTML Code Editor */}
      {activeTab === 'code' && (
        <div className="space-y-3">
          <div className="relative">
            <textarea
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              rows={14}
              placeholder="Paste custom <div> or HTML screen mockup here..."
              className="w-full p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50 leading-relaxed resize-y"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-neutral-500 font-mono">
              {htmlCode.length} chars · {htmlCode.split('\n').length} lines
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setHtmlCode(PRESET_HTML_SNIPPETS[selectedPresetIndex].code)}
                className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold border border-neutral-800 flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className="px-4 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
              >
                <Play className="w-3 h-3" /> Render Screen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Extracted Hotlink Images List */}
      {activeTab === 'images' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
              Hotlinked Image Assets in Current Screen
            </h4>
            <span className="text-[11px] text-violet-400 font-mono">
              Total: {extractedImages.length}
            </span>
          </div>

          {extractedImages.length === 0 ? (
            <div className="p-6 text-center bg-neutral-900/40 rounded-2xl border border-neutral-800 text-xs text-neutral-500">
              No `&lt;img src="..."&gt;` tags detected in this HTML code.
            </div>
          ) : (
            <div className="space-y-3">
              {extractedImages.map((img, index) => (
                <div
                  key={index}
                  className="p-3 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex items-center gap-3.5 shadow-sm"
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-16 h-16 rounded-xl object-cover border border-neutral-800 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate">
                      {img.alt || `Asset #${index + 1}`}
                    </p>
                    <p className="text-[10px] text-neutral-400 font-mono truncate mt-0.5">
                      {img.url}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleCopy(img.url, 'Image Hotlink')}
                        className="py-1 px-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-[10px] font-semibold flex items-center gap-1 border border-neutral-700"
                      >
                        {copiedUrl === img.url ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copy URL
                          </>
                        )}
                      </button>
                      <a
                        href={img.url}
                        target="_blank"
                        rel="noreferrer"
                        className="py-1 px-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px] font-semibold flex items-center gap-1 border border-neutral-700"
                      >
                        Open <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick-Insert More Hotlinks */}
          <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
            <h5 className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5 text-indigo-400" />
              <span>Quick Hotlink Image Injector</span>
            </h5>
            <p className="text-[11px] text-neutral-400">
              Click any high-resolution CDN photo below to inject it into your screen HTML:
            </p>
            <div className="grid grid-cols-4 gap-2">
              {[
                { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80', label: 'Audio' },
                { url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80', label: 'Watch' },
                { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80', label: 'Shoe' },
                { url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80', label: 'Interior' },
              ].map((sample, i) => (
                <button
                  key={i}
                  onClick={() => handleAddSampleImage(sample.url)}
                  className="group relative aspect-square rounded-xl overflow-hidden border border-neutral-800 hover:border-violet-500 transition cursor-pointer"
                >
                  <img src={sample.url} alt={sample.label} className="w-full h-full object-cover group-hover:scale-110 transition" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 flex items-end p-1">
                    <span className="text-[9px] font-bold text-white uppercase">{sample.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
