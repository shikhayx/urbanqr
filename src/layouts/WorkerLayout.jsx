import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Wrench, 
  LayoutDashboard, 
  CheckSquare, 
  MapPin, 
  Truck, 
  ArrowLeft, 
  Bell, 
  ShieldCheck, 
  Building2, 
  UserCheck, 
  PhoneCall, 
  QrCode,
  Menu,
  X,
  Clock
} from 'lucide-react';
import { useCitizen } from '../context/CitizenContext';

export default function WorkerLayout({ children }) {
  const location = useLocation();
  const { workers, complaints } = useCitizen();
  const currentWorker = workers[0]; // Rajesh Sharma (Lead Tech)

  const [onDuty, setOnDuty] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Worker assigned complaints
  const workerTasks = complaints.filter(
    c => c.assignedWorker === currentWorker.name || c.assetCategory === 'Electrical & Power' || c.status !== 'Resolved'
  );
  const inProgressCount = workerTasks.filter(c => c.status === 'In Progress').length;
  const pendingCount = workerTasks.filter(c => c.status === 'Assigned' || c.status === 'Submitted').length;

  const navItems = [
    { name: 'Field Dashboard', path: '/worker', icon: LayoutDashboard, exact: true },
    { name: 'Assigned Tasks', path: '/worker/tasks', icon: CheckSquare, badge: pendingCount + inProgressCount },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col antialiased selection:bg-amber-500 selection:text-white pb-20 md:pb-0">
      
      {/* Top Field Status Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 sm:px-8 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <span className={`w-2.5 h-2.5 rounded-full ${onDuty ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
          <span className="font-bold text-white font-mono">{currentWorker.vehicle}</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300 font-medium">{currentWorker.name} ({currentWorker.role})</span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setOnDuty(!onDuty)}
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
              onDuty ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {onDuty ? '● ON DUTY' : '○ OFF DUTY'}
          </button>

          <Link
            to="/admin"
            className="text-slate-400 hover:text-white transition-colors flex items-center space-x-1 text-xs hidden sm:flex"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Officer Console</span>
          </Link>
        </div>
      </div>

      {/* Main Worker Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo & Field Terminal Badge */}
            <div className="flex items-center space-x-3">
              <Link to="/worker" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
                  <Wrench className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold tracking-tight text-slate-900">
                      Urban<span className="text-amber-600">QR</span>
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300">
                      FIELD CREW TERMINAL
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Ward 12 Municipal Rapid Response Unit
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => {
                const isActive = item.exact 
                  ? location.pathname === item.path 
                  : location.pathname.startsWith(item.path);

                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-amber-50 text-amber-900 border border-amber-300 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="ml-1 px-2 py-0.2 bg-amber-600 text-white rounded-full text-[10px] font-bold">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* Right: Quick Switcher */}
            <div className="hidden sm:flex items-center space-x-2">
              <Link
                to="/citizen"
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
              >
                Citizen View
              </Link>
              <Link
                to="/admin"
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
              >
                Officer View
              </Link>
            </div>

          </div>
        </div>
      </header>

      {/* Main Worker Content */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>

      {/* Mobile Fixed Bottom Bar for Field Techs */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950 text-white border-t border-slate-800 px-4 py-2 flex items-center justify-around shadow-2xl">
        {navItems.map((item) => {
          const isActive = item.exact 
            ? location.pathname === item.path 
            : location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center py-1 px-3 rounded-lg transition-colors ${
                isActive ? 'text-amber-400 font-bold' : 'text-slate-400'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] mt-1">{item.name}</span>
            </Link>
          );
        })}

        <Link
          to="/admin"
          className="flex flex-col items-center py-1 px-3 text-slate-400"
        >
          <Building2 className="w-5 h-5" />
          <span className="text-[10px] mt-1">Admin</span>
        </Link>
      </div>

    </div>
  );
}
