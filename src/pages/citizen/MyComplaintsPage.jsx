import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  MapPin, 
  Building2, 
  Flame, 
  PlusCircle,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useCitizen } from '../../context/CitizenContext';

export default function MyComplaintsPage() {
  const { complaints } = useCitizen();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const filteredComplaints = complaints.filter((comp) => {
    const matchesSearch = 
      comp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = 
      statusFilter === 'All' 
        ? true 
        : statusFilter === 'Active' 
          ? comp.status !== 'Resolved'
          : comp.status === statusFilter;

    const matchesPriority = 
      priorityFilter === 'All' || comp.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Civic Complaints
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Track real-time field progress, department assignments, and verified photo resolutions.
          </p>
        </div>

        <Link
          to="/citizen/report"
          className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report New Issue</span>
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-subtle space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Complaint ID (e.g. UQ-2026-1024), asset, or issue..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {['All', 'Active', 'Submitted', 'Assigned', 'In Progress', 'Resolved'].map((st) => (
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

      {/* Complaints Cards List */}
      {filteredComplaints.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-subtle space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No Complaints Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No civic complaints matched your filter criteria. Try changing your search or report a new issue.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredComplaints.map((complaint) => (
            <div
              key={complaint.id}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-subtle hover:shadow-card hover:border-brand-300 transition-all space-y-4"
            >
              {/* Card Top: ID, Asset, Badges */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs font-extrabold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-200">
                    {complaint.id}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {complaint.assetName}
                    </h3>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Asset ID: {complaint.assetId}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    complaint.priority === 'High'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : complaint.priority === 'Medium'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-slate-100 text-slate-700'
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
              </div>

              {/* Card Middle: Issue details */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                <div className="md:col-span-8 space-y-2">
                  <h4 className="text-sm font-bold text-slate-800">
                    {complaint.issue}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {complaint.description}
                  </p>

                  <div className="pt-1 flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{complaint.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Reported: {complaint.reportedDate}</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-4 bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Department:</span>
                    <span className="font-semibold text-slate-800 text-right truncate max-w-[140px]">{complaint.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Community:</span>
                    <span className="font-bold text-amber-700 flex items-center">
                      <Flame className="w-3 h-3 mr-0.5 text-orange-600" />
                      {complaint.confirmations} confirmed
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Resolution SLA:</span>
                    <span className="font-medium text-brand-700">{complaint.slaTimeRemaining}</span>
                  </div>
                </div>
              </div>

              {/* Card Bottom Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Reported by: <strong className="text-slate-700 font-medium">{complaint.reportedBy}</strong>
                </span>

                <Link
                  to={`/citizen/complaint/${complaint.id}`}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-brand-600 hover:text-brand-800"
                >
                  <span>View Timeline & Proof</span>
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
