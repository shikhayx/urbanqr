import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckSquare, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Flame, 
  Wrench, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Zap, 
  Trash2, 
  Bus, 
  Droplets,
  Sparkles,
  Layers,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { useCitizen } from '../../context/CitizenContext';

export default function WorkerTasksPage() {
  const { complaints } = useCitizen();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const filteredTasks = complaints.filter((task) => {
    const matchesSearch = 
      task.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assetId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = 
      statusFilter === 'All'
        ? true
        : statusFilter === 'Pending'
          ? (task.status === 'Submitted' || task.status === 'Assigned')
          : task.status === statusFilter;

    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Assigned Field Work Orders
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Ward 12 rapid response dispatch queue. Pick a task to navigate and log repairs.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-bold">
          <span className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 border border-amber-300">
            {complaints.filter(c => c.status !== 'Resolved').length} Active Work Orders
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-subtle space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Complaint ID, Asset ID (e.g. SL-1024), problem, location..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {['All', 'Pending', 'In Progress', 'Resolved'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  statusFilter === st
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Task Cards Grid */}
      {filteredTasks.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-subtle space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <CheckSquare className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No Work Orders Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No active tasks match your selected filter criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-subtle hover:shadow-card hover:border-amber-400 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Top Row: Complaint ID, Asset ID & Priority */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {task.id}
                    </span>
                    <span className="font-mono text-xs font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                      {task.assetId}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      task.priority === 'High'
                        ? 'bg-rose-100 text-rose-800'
                        : task.priority === 'Medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                    }`}>
                      {task.priority}
                    </span>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      task.status === 'Resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : task.status === 'In Progress'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </div>

                {/* Asset Name & Type */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{task.assetName}</h3>
                  <p className="text-xs text-brand-700 font-medium">{task.assetType} • {task.assetCategory}</p>
                </div>

                {/* Problem Statement */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-0.5">Reported Problem</span>
                  <p className="text-xs font-bold text-slate-800">{task.issue}</p>
                  <p className="text-[11px] text-slate-600 line-clamp-2 mt-1">{task.description}</p>
                </div>

                {/* Exact Location & Reported Date */}
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span className="font-medium text-slate-800">{task.location}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Reported: {task.reportedDate}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-700 flex items-center">
                  <Flame className="w-3.5 h-3.5 mr-1 text-orange-600" />
                  {task.confirmations} citizen confirms
                </span>

                <Link
                  to={`/worker/task/${task.id}`}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white text-xs font-bold transition-all shadow-sm"
                >
                  <Wrench className="w-3.5 h-3.5 text-amber-400" />
                  <span>Start / Manage Repair</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
