import React, { useState } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Bell, 
  MapPin, 
  Sliders, 
  Clock, 
  Building2, 
  CheckCircle2, 
  Save, 
  Lock, 
  Key
} from 'lucide-react';
import { useCitizen } from '../../context/CitizenContext';

export default function AdminSettingsPage() {
  const { officerProfile } = useCitizen();
  const [slaStandard, setSlaStandard] = useState('4');
  const [autoDispatch, setAutoDispatch] = useState(true);
  const [duplicateThreshold, setDuplicateThreshold] = useState('5');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Municipal Operations Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Ward 12 Triage Rules, SLA Policies, Duplicate Shield Calibration & Dispatch Automation.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-800 flex items-center space-x-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Municipal operational parameters saved and broadcast to field dispatch terminals!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Ward Information Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-brand-600" />
            <span>Ward & Jurisdiction Profile</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Ward Authority</label>
              <input
                type="text"
                disabled
                value="Ward 12 — Mira Bhayandar Municipal Corp"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Zonal Headquarters</label>
              <input
                type="text"
                disabled
                value="Zonal Civic Center, Western Highway Corridor"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-medium"
              />
            </div>
          </div>
        </div>

        {/* SLA & Deduplication Rules */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-brand-600" />
            <span>SLA Thresholds & Deduplication Shield</span>
          </h2>

          <div className="space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div>
                <span className="font-bold text-slate-900">Standard Resolution SLA Deadline</span>
                <p className="text-[11px] text-slate-500">Maximum allowed turnaround time before ticket escalates to Ward Commissioner.</p>
              </div>
              <select
                value={slaStandard}
                onChange={(e) => setSlaStandard(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 font-semibold bg-white"
              >
                <option value="2">2 Hours (Emergency)</option>
                <option value="4">4 Hours (Standard)</option>
                <option value="8">8 Hours (Extended)</option>
                <option value="24">24 Hours (Civil Works)</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div>
                <span className="font-bold text-slate-900">Auto-Dispatch High Urgency Outages</span>
                <p className="text-[11px] text-slate-500">Automatically assign nearest active field van when 10+ confirmations are received.</p>
              </div>
              <input
                type="checkbox"
                checked={autoDispatch}
                onChange={(e) => setAutoDispatch(e.target.checked)}
                className="h-4 w-4 text-brand-600 rounded"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div>
                <span className="font-bold text-slate-900">Duplicate Shield Radius (Meters)</span>
                <p className="text-[11px] text-slate-500">Geographic proximity window to aggregate duplicate reports for the same physical pole or bin.</p>
              </div>
              <select
                value={duplicateThreshold}
                onChange={(e) => setDuplicateThreshold(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 font-semibold bg-white"
              >
                <option value="5">5 Meters (Exact Asset QR Lock)</option>
                <option value="15">15 Meters (Cluster Radius)</option>
                <option value="30">30 Meters (Street Block)</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Save Municipal Configuration</span>
        </button>

      </form>

    </div>
  );
}
