import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Wrench, 
  Truck, 
  Award, 
  ShieldCheck, 
  Plus,
  AlertCircle
} from 'lucide-react';
import { useCitizen } from '../../context/CitizenContext';

export default function AdminWorkersPage() {
  const { workers } = useCitizen();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredWorkers = workers.filter((w) => {
    const matchesSearch = 
      w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.vehicle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || w.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Field Technicians & Response Crews
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Ward 12 Municipal Maintenance Workforce • GPS Telemetry & Active Work Orders.
          </p>
        </div>

        <button
          onClick={() => alert("Dispatch Manager: Register field technician & assign GPS vehicle tracker.")}
          className="inline-flex items-center space-x-1.5 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Field Worker</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by worker name, role, department, or vehicle..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {['All', 'On-Site', 'En Route', 'Available', 'Off Duty'].map((st) => (
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

      {/* Workers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkers.map((worker) => (
          <div
            key={worker.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle hover:shadow-card hover:border-brand-300 transition-all space-y-4 flex flex-col justify-between"
          >
            <div>
              {/* Card Top */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    {worker.avatar}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{worker.name}</h3>
                    <p className="text-xs text-brand-700 font-medium">{worker.role}</p>
                    <span className="text-[10px] text-slate-400 font-mono">ID: {worker.id}</span>
                  </div>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  worker.status === 'On-Site'
                    ? 'bg-amber-100 text-amber-800'
                    : worker.status === 'En Route'
                      ? 'bg-blue-100 text-blue-800'
                      : worker.status === 'Available'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                }`}>
                  {worker.status}
                </span>
              </div>

              {/* Department & Vehicle */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center space-x-2">
                  <Wrench className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-medium text-slate-800">{worker.department}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{worker.vehicle}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{worker.currentLocation}</span>
                </div>
              </div>
            </div>

            {/* Bottom Performance Stats */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Resolved (Month)</span>
                <p className="font-bold text-slate-900">{worker.resolvedThisMonth} work orders</p>
              </div>

              <div className="text-right space-y-0.5">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Civic Rating</span>
                <p className="font-bold text-emerald-700 font-mono">{worker.rating} ★</p>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
