import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  CheckSquare, 
  Building2, 
  BarChart3, 
  CheckCircle2, 
  Users, 
  Cpu, 
  Layers, 
  SmartphoneNfc
} from 'lucide-react';
import { municipalityBenefits } from '../data/landingData';

const benefitIconMap = {
  Zap: Zap,
  ShieldCheck: ShieldCheck,
  TrendingUp: TrendingUp,
  CheckSquare: CheckSquare,
};

export default function MunicipalityBenefits() {
  return (
    <section id="benefits" className="py-20 md:py-28 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Civic Governance & SLA Optimization</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Built for High-Velocity Municipal Operations
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Eliminate triage chaos, empower field engineers with verified asset telemetry, and deliver auditable civic service delivery.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {municipalityBenefits.map((benefit, index) => {
            const Icon = benefitIconMap[benefit.icon] || Zap;

            return (
              <div
                key={benefit.title}
                className="group relative bg-white rounded-2xl p-7 border border-slate-200/80 shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Stat Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-50 to-indigo-50 border border-brand-100 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-200">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="text-right">
                      <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 tracking-tight">
                        {benefit.stat}
                      </span>
                      <p className="text-[11px] text-slate-500 font-medium max-w-[200px] leading-tight mt-0.5">
                        {benefit.statLabel}
                      </p>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Micro-Benefit Checklist */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center space-x-2 text-xs font-medium text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Integrated with Ward GIS & Municipal Work-Order CRM</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Municipal Executive Metric Bar */}
        <div className="mt-14 bg-gradient-to-r from-slate-900 via-urban-navy to-slate-900 rounded-2xl p-8 text-white border border-slate-800 shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-700/60">
            <div className="px-4 py-2">
              <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">
                Data Precision
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">100% Geo-Verified</div>
              <p className="text-xs text-slate-300 mt-1">Zero misallocated field dispatches</p>
            </div>

            <div className="px-4 py-2">
              <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">
                Field Accountability
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-brand-300 font-mono">Photo & Time Stamp</div>
              <p className="text-xs text-slate-300 mt-1">Mandatory visual resolution audit trail</p>
            </div>

            <div className="px-4 py-2">
              <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">
                Implementation Time
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-indigo-300 font-mono">&lt; 14 Days</div>
              <p className="text-xs text-slate-300 mt-1">Rapid physical QR retrofitting & ward rollout</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
