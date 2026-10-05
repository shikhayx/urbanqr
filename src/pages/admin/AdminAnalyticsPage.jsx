import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Zap, 
  Trash2, 
  Bus, 
  Droplets,
  Award,
  Building2
} from 'lucide-react';
import { useCitizen } from '../../context/CitizenContext';

export default function AdminAnalyticsPage() {
  const { adminStats, complaints, assets } = useCitizen();

  const categoryBreakdown = [
    { name: 'Electrical & Streetlights', count: 540, percentage: '38%', sla: '98.6%', color: 'bg-amber-500' },
    { name: 'Sanitation & Waste Compacting', count: 380, percentage: '27%', sla: '99.1%', color: 'bg-emerald-500' },
    { name: 'Public Transit & Shelters', count: 210, percentage: '15%', sla: '97.4%', color: 'bg-blue-500' },
    { name: 'Public Sanitation Units', count: 140, percentage: '10%', sla: '99.3%', color: 'bg-teal-500' },
    { name: 'Drinking Water & Hydrants', count: 110, percentage: '8%', sla: '99.5%', color: 'bg-cyan-500' },
    { name: 'Parks & Green Infrastructure', count: 40, percentage: '2%', sla: '96.8%', color: 'bg-indigo-500' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Ward 12 Civic Intelligence & SLA Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Comprehensive telemetry benchmarks, duplicate report reduction ratios, and division performance audits.
        </p>
      </div>

      {/* 4 High-Level Key Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle">
          <span className="text-xs font-bold text-slate-400 uppercase">Average Resolution Turnaround</span>
          <div className="text-3xl font-extrabold text-slate-900 font-mono mt-2">{adminStats.avgResolutionTime}</div>
          <p className="text-xs text-emerald-600 font-semibold mt-1">65% faster than legacy 311</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle">
          <span className="text-xs font-bold text-slate-400 uppercase">SLA Compliance Rate</span>
          <div className="text-3xl font-extrabold text-emerald-600 font-mono mt-2">{adminStats.slaCompliance}</div>
          <p className="text-xs text-slate-500 mt-1">Across 1,380 closed work orders</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle">
          <span className="text-xs font-bold text-slate-400 uppercase">Duplicate Tickets Suppressed</span>
          <div className="text-3xl font-extrabold text-brand-600 font-mono mt-2">{adminStats.duplicateReportsSuppressed}</div>
          <p className="text-xs text-brand-700 font-semibold mt-1">74% reduction in dispatch clutter</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle">
          <span className="text-xs font-bold text-slate-400 uppercase">Field Photo Verification Rate</span>
          <div className="text-3xl font-extrabold text-indigo-600 font-mono mt-2">100%</div>
          <p className="text-xs text-indigo-700 font-semibold mt-1">Mandatory GPS audit trail</p>
        </div>
      </div>

      {/* Asset Vertical Breakdown */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Work Orders & Asset Density by Municipal Division</h2>
          <span className="text-xs text-slate-400 font-mono">1,420 Active Tags</span>
        </div>

        <div className="space-y-4">
          {categoryBreakdown.map((item) => (
            <div key={item.name} className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-800">{item.name}</span>
                <div className="flex items-center space-x-3">
                  <span className="text-slate-500">{item.count} Assets ({item.percentage})</span>
                  <span className="text-emerald-700 font-mono">{item.sla} SLA</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${item.color} rounded-full`} style={{ width: item.percentage }} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
