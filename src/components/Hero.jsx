import React, { useState } from 'react';
import { 
  QrCode, 
  ArrowRight, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Zap, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  Flame
} from 'lucide-react';

export default function Hero({ onOpenScanModal, onOpenLoginModal }) {
  const [activeStepTab, setActiveStepTab] = useState(0);

  const stepTabs = [
    {
      label: '1. Scan',
      badge: 'Zero Friction',
      icon: QrCode,
      title: 'Durable QR on Physical Asset',
      desc: 'Citizen points camera at Pole #SL-8842. No mobile app download or sign-in barrier needed.'
    },
    {
      label: '2. Report',
      badge: 'Deduplication Shield',
      icon: AlertTriangle,
      title: 'Smart Deduplication & Auto-Fill',
      desc: 'System detects GPS and checks if an issue already exists. Citizen either confirms or submits new report in 20s.'
    },
    {
      label: '3. Resolve',
      badge: 'Field Verification',
      icon: CheckCircle2,
      title: 'Direct Ward Dispatch & Proof',
      desc: 'Automated work-order dispatched to municipal electrical crew. Closed with GPS & photo verification.'
    }
  ];

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/60 border-b border-slate-200/60">
      {/* Background Subtle Grid & Lighting Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold tracking-wide shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
              <span>Smart City 4.0 Infrastructure Standard</span>
              <span className="text-slate-300">|</span>
              <span className="text-brand-800 font-medium">UrbanQR Platform</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Every Urban Asset.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">
                  One QR.
                </span>{' '}
                Faster Resolution.
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Connect citizens, urban infrastructure and municipal teams through a smart QR-based reporting platform.
              </p>
            </div>

            {/* Key Value Prop Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-100/90 border border-slate-200/80 text-xs font-medium text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero app download required</span>
              </div>
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-100/90 border border-slate-200/80 text-xs font-medium text-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                <span>Duplicate spam elimination</span>
              </div>
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-100/90 border border-slate-200/80 text-xs font-medium text-slate-700">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>20-second submission</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenScanModal}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-7 py-3.5 rounded-xl text-base font-semibold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 shadow-md shadow-brand-600/25 hover:shadow-lg hover:shadow-brand-600/35 transition-all transform hover:-translate-y-0.5"
              >
                <QrCode className="w-5 h-5" />
                <span>Report an Issue</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenLoginModal}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm hover:shadow hover:border-slate-400 transition-all"
              >
                <Building2 className="w-5 h-5 text-slate-600" />
                <span>Municipal Login</span>
              </button>
            </div>

            {/* Micro-Trust Metric */}
            <div className="pt-2 flex items-center justify-center lg:justify-start space-x-6 text-xs text-slate-500">
              <div className="flex items-center space-x-1.5">
                <div className="flex -space-x-1.5 overflow-hidden">
                  <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center">DL</div>
                  <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center">MH</div>
                  <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">KA</div>
                </div>
                <span className="font-medium text-slate-700">Adopted by 18+ Smart Wards</span>
              </div>
              <span className="text-slate-300">•</span>
              <div>
                <span className="font-semibold text-slate-700">99.4%</span> Audit Resolution Rate
              </div>
            </div>

          </div>

          {/* Right Column: "Scan. Report. Resolve." Visual Concept */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Glow Card */}
              <div className="relative rounded-2xl bg-white border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden">
                
                {/* Visual Header */}
                <div className="bg-slate-900 px-5 py-4 text-white flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold tracking-wider uppercase text-slate-300">
                      Scan. Report. Resolve. Flow
                    </span>
                  </div>
                  <span className="text-[11px] font-mono bg-slate-800 text-brand-300 px-2 py-0.5 rounded border border-slate-700">
                    LIVE SIMULATION
                  </span>
                </div>

                {/* Step Selector Tabs */}
                <div className="grid grid-cols-3 bg-slate-100/80 p-1 border-b border-slate-200 text-center text-xs font-medium text-slate-600">
                  {stepTabs.map((tab, idx) => (
                    <button
                      key={tab.label}
                      onClick={() => setActiveStepTab(idx)}
                      className={`py-2 px-2 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                        activeStepTab === idx
                          ? 'bg-white text-brand-700 font-semibold shadow-sm border border-slate-200/60'
                          : 'hover:text-slate-900 hover:bg-slate-200/50'
                      }`}
                    >
                      <tab.icon className={`w-3.5 h-3.5 ${activeStepTab === idx ? 'text-brand-600' : 'text-slate-400'}`} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Interactive Card Stage Content */}
                <div className="p-6 space-y-5">
                  
                  {activeStepTab === 0 && (
                    <div className="space-y-4">
                      {/* Asset Header Mockup */}
                      <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                            <Zap className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="text-sm font-bold text-slate-900 font-mono">SL-8842-DOWNTOWN</h4>
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                ACTIVE TAG
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 flex items-center mt-0.5">
                              <MapPin className="w-3 h-3 mr-1 text-slate-400" />
                              5th Avenue & Central Crossing, Sector 9
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* QR Preview Graphic */}
                      <div className="bg-slate-50 rounded-xl p-4 border border-dashed border-slate-300 flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-xs font-semibold text-slate-800">Physical QR Tag Detected</p>
                          <p className="text-[11px] text-slate-500 leading-tight">
                            Municipal Code: <span className="font-mono text-slate-700 font-medium">QR-WARD09-SL8842</span>
                          </p>
                          <p className="text-[11px] text-brand-600 font-medium">GPS Accuracy: ±1.8m (Verified)</p>
                        </div>
                        <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm">
                          <QrCode className="w-10 h-10 text-slate-900" />
                        </div>
                      </div>

                      <div className="p-3 bg-brand-50/70 rounded-xl border border-brand-100 text-xs text-brand-900 flex items-center justify-between">
                        <span>Ready to diagnose or report issues?</span>
                        <button
                          onClick={() => setActiveStepTab(1)}
                          className="font-semibold text-brand-700 hover:text-brand-800 inline-flex items-center text-xs ml-2"
                        >
                          Continue to Report <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {activeStepTab === 1 && (
                    <div className="space-y-4">
                      {/* Active Duplicate Alert Simulation */}
                      <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1.5 font-bold text-amber-900">
                            <AlertTriangle className="w-4 h-4 text-amber-600" />
                            <span>Active Issue Reported 28m Ago</span>
                          </div>
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-semibold text-[10px]">
                            PRIORITY 1
                          </span>
                        </div>
                        <p className="text-amber-800 text-[11px] leading-relaxed">
                          "Streetlight completely dead at junction, low pedestrian visibility."
                        </p>
                        <div className="flex items-center justify-between pt-1 border-t border-amber-200/60 text-[11px]">
                          <span className="text-amber-900 font-semibold flex items-center">
                            <Flame className="w-3.5 h-3.5 mr-1 text-orange-600" />
                            14 citizens confirmed
                          </span>
                          <span className="text-emerald-700 font-medium font-mono">Dispatched to Crew #3</span>
                        </div>
                      </div>

                      {/* Citizen Action Options */}
                      <div className="space-y-2">
                        <button
                          onClick={() => setActiveStepTab(2)}
                          className="w-full py-2.5 px-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-all shadow-sm"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>I'm also facing this issue (+1 Confirm)</span>
                        </button>
                        <button
                          onClick={() => setActiveStepTab(2)}
                          className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs text-center transition-all"
                        >
                          Report a Different / New Problem
                        </button>
                      </div>
                    </div>
                  )}

                  {activeStepTab === 2 && (
                    <div className="space-y-4">
                      {/* Resolution Timeline */}
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                            ✓
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900">Issue Validated & Auto-Dispatched</p>
                            <p className="text-[11px] text-slate-500">Ticket #UQ-2026-904 • Ward 09 Electrical Dept</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                            ✓
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900">Field Technician on Site</p>
                            <p className="text-[11px] text-slate-500">Officer R. Sharma (Van #04) replaced 120W LED driver</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                            ✓
                          </div>
                          <div>
                            <p className="text-xs font-bold text-emerald-800">Resolution Verified & Closed</p>
                            <p className="text-[11px] text-slate-500">Photographic proof verified with GPS lock at 19:42</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                        <span className="font-medium">Total resolution turnaround:</span>
                        <span className="font-bold font-mono text-emerald-800">2h 14m (SLA Met)</span>
                      </div>
                    </div>
                  )}

                </div>

                {/* Bottom Step Indicator Bar */}
                <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                  <span>Step {activeStepTab + 1} of 3</span>
                  <div className="flex space-x-1.5">
                    {[0, 1, 2].map((i) => (
                      <button
                        key={i}
                        onClick={() => setActiveStepTab(i)}
                        className={`h-2 rounded-full transition-all ${
                          activeStepTab === i ? 'w-6 bg-brand-600' : 'w-2 bg-slate-300'
                        }`}
                        aria-label={`Go to step ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Highlight Stats Row */}
        <div className="mt-16 pt-10 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-white/70 border border-slate-200/60 shadow-subtle">
            <div className="text-3xl lg:text-4xl font-extrabold text-slate-900 font-mono tracking-tight">50,000+</div>
            <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1">Smart Urban Assets Tagged</div>
          </div>
          <div className="p-4 rounded-xl bg-white/70 border border-slate-200/60 shadow-subtle">
            <div className="text-3xl lg:text-4xl font-extrabold text-brand-600 font-mono tracking-tight">65%</div>
            <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1">Faster Resolution SLA</div>
          </div>
          <div className="p-4 rounded-xl bg-white/70 border border-slate-200/60 shadow-subtle">
            <div className="text-3xl lg:text-4xl font-extrabold text-emerald-600 font-mono tracking-tight">74%</div>
            <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1">Fewer Duplicate Tickets</div>
          </div>
          <div className="p-4 rounded-xl bg-white/70 border border-slate-200/60 shadow-subtle">
            <div className="text-3xl lg:text-4xl font-extrabold text-slate-900 font-mono tracking-tight">20 Sec</div>
            <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1">Average Citizen Report Time</div>
          </div>
        </div>

      </div>
    </section>
  );
}
