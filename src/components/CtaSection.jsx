import React from 'react';
import { QrCode, ArrowRight, Building2, ShieldCheck, CheckCircle2, PhoneCall, Sparkles } from 'lucide-react';

export default function CtaSection({ onOpenScanModal, onOpenLoginModal }) {
  return (
    <section className="py-20 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-gradient-to-br from-brand-900 via-brand-800 to-indigo-950 p-8 sm:p-12 lg:p-16 text-white shadow-2xl overflow-hidden">
          
          {/* Ambient grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] pointer-events-none" />
          
          {/* Glowing blur orb */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl mx-auto text-center space-y-6">
            
            {/* Top pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-brand-200 text-xs font-semibold backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-300" />
              <span>Ready for Municipal Pilot Deployment</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Bring Real-Time Transparency to Every Asset in Your City
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-brand-100/90 leading-relaxed max-w-2xl mx-auto font-normal">
              Whether you are a citizen needing a fast repair or a municipal leader looking to optimize ward operations, UrbanQR bridges the gap seamlessly.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={onOpenScanModal}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl text-base font-bold text-brand-900 bg-white hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <QrCode className="w-5 h-5 text-brand-700" />
                <span>Simulate Asset Scan</span>
                <ArrowRight className="w-4 h-4 text-brand-600" />
              </button>

              <button
                onClick={onOpenLoginModal}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-7 py-4 rounded-xl text-base font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-sm transition-all"
              >
                <Building2 className="w-5 h-5 text-brand-200" />
                <span>Access Municipal Portal</span>
              </button>
            </div>

            {/* Trust checkmarks */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-brand-200/80 font-medium">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Citizen App Download</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Smart Duplicate Shield</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Gov-Grade GIS Integration</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
