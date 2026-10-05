import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Wrench, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Building2, 
  Flame, 
  Camera, 
  Upload, 
  ShieldCheck, 
  Navigation, 
  PhoneCall, 
  Check, 
  AlertTriangle,
  FileSpreadsheet,
  Layers,
  Sparkles,
  Zap,
  Play,
  RotateCcw
} from 'lucide-react';
import { useCitizen } from '../../context/CitizenContext';

export default function WorkerTaskDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { complaints, assets, workers, updateComplaintDetails } = useCitizen();

  const task = complaints.find(c => c.id.toLowerCase() === id?.toLowerCase()) || complaints[0];
  const targetAsset = assets.find(a => a.id === task.assetId) || assets[0];
  const currentWorker = workers[0]; // Rajesh Sharma

  const [techNotes, setTechNotes] = useState('');
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  // 1. Start Repair
  const handleStartRepair = () => {
    updateComplaintDetails(task.id, {
      status: 'In Progress',
      workerId: currentWorker.id,
      priority: task.priority,
      officerNotes: `Technician ${currentWorker.name} arrived on site. Commenced physical diagnostics.`
    });
    setActionSuccessMsg('Repair Started! Status updated to In Progress.');
    setTimeout(() => setActionSuccessMsg(''), 3500);
  };

  // 2. Mark In Progress (with custom notes)
  const handleMarkInProgress = () => {
    updateComplaintDetails(task.id, {
      status: 'In Progress',
      workerId: currentWorker.id,
      priority: task.priority,
      officerNotes: techNotes || `In Progress: Technician ${currentWorker.name} replacing faulty components.`
    });
    setActionSuccessMsg('Work order updated with field repair notes.');
    setTimeout(() => setActionSuccessMsg(''), 3500);
  };

  // 3. Mark Resolved
  const handleMarkResolved = () => {
    updateComplaintDetails(task.id, {
      status: 'Resolved',
      workerId: currentWorker.id,
      priority: task.priority,
      officerNotes: techNotes || `Issue verified and resolved by ${currentWorker.name}. Lux test passed & photo audit stamped.`
    });
    setPhotoUploaded(true);
    setActionSuccessMsg('Task marked RESOLVED! Photo audit uploaded & citizen SMS dispatched.');
    setTimeout(() => setActionSuccessMsg(''), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={() => navigate('/worker/tasks')}
          className="inline-flex items-center text-xs font-bold text-slate-700 hover:text-slate-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Back to Assigned Tasks</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono font-bold bg-slate-950 text-amber-400 px-3 py-1.5 rounded-xl border border-slate-800">
            {task.id}
          </span>
        </div>
      </div>

      {/* Action Notification Toast */}
      {actionSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-900 text-white text-xs font-bold flex items-center space-x-2 shadow-lg animate-fadeIn border border-emerald-700">
          <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Main Task Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-6">
        
        {/* Title, Badges & SLA */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                task.priority === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {task.priority} Priority
              </span>

              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                task.status === 'Resolved'
                  ? 'bg-emerald-100 text-emerald-800'
                  : task.status === 'In Progress'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-blue-100 text-blue-800'
              }`}>
                {task.status}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              {task.issue}
            </h1>

            <div className="flex items-center space-x-2 text-xs text-slate-500 mt-1">
              <span className="font-bold text-slate-800 font-mono">{task.assetId}</span>
              <span>•</span>
              <span className="font-semibold text-brand-700">{task.assetName}</span>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-right">
            <span className="text-[10px] font-bold uppercase text-amber-900 block">SLA Time Remaining</span>
            <div className="text-base font-black font-mono text-amber-950">{task.slaTimeRemaining}</div>
          </div>
        </div>

        {/* 3 Action Buttons (Start Repair, Mark In Progress, Mark Resolved) */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 text-white space-y-4 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wrench className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Field Execution Controls
              </span>
            </div>
            <span className="text-[10px] text-amber-300 font-mono">STEP 1 → STEP 2 → STEP 3</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* 1. Start Repair */}
            <button
              onClick={handleStartRepair}
              disabled={task.status === 'Resolved'}
              className={`py-3 px-3 rounded-xl text-xs font-black flex items-center justify-center space-x-2 transition-all ${
                task.status === 'Submitted' || task.status === 'Assigned'
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>Start Repair</span>
            </button>

            {/* 2. Mark In Progress */}
            <button
              onClick={handleMarkInProgress}
              disabled={task.status === 'Resolved'}
              className={`py-3 px-3 rounded-xl text-xs font-black flex items-center justify-center space-x-2 transition-all ${
                task.status === 'In Progress'
                  ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Mark In Progress</span>
            </button>

            {/* 3. Mark Resolved */}
            <button
              onClick={handleMarkResolved}
              className={`py-3 px-3 rounded-xl text-xs font-black flex items-center justify-center space-x-2 transition-all ${
                task.status === 'Resolved'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Mark Resolved</span>
            </button>

          </div>

          {/* Field Notes Input */}
          <div className="pt-2">
            <textarea
              rows={2}
              value={techNotes}
              onChange={(e) => setTechNotes(e.target.value)}
              placeholder="Add technician work log (e.g. Replaced 120W driver unit, tested lux output at 45 lux)..."
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>

        {/* Clear Status Timeline */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-brand-600" />
              <span>Clear Status Timeline</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">Submitted → Assigned → In Progress → Resolved</span>
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-5 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {task.timeline.map((step, idx) => {
              const isDone = step.completed;
              const isCurrent = task.status === step.stage;

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

                  <div className={`p-4 rounded-2xl border ${
                    isDone 
                      ? 'bg-slate-50 border-slate-200' 
                      : isCurrent 
                        ? 'bg-amber-50/70 border-amber-300 shadow-sm' 
                        : 'bg-white border-slate-100 opacity-60'
                  }`}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{step.stage}: {step.title}</span>
                      <span className="text-[10px] font-mono text-slate-400">{step.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{step.notes}</p>
                    <div className="text-[10px] text-slate-500 pt-1 mt-1 border-t border-slate-200/60">
                      Officer / Technician: <strong className="text-slate-800">{step.officer}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Location & Citizen Report Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
          
          {/* Location & GPS */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400">Target Location & GPS</span>
            <p className="font-bold text-slate-900">{task.location}</p>
            <p className="font-mono text-brand-700">{targetAsset.coordinates}</p>
            <p className="text-slate-500">{task.ward}</p>
          </div>

          {/* Citizen Problem & Confirmations */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400">Citizen Submission</span>
              <span className="font-bold text-amber-700 flex items-center">
                <Flame className="w-3.5 h-3.5 mr-0.5 text-orange-600" />
                {task.confirmations} confirms
              </span>
            </div>
            <p className="text-slate-800 font-medium leading-relaxed">"{task.description}"</p>
          </div>

        </div>

        {/* Photo Proof Section */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Photographic Evidence</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-[11px] text-slate-500 font-medium">Citizen Submitted Photo:</span>
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 aspect-video bg-slate-900">
                <img
                  src={task.photoUrl}
                  alt="Citizen report"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-slate-500 font-medium">Post-Repair Resolution Proof:</span>
              {task.resolvedPhotoUrl ? (
                <div className="relative rounded-2xl overflow-hidden border border-emerald-300 aspect-video bg-slate-900">
                  <img
                    src={task.resolvedPhotoUrl}
                    alt="Resolved evidence"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                    ✓ Photo Verified Fix
                  </div>
                </div>
              ) : (
                <div
                  onClick={handleMarkResolved}
                  className="cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 hover:border-emerald-500 aspect-video flex flex-col items-center justify-center p-4 text-center bg-slate-50 hover:bg-emerald-50/40 transition-colors space-y-1"
                >
                  <Camera className="w-6 h-6 text-slate-400" />
                  <span className="text-xs font-bold text-slate-700">Click to attach resolution photo</span>
                  <p className="text-[10px] text-slate-400">GPS stamp will be auto-embedded</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
