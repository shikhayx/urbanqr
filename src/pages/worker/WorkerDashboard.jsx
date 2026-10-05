import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckSquare, 
  Clock, 
  Wrench, 
  CheckCircle2, 
  MapPin, 
  AlertTriangle, 
  ArrowRight, 
  Flame, 
  Truck, 
  Phone, 
  Navigation, 
  ShieldCheck, 
  Zap, 
  Trash2, 
  Bus, 
  Droplets,
  Award,
  ChevronRight
} from 'lucide-react';
import { useCitizen } from '../../context/CitizenContext';

export default function WorkerDashboard() {
  const { complaints, workers } = useCitizen();
  const currentWorker = workers[0]; // Rajesh Sharma

  // Filter tasks for this worker / electrical division
  const assignedTasks = complaints.filter(
    c => c.assignedWorker === currentWorker.name || c.assetCategory === 'Electrical & Power' || c.status !== 'Resolved'
  );

  const pendingTasks = assignedTasks.filter(c => c.status === 'Submitted' || c.status === 'Assigned');
  const inProgressTasks = assignedTasks.filter(c => c.status === 'In Progress');
  const completedTasks = complaints.filter(c => c.status === 'Resolved');

  // Primary active task spotlight
  const activeSpotlightTask = inProgressTasks[0] || pendingTasks[0] || assignedTasks[0];

  return (
    <div className="space-y-8">
      
      {/* Top Field Tech Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-slate-800 relative overflow-hidden">
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold">
              <Truck className="w-3.5 h-3.5" />
              <span>Van #04 (MH-04-AZ-2041) • Field Response Unit</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Hello, Technician {currentWorker.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              You have <strong className="text-amber-400 font-bold">{pendingTasks.length + inProgressTasks.length} active municipal work orders</strong> assigned in Ward 12.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link
              to="/worker/tasks"
              className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20 transition-all"
            >
              <CheckSquare className="w-4 h-4" />
              <span>View All Assigned Tasks</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Overview Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Assigned Tasks */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Assigned Tasks</span>
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <CheckSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-slate-900 font-mono">
              {assignedTasks.length}
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-1">Ward 12 Work Queue</p>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pending</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-blue-600 font-mono">
              {pendingTasks.length}
            </div>
            <p className="text-[11px] text-blue-700 font-medium mt-1">Awaiting Field Dispatch</p>
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">In Progress</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-amber-600 font-mono">
              {inProgressTasks.length}
            </div>
            <p className="text-[11px] text-amber-700 font-medium mt-1">Crew Currently On-Site</p>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Completed</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-emerald-600 font-mono">
              {completedTasks.length}
            </div>
            <p className="text-[11px] text-emerald-700 font-medium mt-1">Photo Verified & Closed</p>
          </div>
        </div>

      </div>

      {/* Active Work Order Spotlight (Priority Work Ticket) */}
      {activeSpotlightTask && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-amber-500 animate-ping" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Current Priority Work Order
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 uppercase">
                {activeSpotlightTask.priority} Priority
              </span>
            </div>

            <span className="text-xs font-mono font-bold bg-slate-900 text-white px-3 py-1 rounded-xl">
              {activeSpotlightTask.id}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold font-mono text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                  {activeSpotlightTask.assetId}
                </span>
                <span className="text-base font-bold text-slate-900">
                  {activeSpotlightTask.assetName}
                </span>
              </div>

              <p className="text-sm font-semibold text-slate-800">
                {activeSpotlightTask.issue}
              </p>
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                "{activeSpotlightTask.description}"
              </p>

              <div className="flex items-center space-x-2 text-xs text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="font-medium">{activeSpotlightTask.location}</span>
              </div>
            </div>

            <div className="lg:col-span-4 bg-amber-50/70 rounded-2xl p-5 border border-amber-200 space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] text-amber-900 font-bold uppercase">SLA Clock</span>
                <div className="text-lg font-black font-mono text-amber-950">
                  {activeSpotlightTask.slaTimeRemaining}
                </div>
                <p className="text-[11px] text-amber-800">Target ETA: {activeSpotlightTask.estimatedResolution}</p>
              </div>

              <Link
                to={`/worker/task/${activeSpotlightTask.id}`}
                className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <Wrench className="w-4 h-4" />
                <span>Open Work Order & Start Repair</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Assigned Tasks Quick Queue */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Ward 12 Electrical & Civic Task Queue</h3>
            <p className="text-xs text-slate-500">Sorted by urgency & citizen confirmation count</p>
          </div>
          <Link
            to="/worker/tasks"
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center"
          >
            View all {assignedTasks.length} tasks <ChevronRight className="w-4 h-4 ml-0.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {assignedTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold text-brand-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {task.id}
                  </span>
                  <span className="font-bold text-xs text-slate-900">{task.assetName} ({task.assetId})</span>
                  <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                    task.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : task.status === 'In Progress' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {task.status}
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-medium">{task.issue}</p>
                <div className="flex items-center space-x-3 text-[11px] text-slate-500">
                  <span>{task.location}</span>
                  <span>•</span>
                  <span className="text-orange-600 font-semibold flex items-center">
                    <Flame className="w-3 h-3 mr-0.5" />
                    {task.confirmations} confirms
                  </span>
                </div>
              </div>

              <Link
                to={`/worker/task/${task.id}`}
                className="shrink-0 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-sm"
              >
                <span>Manage Work Order</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
