import React, { useState } from 'react';
import { downloadPortfolioZip } from '../utils/downloader';
import { X, Download, Check, Copy, ExternalLink, FileArchive, Terminal, Sparkles } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);

  if (!isOpen) return null;

  const directZipUrl = `${window.location.origin}/ramrup-satpati-portfolio.zip`;
  const curlCommand = `curl -O ${directZipUrl}`;

  const handleDownload = () => {
    setDownloadStatus('Downloading...');
    const success = downloadPortfolioZip('ramrup-satpati-portfolio.zip');
    if (success) {
      setTimeout(() => {
        setDownloadStatus('Success! Downloaded ramrup-satpati-portfolio.zip (81 KB)');
      }, 500);
    } else {
      setDownloadStatus('Opening direct link...');
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(directZipUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-2xl bg-[#071120] border border-cyan-500/30 shadow-2xl p-6 sm:p-8 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400">
            <FileArchive className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-2xl font-bold font-serif-space">Download Project ZIP</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Complete source code bundle · 81 KB · Ready to run
            </p>
          </div>
        </div>

        {/* Primary Instant Download Button */}
        <div className="mb-6 p-4 rounded-xl bg-[#0a182e] border border-white/10 text-center">
          <button
            type="button"
            onClick={handleDownload}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer transform active:scale-95"
          >
            <Download className="w-5 h-5" />
            <span>Click Here to Save ZIP to Your Computer</span>
          </button>

          {downloadStatus && (
            <div className="mt-3 text-xs font-mono text-emerald-400 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {downloadStatus}
            </div>
          )}
        </div>

        {/* Option 2: Direct URL Copy or Open in New Tab */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5">
              Direct File URL (Right-click & Save As or Open):
            </label>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/80 border border-white/10 font-mono text-xs">
              <input
                type="text"
                readOnly
                value={directZipUrl}
                className="flex-1 bg-transparent border-0 text-cyan-300 focus:outline-none select-all"
              />
              <button
                type="button"
                onClick={handleCopyUrl}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                title="Copy URL"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <a
                href={directZipUrl}
                target="_blank"
                rel="noreferrer"
                download="ramrup-satpati-portfolio.zip"
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                title="Open directly in new browser tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Option 3: Terminal Curl Command */}
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5">
              Or run in terminal (one-line download):
            </label>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-black/90 border border-white/10 font-mono text-xs text-slate-300">
              <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <code className="flex-1 overflow-x-auto text-emerald-300 select-all whitespace-nowrap">
                {curlCommand}
              </code>
              <button
                type="button"
                onClick={handleCopyCurl}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer shrink-0"
                title="Copy curl command"
              >
                {copiedCurl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Standalone SpaceEdu HTML link */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Need zero-build standalone HTML?</span>
          <a
            href="/spaceedu-standalone.html"
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
          >
            Open spaceedu-standalone.html <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
