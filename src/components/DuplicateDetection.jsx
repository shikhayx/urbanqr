import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Flame, 
  Users, 
  TrendingUp, 
  Layers, 
  ArrowRight,
  ThumbsUp,
  Bell,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { duplicateCaseStudy } from '../data/landingData';

export default function DuplicateDetection() {
  const [demoConfirmed, setDemoConfirmed] = useState(false);
  const [confirmCount, setConfirmCount] = useState(14);
  const [showNotificationToast, setShowNotificationToast] = useState(false);

  const handleConfirmIssue = () => {
    if (!demoConfirmed) {
      setDemoConfirmed(true);
      setConfirmCount(prev => prev + 1);
      setShowNotificationToast(true);
      setTimeout(() => setShowNotificationToast(false), 4000);
    }
  };

  return (
    <section id="duplicate-detection" className="py-20 md:py-28 bg-gradient-to-b from-slate-900 via-urban-dark to-slate-950 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-400/20 text-brand-300 text-xs font-semibold uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5 text-brand-400" />
            <span>Intelligent Civic Deduplication</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Stop Duplicate Complaints at the Source
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            When an urban asset malfunctions, dozens of citizens report the exact same issue. UrbanQR eliminates redundant tickets while amplifying community urgency.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Legacy Traditional System (Red / Broken) */}
          <div className="rounded-2xl bg-slate-800/40 border border-red-500/30 p-6 sm:p-8 flex flex-col justify-between backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-red-500/20 border-b border-l border-red-500/30 text-red-300 text-xs font-bold rounded-bl-xl uppercase tracking-wider">
              Traditional 311 / Call Portals
            </div>

            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">The Duplicate Avalanche</h3>
                  <p className="text-xs text-red-300">Wasted municipal triage & citizen confusion</p>
                </div>
              </div>

              <div className="space-y-3.5">
                {duplicateCaseStudy.legacy.points.map((pt, i) => (
                  <div key={i} className="flex items-start space-x-3 text-sm text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                      ✕
                    </span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Legacy Outcome Metric Box */}
            <div className="mt-8 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
              <span>Clerical Overhead:</span>
              <span className="text-red-400 font-bold font-mono">30 duplicate work tickets generated</span>
            </div>
          </div>

          {/* UrbanQR Deduplication Engine (Emerald / Blue / Smart) */}
          <div className="rounded-2xl bg-gradient-to-b from-brand-950/60 via-slate-900/90 to-slate-900 border border-emerald-500/40 p-6 sm:p-8 flex flex-col justify-between backdrop-blur-sm shadow-glow relative overflow-hidden">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-emerald-500/20 border-b border-l border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-bl-xl uppercase tracking-wider flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>UrbanQR Smart Deduplication</span>
            </div>

            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Consolidated Citizen Consensus</h3>
                  <p className="text-xs text-emerald-300">1 single ticket • Prioritized by community upvotes</p>
                </div>
              </div>

              <div className="space-y-3.5">
                {duplicateCaseStudy.urbanQr.points.map((pt, i) => (
                  <div key={i} className="flex items-start space-x-3 text-sm text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                      ✓
                    </span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Interactive Citizen Experience Widget */}
            <div className="mt-8 pt-6 border-t border-slate-700/80">
              <p className="text-xs font-semibold text-slate-300 mb-3 flex items-center justify-between">
                <span>Try Citizen +1 Confirmation Demo:</span>
                <span className="text-emerald-400 font-mono text-[11px]">POLE #SL-8842</span>
              </p>

              <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-700 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    <span className="font-semibold text-amber-300">Active Outage Reported</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">Logged 28m ago</span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center text-amber-400 font-medium">
                    <Flame className="w-4 h-4 mr-1 text-orange-500" />
                    {confirmCount} citizens confirmed this outage
                  </span>
                  <span className="text-emerald-400 font-medium text-[11px]">Crew Dispatched</span>
                </div>

                <button
                  onClick={handleConfirmIssue}
                  disabled={demoConfirmed}
                  className={`w-full py-2.5 px-4 rounded-lg font-semibold text-xs transition-all flex items-center justify-center space-x-2 ${
                    demoConfirmed
                      ? 'bg-emerald-600/90 text-white cursor-default'
                      : 'bg-brand-600 hover:bg-brand-500 active:bg-brand-700 text-white shadow-md shadow-brand-600/30'
                  }`}
                >
                  {demoConfirmed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>You confirmed this issue! You will receive SMS updates.</span>
                    </>
                  ) : (
                    <>
                      <ThumbsUp className="w-4 h-4" />
                      <span>Confirm I Am Facing This Issue (+1 Upvote)</span>
                    </>
                  )}
                </button>
              </div>

              {showNotificationToast && (
                <div className="mt-3 p-2.5 rounded-lg bg-emerald-900/80 border border-emerald-500/50 text-xs text-emerald-200 flex items-center space-x-2 animate-fadeIn">
                  <Bell className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Subscribed! Municipal crew arrival estimated at 20:15.</span>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
