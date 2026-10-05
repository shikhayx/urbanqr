import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Building2, 
  Flame, 
  ShieldCheck, 
  Share2, 
  Download, 
  Camera, 
  UserCheck, 
  ThumbsUp, 
  AlertTriangle,
  ChevronRight,
  Printer,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { useCitizen } from '../../context/CitizenContext';

export default function ComplaintDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { complaints, confirmComplaint } = useCitizen();

  const complaint = complaints.find(c => c.id.toLowerCase() === id?.toLowerCase()) || complaints[0];

  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  const handleConfirm = () => {
    if (!hasConfirmed) {
      confirmComplaint(complaint.id);
      setHasConfirmed(true);
    }
  };

  const stageOrder = ['Submitted', 'Assigned', 'In Progress', 'Resolved'];
  const currentStageIndex = stageOrder.indexOf(complaint.status);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={() => navigate('/citizen/my-complaints')}
          className="inline-flex items-center text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Back to My Complaints</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>

          <span className="text-xs font-mono font-bold bg-slate-900 text-white px-2.5 py-1.5 rounded-lg">
            {complaint.id}
          </span>
        </div>
      </div>

      {/* Main Complaint Overview Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-6">
        
        {/* Title, Asset & Status Badges */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                complaint.priority === 'High'
                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                  : 'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
                {complaint.priority} Priority
              </span>
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                complaint.status === 'Resolved'
                  ? 'bg-emerald-100 text-emerald-800'
                  : complaint.status === 'In Progress'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-blue-100 text-blue-800'
              }`}>
                {complaint.status}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
              {complaint.issue}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
              <Link
                to={`/citizen/asset/${complaint.assetId}`}
                className="font-semibold text-brand-600 hover:underline"
              >
                {complaint.assetName} ({complaint.assetId})
              </Link>
              <span>•</span>
              <span className="flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                {complaint.location}
              </span>
              <span>•</span>
              <span>{complaint.reportedDate}</span>
            </div>
          </div>

          <div className="shrink-0 text-right bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">SLA Clock</span>
            <span className="text-sm font-bold font-mono text-brand-700">{complaint.slaTimeRemaining}</span>
            <p className="text-[10px] text-slate-500 mt-0.5">{complaint.estimatedResolution}</p>
          </div>
        </div>

        {/* 4-Step Interactive Timeline (Submitted → Assigned → In Progress → Resolved) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-brand-600" />
              <span>Resolution Progress Timeline</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">Real-Time Sync</span>
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {complaint.timeline.map((step, idx) => {
              const isDone = step.completed;
              const isCurrent = complaint.status === step.stage;

              return (
                <div key={idx} className="relative">
                  {/* Timeline Dot */}
                  <div
                    className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                      isDone
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                          ? 'bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse'
                          : 'bg-slate-200 text-slate-500 border border-slate-300'
                    }`}
                  >
                    {isDone ? '✓' : idx + 1}
                  </div>

                  {/* Step Card */}
                  <div className={`p-4 rounded-xl border transition-all ${
                    isDone 
                      ? 'bg-slate-50 border-slate-200' 
                      : isCurrent 
                        ? 'bg-amber-50/70 border-amber-300 shadow-sm' 
                        : 'bg-white border-slate-100 opacity-60'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-slate-900">{step.stage}: {step.title}</span>
                        {isCurrent && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-200 text-amber-900">
                            CURRENT STAGE
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">{step.timestamp}</span>
                    </div>

                    <p className="text-xs text-slate-600 mt-1">
                      {step.notes}
                    </p>

                    <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Authority: <strong className="text-slate-700">{step.officer}</strong></span>
                      <span className="text-emerald-700 font-medium">{step.subtitle}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Complaint Description & Photographic Evidence */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Complaint Report & Photos</h2>
          
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
            {complaint.description}
          </div>

          {/* Before & After Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            {/* Before Photo */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Citizen Reported Photo:</span>
                <span className="text-[10px] text-slate-400 font-mono">GPS STAMPED</span>
              </div>
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-video">
                <img
                  src={complaint.photoUrl}
                  alt="Citizen reported evidence"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                  Reported at {complaint.reportedDate}
                </div>
              </div>
            </div>

            {/* Resolved Photo */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Field Crew Resolution Proof:</span>
                <span className="text-[10px] text-emerald-600 font-bold">MANDATORY AUDIT</span>
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
                    <span>Verified Fixed</span>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 aspect-video flex flex-col items-center justify-center text-center p-4 text-slate-400 space-y-1">
                  <Camera className="w-6 h-6 text-slate-300" />
                  <span className="text-xs font-medium text-slate-500">Awaiting Field Technician Closure Photo</span>
                  <p className="text-[10px] text-slate-400">Uploaded upon work completion with GPS lock</p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Community Confirmations & Feedback */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs text-slate-600">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>
              <strong className="text-slate-900">{complaint.confirmations} community members</strong> confirmed this issue
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {complaint.status !== 'Resolved' && (
              <button
                onClick={handleConfirm}
                disabled={hasConfirmed}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                  hasConfirmed
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{hasConfirmed ? 'You upvoted this' : '+1 Confirm Issue'}</span>
              </button>
            )}

            <button
              onClick={() => alert(`Tracking link copied: ${window.location.href}`)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center space-x-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Status</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
