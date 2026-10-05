import React from 'react';
import { Link } from 'react-router-dom';
import { 
  QrCode, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Flame, 
  MapPin, 
  Building2, 
  PlusCircle, 
  Award, 
  Activity, 
  Zap, 
  Layers,
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import { useCitizen } from '../../context/CitizenContext';

export default function CitizenDashboard() {
  const { citizenProfile, complaints, assets } = useCitizen();

  const activeComplaints = complaints.filter(c => c.status !== 'Resolved');
  const resolvedComplaints = complaints.filter(c => c.status === 'Resolved');

  return (
    <div className="space-y-8">
      
      {/* Top Welcome & Civic Greeting */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-indigo-900 rounded-2xl p-6 sm:p-8 text-white shadow-card relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-brand-200 text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Ward 12 Civic Guardian • {citizenProfile.civicBadge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {citizenProfile.name}
            </h1>
            <p className="text-xs sm:text-sm text-brand-100 max-w-xl leading-relaxed">
              Every QR scan keeps your neighborhood functional. You have helped resolve {citizenProfile.stats.resolvedComplaints} public utility issues in {citizenProfile.ward}.
            </p>
          </div>

          {/* Large Quick "Scan QR" CTA */}
          <div className="shrink-0">
            <Link
              to="/citizen/scan"
              className="inline-flex items-center justify-center space-x-3 px-6 py-3.5 rounded-xl bg-white hover:bg-brand-50 text-brand-900 text-sm font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <QrCode className="w-5 h-5 text-brand-600" />
              <span>Scan Urban QR</span>
              <ArrowRight className="w-4 h-4 text-brand-600" />
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Summary Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Active Complaints */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active Complaints</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
              {activeComplaints.length}
            </div>
            <p className="text-[11px] text-amber-700 font-medium mt-1">In Triage & Field Resolution</p>
          </div>
        </div>

        {/* Resolved Complaints */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Resolved Issues</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
              {resolvedComplaints.length}
            </div>
            <p className="text-[11px] text-emerald-700 font-medium mt-1">100% Photo Verified Fixes</p>
          </div>
        </div>

        {/* Civic Points */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Civic Karma Score</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-mono">
              {citizenProfile.civicScore}
            </div>
            <p className="text-[11px] text-indigo-700 font-medium mt-1">{citizenProfile.stats.civicImpactRank}</p>
          </div>
        </div>

        {/* Average Resolution Time */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Avg Ward SLA</span>
            <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
              2h 45m
            </div>
            <p className="text-[11px] text-brand-700 font-medium mt-1">65% faster than legacy 311</p>
          </div>
        </div>

      </div>

      {/* Main Grid: Active Complaints (Left) & Quick Actions / Nearby Assets (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col (8 cols): Active Complaints & Recent Feed */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Complaints Header & List */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">Active Complaints in Progress</h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 font-mono">
                  {activeComplaints.length}
                </span>
              </div>
              <Link
                to="/citizen/my-complaints"
                className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center"
              >
                View all complaints <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </Link>
            </div>

            {activeComplaints.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-sm">
                No active complaints. All reported issues are currently resolved!
              </div>
            ) : (
              <div className="space-y-4">
                {activeComplaints.map((complaint) => (
                  <div
                    key={complaint.id}
                    className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                          {complaint.id}
                        </span>
                        <span className="font-semibold text-xs text-slate-900">{complaint.assetName}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          complaint.priority === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {complaint.priority} Priority
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          complaint.status === 'In Progress' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {complaint.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 font-medium">
                      {complaint.issue}
                    </p>

                    <div className="flex items-center text-[11px] text-slate-500">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
                      <span className="truncate">{complaint.location}</span>
                    </div>

                    {/* Progress mini bar */}
                    <div className="pt-2 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
                      <div className="flex items-center space-x-3 text-slate-500">
                        <span className="flex items-center text-amber-700 font-semibold">
                          <Flame className="w-3.5 h-3.5 mr-1 text-orange-600" />
                          {complaint.confirmations} citizen confirmations
                        </span>
                        <span>•</span>
                        <span className="text-brand-700 font-medium">{complaint.slaTimeRemaining}</span>
                      </div>

                      <Link
                        to={`/citizen/complaint/${complaint.id}`}
                        className="inline-flex items-center text-xs font-bold text-brand-600 hover:text-brand-800"
                      >
                        Track Live Timeline <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Resolved Complaints */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">Recently Resolved in Ward 12</h2>
              <span className="text-xs text-slate-500">Verified by Civic Audit</span>
            </div>

            <div className="space-y-3">
              {resolvedComplaints.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-emerald-50/40 border border-emerald-200/60 flex items-center justify-between gap-4"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold font-mono text-emerald-800">{item.id}</span>
                      <span className="text-xs font-semibold text-slate-800">• {item.assetName}</span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-1">{item.issue}</p>
                    <p className="text-[11px] text-slate-400">{item.reportedDate} • {item.department}</p>
                  </div>

                  <Link
                    to={`/citizen/complaint/${item.id}`}
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-white border border-emerald-300 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
                  >
                    View Photo Proof
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col (4 cols): Quick Launch & Nearby Assets */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Actions Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>
            
            <Link
              to="/citizen/scan"
              className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs flex items-center justify-between transition-all shadow-sm"
            >
              <div className="flex items-center space-x-2.5">
                <QrCode className="w-4 h-4" />
                <span>Launch QR Scanner</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/citizen/report"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-between transition-all"
            >
              <div className="flex items-center space-x-2.5">
                <PlusCircle className="w-4 h-4 text-slate-500" />
                <span>Report Issue Manually</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              to="/citizen/my-complaints"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-between transition-all"
            >
              <div className="flex items-center space-x-2.5">
                <FileText className="w-4 h-4 text-slate-500" />
                <span>All Complaints History</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          {/* Ward 12 Asset Directory Snapshot */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Ward 12 Infrastructure</h3>
              <span className="text-[11px] font-mono text-slate-500">{assets.length} Tagged</span>
            </div>

            <div className="space-y-2.5">
              {assets.map((asset) => (
                <Link
                  key={asset.id}
                  to={`/citizen/asset/${asset.id}`}
                  className="p-2.5 rounded-xl border border-slate-100 hover:border-brand-200 hover:bg-brand-50/30 flex items-center justify-between transition-all group"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-mono text-xs font-bold text-slate-800 group-hover:text-brand-600">
                        {asset.id}
                      </span>
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                        asset.status === 'Operational' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {asset.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate max-w-[170px]">{asset.location}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-600 transition-colors" />
                </Link>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
