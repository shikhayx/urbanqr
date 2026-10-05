import React, { useState } from 'react';
import { 
  Zap, 
  Trash2, 
  Bus, 
  Sparkles, 
  Trees, 
  Droplets, 
  QrCode, 
  ArrowUpRight, 
  CheckCircle2, 
  Tag, 
  Shield, 
  MapPin,
  Clock,
  Layers
} from 'lucide-react';
import { assetTypes } from '../data/landingData';

// Map icon name string to Lucide component
const iconMap = {
  Zap: Zap,
  Trash2: Trash2,
  Bus: Bus,
  Sparkles: Sparkles,
  Trees: Trees,
  Droplets: Droplets,
};

export default function SmartAssets({ onSelectAssetForScan }) {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');

  const categories = ['All', 'Electrical & Power', 'Sanitation', 'Public Transit', 'Public Health', 'Urban Greenery', 'Water & Utilities'];

  const filteredAssets = activeCategoryFilter === 'All' 
    ? assetTypes 
    : assetTypes.filter(a => a.category === activeCategoryFilter);

  return (
    <section id="smart-assets" className="py-20 md:py-28 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Civic Infrastructure Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Smart Urban Assets
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Every physical public utility is retrofitted with an anodized, high-durability QR code that links physical infrastructure to digital municipal workflows.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCategoryFilter === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Assets Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredAssets.map((asset) => {
            const IconComponent = iconMap[asset.iconName] || Layers;

            return (
              <div
                key={asset.id}
                className="group relative bg-white rounded-2xl p-6 border border-slate-200/80 shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between hover:border-brand-300"
              >
                <div>
                  {/* Card Top: Icon & Badge */}
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-200">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 font-mono border border-slate-200">
                        {asset.codePrefix}
                      </span>
                      <p className="text-[10px] text-slate-400 mt-1 font-medium">{asset.badge}</p>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="mt-4">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                      {asset.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">
                      {asset.category}
                    </p>
                    <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                      {asset.description}
                    </p>
                  </div>

                  {/* Common Issues Handled */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-700 mb-2 flex items-center">
                      <Tag className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      1-Tap Common Issues:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {asset.commonIssues.map((issue, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200/70 text-[11px] text-slate-600 font-medium"
                        >
                          {issue}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Bottom Meta & Simulator Trigger */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">{asset.stats}</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-medium">{asset.resolvedRate} fix rate</span>
                  </div>

                  <button
                    onClick={() => onSelectAssetForScan(asset)}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition-colors"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Test Scan</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Banner Prompt */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Custom Municipal Asset Class Integration</h4>
              <p className="text-xs text-slate-500">Need to tag bridges, storm drains, or solar microgrids? UrbanQR supports custom dynamic schemas.</p>
            </div>
          </div>
          <a
            href="#footer"
            className="shrink-0 text-xs font-semibold text-brand-600 hover:text-brand-700 inline-flex items-center"
          >
            Learn about custom onboarding <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>

      </div>
    </section>
  );
}
