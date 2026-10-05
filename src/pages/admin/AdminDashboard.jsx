import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  AlertCircle, 
  Wrench, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Filter, 
  Search, 
  ArrowRight, 
  MapPin, 
  Clock, 
  Flame, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Trash2,
  Bus,
  Sparkles,
  Droplets,
  ExternalLink,
  Plus
} from 'lucide-react';
import { useCitizen } from '../../context/CitizenContext';

export default function AdminDashboard() {
  const { complaints, assets, workers, adminStats } = useCitizen();

  const [assetTypeFilter, setAssetTypeFilter] = useState('All');
  const [areaFilter, setAreaFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [tableSearch, setTableSearch] = useState('');

  const activeCount = complaints.filter(c => c.status !== 'Resolved').length;
  const underRepairCount = complaints.filter(c => c.status === 'In Progress').length;
  const resolvedCount = complaints.filter(c => c.status === 'Resolved').length;

  const areas = ['All', 'Sector 4 / Shanti Nagar', 'Station Plaza West', 'Kanakia Park', 'Srishti Complex', 'Beverly Park'];
  const assetTypesList = ['All', 'Streetlight', 'Garbage Bin', 'Bus Stop', 'Public Toilet', 'Water Point', 'Parks & Recreation'];

  // Filter complaints table
  const filteredComplaints = complaints.filter((comp) => {
    const matchesSearch = 
      comp.id.toLowerCase().includes(tableSearch.toLowerCase()) ||
      comp.assetName.toLowerCase().includes(tableSearch.toLowerCase()) ||
      comp.issue.toLowerCase().includes(tableSearch.toLowerCase()) ||
      comp.location.toLowerCase().includes(tableSearch.toLowerCase());

    const matchesAssetType = assetTypeFilter === 'All' || comp.assetType === assetTypeFilter;
    const matchesArea = areaFilter === 'All' || comp.location.toLowerCase().includes(areaFilter.toLowerCase().split(' ')[0]);
    const matchesStatus = statusFilter === 'All' || comp.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || comp.priority === priorityFilter;

    return matchesSearch && matchesAssetType && matchesArea && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-8">
      
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Municipal Triage & Operations Console
            </h1>
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
              Ward 12
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Real-time urban asset monitoring, field technician dispatch, and verified SLA resolution.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/admin/assets"
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Layers className="w-4 h-4 text-slate-500" />
            <span>Asset Matrix</span>
          </Link>

          <Link
            to="/admin/complaints"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-sm"
          >
            <AlertCircle className="w-4 h-4" />
            <span>All Complaints ({activeCount})</span>
          </Link>
        </div>
      </div>

      {/* 4 Core Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Urban Assets */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle flex flex-col justify-between hover:border-brand-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Urban Assets</span>
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
              {adminStats.totalAssets}
            </div>
            <div className="flex items-center space-x-1.5 text-xs text-emerald-600 font-medium mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{adminStats.assetsTaggedThisMonth} QR tags added this month</span>
            </div>
          </div>
        </div>

        {/* Active Complaints */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle flex flex-col justify-between hover:border-amber-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active Complaints</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-amber-600 font-mono tracking-tight">
              {activeCount}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              <span>{adminStats.activeComplaintsDelta}</span>
            </div>
          </div>
        </div>

        {/* Under Repair */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle flex flex-col justify-between hover:border-blue-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Under Repair</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-blue-600 font-mono tracking-tight">
              {underRepairCount}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              <span>{adminStats.fieldCrewsActive} field crews currently on-site</span>
            </div>
          </div>
        </div>

        {/* Resolved Complaints */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle flex flex-col justify-between hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Resolved Complaints</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-emerald-600 font-mono tracking-tight">
              {adminStats.resolvedComplaints}
            </div>
            <div className="text-xs text-emerald-700 font-medium mt-1">
              <span>{adminStats.slaCompliance} SLA compliance rate</span>
            </div>
          </div>
        </div>

      </div>

      {/* Complaints Overview Section & Live Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden space-y-4">
        
        {/* Section Title & Quick Filters Header */}
        <div className="p-6 border-b border-slate-200/80 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Complaints Overview & Dispatch Queue</h2>
              <p className="text-xs text-slate-500">
                Prioritized queue of citizen reports with deduplication confirmation counters.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-slate-500 font-mono">
                Showing {filteredComplaints.length} of {complaints.length} tickets
              </span>
            </div>
          </div>

          {/* Search and 4 Dropdown Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
            
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                placeholder="Search ticket, asset, area..."
                className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {/* Asset Type Filter */}
            <div>
              <select
                value={assetTypeFilter}
                onChange={(e) => setAssetTypeFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="All">All Asset Types</option>
                <option value="Streetlight">⚡ Streetlights</option>
                <option value="Garbage Bin">🗑️ Garbage Bins</option>
                <option value="Bus Stop">🚏 Bus Stops</option>
                <option value="Public Toilet">✨ Public Toilets</option>
                <option value="Water Point">💧 Water Points</option>
                <option value="Parks & Recreation">🌳 Parks</option>
              </select>
            </div>

            {/* Area Filter */}
            <div>
              <select
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="All">All Ward Areas</option>
                <option value="Sector 4">Sector 4 / Shanti Nagar</option>
                <option value="Station Plaza">Station Plaza West</option>
                <option value="Kanakia Park">Kanakia Park</option>
                <option value="Srishti">Srishti Complex</option>
                <option value="Beverly">Beverly Park</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="All">All Statuses</option>
                <option value="Submitted">Submitted (New)</option>
                <option value="Assigned">Assigned to Crew</option>
                <option value="In Progress">In Progress (On-Site)</option>
                <option value="Resolved">Resolved & Closed</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="All">All Priorities</option>
                <option value="High">High / Critical</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px] tracking-wider">
                <th className="py-3 px-4">Complaint ID</th>
                <th className="py-3 px-4">Asset</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Issue</th>
                <th className="py-3 px-4 text-center">Reports / Confirms</th>
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
                    No complaints matching the selected filters.
                  </td>
                </tr>
              ) : (
                filteredComplaints.map((comp) => (
                  <tr key={comp.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Complaint ID */}
                    <td className="py-3 px-4 font-mono font-bold text-brand-700">
                      <Link to={`/admin/complaint/${comp.id}`} className="hover:underline">
                        {comp.id}
                      </Link>
                    </td>

                    {/* Asset */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 truncate max-w-[130px]">
                        {comp.assetName}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {comp.assetId}
                      </span>
                    </td>

                    {/* Location */}
                    <td className="py-3 px-4">
                      <div className="truncate max-w-[150px] text-slate-700 font-medium" title={comp.location}>
                        {comp.location}
                      </div>
                    </td>

                    {/* Issue */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800 truncate max-w-[160px]" title={comp.issue}>
                        {comp.issue}
                      </div>
                      <span className="text-[10px] text-slate-400">{comp.reportedDate}</span>
                    </td>

                    {/* Reports / Confirmations */}
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        <Flame className="w-3 h-3 text-orange-600" />
                        <span>{comp.confirmations}</span>
                      </span>
                    </td>

                    {/* Priority */}
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        comp.priority === 'High'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : comp.priority === 'Medium'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-700'
                      }`}>
                        {comp.priority}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
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

                    {/* Assigned Worker */}
                    <td className="py-3 px-4">
                      {comp.assignedWorker ? (
                        <div className="font-medium text-slate-800">
                          {comp.assignedWorker}
                        </div>
                      ) : (
                        <span className="text-slate-400 italic text-[11px]">Unassigned</span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`/admin/complaint/${comp.id}`}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 font-semibold text-xs border border-brand-200 transition-colors"
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

      {/* Field Team Real-Time Availability Strip */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-brand-600" />
            <h3 className="text-sm font-bold text-slate-900">Ward 12 Field Response Units</h3>
          </div>
          <Link to="/admin/workers" className="text-xs font-semibold text-brand-600 hover:underline">
            Manage all crews →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workers.slice(0, 3).map((w) => (
            <div key={w.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-bold text-slate-900">{w.name}</span>
                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                    w.status === 'On-Site' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {w.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{w.vehicle}</p>
                <p className="text-[10px] text-slate-400 font-mono">{w.currentLocation}</p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                {w.rating} ★
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
