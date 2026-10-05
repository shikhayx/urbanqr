import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertCircle, 
  Search, 
  Filter, 
  Flame, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Layers, 
  ShieldCheck, 
  Wrench, 
  CheckCircle2, 
  Zap, 
  Trash2, 
  Bus, 
  Sparkles, 
  Droplets,
  Plus
} from 'lucide-react';
import { useCitizen } from '../../context/CitizenContext';

export default function AdminComplaintsPage() {
  const { complaints, workers } = useCitizen();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const filteredComplaints = complaints.filter((comp) => {
    const matchesSearch = 
      comp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' ? true : comp.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' ? true : comp.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Municipal Complaints Queue
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Prioritized citizen work tickets with duplicate aggregation and field crew dispatch.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold">
          <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
            {complaints.filter(c => c.status !== 'Resolved').length} Active Triage
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
            {complaints.filter(c => c.status === 'Resolved').length} Resolved
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-subtle space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by ticket ID, asset ID, or keyword..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {['All', 'Submitted', 'Assigned', 'In Progress', 'Resolved'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
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

      {/* Complaints Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px] tracking-wider">
                <th className="py-3 px-4">Complaint ID</th>
                <th className="py-3 px-4">Asset</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Issue</th>
                <th className="py-3 px-4 text-center">Confirmations</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Assigned Worker</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredComplaints.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400 text-xs">
                    No complaints matching the criteria.
                  </td>
                </tr>
              ) : (
                filteredComplaints.map((comp) => (
                  <tr key={comp.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-700">
                      <Link to={`/admin/complaint/${comp.id}`} className="hover:underline">
                        {comp.id}
                      </Link>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 truncate max-w-[130px]">{comp.assetName}</div>
                      <span className="text-[10px] text-slate-400 font-mono">{comp.assetId}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="truncate max-w-[140px] text-slate-700 font-medium">{comp.location}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800 truncate max-w-[160px]">{comp.issue}</div>
                      <span className="text-[10px] text-slate-400">{comp.reportedDate}</span>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        <Flame className="w-3 h-3 text-orange-600" />
                        <span>{comp.confirmations}</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        comp.priority === 'High' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {comp.priority}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        comp.status === 'Resolved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : comp.status === 'In Progress'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                      }`}>
                        {comp.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {comp.assignedWorker ? (
                        <span className="font-medium text-slate-800">{comp.assignedWorker}</span>
                      ) : (
                        <span className="text-slate-400 italic">Unassigned</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/admin/complaint/${comp.id}`}
                        className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 font-semibold text-xs border border-brand-200"
                      >
                        <span>Triage</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
