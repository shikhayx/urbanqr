import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Building2, 
  Flame, 
  UserCheck, 
  Send, 
  Camera, 
  ShieldCheck, 
  Zap, 
  Trash2, 
  Bus, 
  Droplets, 
  Sparkles, 
  Layers,
  ChevronRight,
  Printer,
  Edit,
  Save,
  Check
} from 'lucide-react';
import { useCitizen } from '../../context/CitizenContext';

export default function AdminComplaintDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { complaints, assets, workers, updateComplaintDetails } = useCitizen();

  const complaint = complaints.find(c => c.id.toLowerCase() === id?.toLowerCase()) || complaints[0];
  const targetAsset = assets.find(a => a.id === complaint.assetId) || assets[0];

  // Officer form state
  const [selectedStatus, setSelectedStatus] = useState(complaint.status);
  const [selectedPriority, setSelectedPriority] = useState(complaint.priority);
  const [selectedWorkerId, setSelectedWorkerId] = useState(workers[0]?.id || '');
  const [officerNotes, setOfficerNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsUpdating(true);

    setTimeout(() => {
      updateComplaintDetails(complaint.id, {
        status: selectedStatus,
        priority: selectedPriority,
        workerId: selectedWorkerId,
        officerNotes: officerNotes || `Status updated to ${selectedStatus} by Officer S. Kulkarni.`
      });

      setIsUpdating(false);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={() => navigate('/admin/complaints')}
          className="inline-flex items-center text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Back to Complaints Queue</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Work Order</span>
          </button>

          <span className="text-xs font-mono font-bold bg-brand-900 text-white px-2.5 py-1.5 rounded-lg">
            {complaint.id}
          </span>
        </div>
      </div>

      {/* Main Grid: Left (Details & Photos & Timeline) & Right (Officer Triage & Dispatch Box) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (7 cols): Information, Timeline, Images */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Complaint Header Box */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle space-y-4">
            
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  complaint.priority === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {complaint.priority} Priority
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  complaint.status === 'Resolved'
                    ? 'bg-emerald-100 text-emerald-800'
                    : complaint.status === 'In Progress'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                }`}>
                  {complaint.status}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-slate-400 font-mono">Logged: {complaint.reportedDate}</span>
              </div>
            </div>

            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                {complaint.issue}
              </h1>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                "{complaint.description}"
              </p>
            </div>

            {/* Community Confirmations Highlight */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between text-xs text-amber-900">
              <div className="flex items-center space-x-2">
                <Flame className="w-4 h-4 text-orange-600" />
                <span className="font-bold">{complaint.confirmations} Citizen Confirmations Received</span>
              </div>
              <span className="text-[10px] font-semibold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                Deduplication Active
              </span>
            </div>

          </div>

          {/* Asset & Location Information Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-brand-600" />
                <span>Urban Asset Telemetry</span>
              </h2>
              <Link
                to={`/admin/assets`}
                className="text-xs font-semibold text-brand-600 hover:underline"
              >
                View Asset Specs →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] uppercase font-bold text-slate-400">Target Asset</span>
                <p className="font-bold text-slate-900 mt-0.5">{complaint.assetName}</p>
                <span className="font-mono text-[11px] text-brand-700 font-semibold">{complaint.assetId}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] uppercase font-bold text-slate-400">Ward & Division</span>
                <p className="font-bold text-slate-900 mt-0.5">{complaint.department}</p>
                <span className="text-[11px] text-slate-500">{complaint.ward}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 col-span-2">
                <span className="text-[10px] uppercase font-bold text-slate-400">Verified GPS Location</span>
                <p className="font-medium text-slate-800 mt-0.5 flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
                  {complaint.location}
                </p>
                <span className="font-mono text-[11px] text-slate-500">{targetAsset.coordinates}</span>
              </div>
            </div>
          </div>

          {/* Photo Audit Section */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-1.5">
              <Camera className="w-4 h-4 text-brand-600" />
              <span>Photographic Evidence & Resolution Audit</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Citizen Photo */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Citizen In-Field Photo:</span>
                  <span className="text-[10px] text-slate-400 font-mono">GPS VERIFIED</span>
                </div>
                <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-video">
                  <img
                    src={complaint.photoUrl}
                    alt="Citizen submission"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                    {complaint.reportedDate}
                  </div>
                </div>
              </div>

              {/* Resolved Photo */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Field Repair Proof:</span>
                  <span className="text-[10px] text-emerald-600 font-bold">MANDATORY CLOSURE</span>
                </div>
                {complaint.resolvedPhotoUrl ? (
                  <div className="relative rounded-xl overflow-hidden border border-emerald-300 bg-slate-900 aspect-video">
                    <img
                      src={complaint.resolvedPhotoUrl}
                      alt="Field resolution proof"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center space-x-1 shadow">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Fix</span>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 aspect-video flex flex-col items-center justify-center text-center p-3 text-slate-400 space-y-1">
                    <Camera className="w-6 h-6 text-slate-300" />
                    <span className="text-xs font-medium text-slate-500">Field Crew Photo Required</span>
                    <p className="text-[10px] text-slate-400">Uploaded upon work order completion</p>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Status Timeline */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-brand-600" />
              <span>Municipal Resolution Timeline</span>
            </h2>

            <div className="relative pl-6 sm:pl-8 space-y-5 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {complaint.timeline.map((step, idx) => {
                const isDone = step.completed;
                const isCurrent = complaint.status === step.stage;

                return (
                  <div key={idx} className="relative">
                    <div
                      className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isDone
                          ? 'bg-emerald-500 text-white'
                          : isCurrent
                            ? 'bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse'
                            : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {isDone ? '✓' : idx + 1}
                    </div>

                    <div className="p-3.5 rounded-xl border bg-slate-50/80 border-slate-200 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900">{step.stage}: {step.title}</span>
                        <span className="text-[10px] font-mono text-slate-400">{step.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-600">{step.notes}</p>
                      <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-200/60">
                        Officer: <strong className="text-slate-700">{step.officer}</strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column (5 cols): Officer Triage, Assign Worker & Update Status */}
        <div className="lg:col-span-5 sticky top-20 space-y-6">
          
          <div className="bg-white rounded-2xl p-6 border-2 border-brand-200 shadow-card space-y-5">
            
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Officer Triage Actions</h3>
                <p className="text-xs text-slate-500">Dispatch field technicians & update SLA</p>
              </div>
              <span className="px-2 py-0.5 bg-brand-50 text-brand-700 rounded text-[10px] font-bold font-mono">
                WARD 12
              </span>
            </div>

            {updateSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-800 flex items-center space-x-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Work order updated and dispatched to field technician!</span>
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-4">
              
              {/* Assign Worker Dropdown */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Assign Field Worker / Van Unit:
                </label>
                <select
                  value={selectedWorkerId}
                  onChange={(e) => setSelectedWorkerId(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs font-medium rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                >
                  {workers.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name} ({w.role} • {w.vehicle} • {w.status})
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Priority Override:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Low', 'Medium', 'High'].map((pr) => (
                    <button
                      type="button"
                      key={pr}
                      onClick={() => setSelectedPriority(pr)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedPriority === pr
                          ? 'border-brand-600 bg-brand-50 text-brand-900 ring-1 ring-brand-600'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                      }`}
                    >
                      {pr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Complaint Status:
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs font-bold rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                >
                  <option value="Submitted">Submitted (Queued for Triage)</option>
                  <option value="Assigned">Assigned (Dispatched to Worker)</option>
                  <option value="In Progress">In Progress (Crew On-Site)</option>
                  <option value="Resolved">Resolved (Verified & Closed)</option>
                </select>
              </div>

              {/* Officer Notes Textarea */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Officer Remarks / Field Instructions:
                </label>
                <textarea
                  rows={3}
                  value={officerNotes}
                  onChange={(e) => setOfficerNotes(e.target.value)}
                  placeholder="e.g. Inspect photocell node and replace LED driver unit. Ensure road safety cones placed..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              {/* Update Button */}
              <button
                type="submit"
                disabled={isUpdating}
                className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
              >
                {isUpdating ? (
                  <span>Transmitting Dispatch to Field Unit...</span>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Update Status & Dispatch Crew</span>
                  </>
                )}
              </button>

            </form>

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Updates automatically sync to citizen tracking portal & SMS alerts.</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
