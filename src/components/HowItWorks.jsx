import React from 'react';
import { QrCode, Smartphone, FileSpreadsheet, Activity, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { howItWorksSteps } from '../data/landingData';

const stepIconMap = {
  QrCode: QrCode,
  CheckCircle2: CheckCircle2,
  FileSpreadsheet: FileSpreadsheet,
  Activity: Activity,
};

export default function HowItWorks({ onOpenScanModal }) {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-slate-200 to-transparent hidden lg:block -translate-y-16" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
            <span>Seamless 4-Step Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Eliminating municipal reporting friction. No lengthy phone calls, no complex mobile app signups, no lost tickets.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {howItWorksSteps.map((step, index) => {
            const Icon = stepIconMap[step.icon] || QrCode;

            return (
              <div
                key={step.step}
                className="relative bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 shadow-subtle hover:shadow-card hover:border-brand-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Step Number & Icon Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black font-mono text-slate-300 group-hover:text-brand-400 transition-colors">
                      {step.step}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-brand-600">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="mb-2">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-brand-50 text-brand-700 border border-brand-200/70">
                      {step.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mb-3">
                    {step.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                {/* Detail Micro-Box */}
                <div className="pt-3 border-t border-slate-200/60 text-xs text-slate-500 font-normal">
                  <span className="text-brand-600 font-semibold">Civic Impact: </span>
                  {step.detail}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Try-it CTA */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-2 pl-4 pr-3 bg-slate-100 rounded-2xl border border-slate-200">
            <span className="text-xs sm:text-sm font-medium text-slate-700">
              Want to see how easy it is for citizens in your municipality?
            </span>
            <button
              onClick={onOpenScanModal}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Simulate Citizen QR Scan</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
