import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  QrCode, 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  ArrowLeft, 
  Bell, 
  Award, 
  MapPin, 
  ChevronRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useCitizen } from '../context/CitizenContext';

export default function CitizenLayout({ children }) {
  const location = useLocation();
  const { citizenProfile, complaints } = useCitizen();

  const activeComplaintsCount = complaints.filter(c => c.status !== 'Resolved').length;

  const navItems = [
    { name: 'Dashboard', path: '/citizen', icon: LayoutDashboard, exact: true },
    { name: 'Scan QR', path: '/citizen/scan', icon: QrCode },
    { name: 'My Complaints', path: '/citizen/my-complaints', icon: FileText, badge: activeComplaintsCount },
    { name: 'Report Issue', path: '/citizen/report', icon: PlusCircle },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-brand-500 selection:text-white pb-20 md:pb-0">
      
      {/* Top Banner / Municipal Civic Notice */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-slate-200">UrbanQR Citizen Network — Ward 12 Active</span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline text-slate-400">Emergency Civic Helplines: 1916 / 112</span>
        </div>
        <Link
          to="/"
          className="text-brand-300 hover:text-white transition-colors flex items-center space-x-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Public Landing Page</span>
        </Link>
      </div>

      {/* Main Citizen Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left: Brand Logo & Portal Badge */}
            <div className="flex items-center space-x-4">
              <Link to="/citizen" className="flex items-center space-x-3 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 to-blue-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                  <QrCode className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold tracking-tight text-slate-900">
                      Urban<span className="text-brand-600">QR</span>
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-brand-50 text-brand-700 border border-brand-200">
                      CITIZEN PORTAL
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                    Ward 12 • Mira Bhayandar Municipal Corp
                  </p>
                </div>
              </Link>
            </div>

            {/* Middle: Desktop Navigation Tabs */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = item.exact 
                  ? location.pathname === item.path 
                  : location.pathname.startsWith(item.path);

                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-brand-50 text-brand-700 border border-brand-200/80 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="ml-1 px-1.5 py-0.2 bg-brand-600 text-white rounded-full text-[10px] font-bold">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* Right: Citizen Profile & Scan Action */}
            <div className="flex items-center space-x-3">
              <Link
                to="/citizen/scan"
                className="hidden sm:inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-all"
              >
                <QrCode className="w-4 h-4" />
                <span>Scan QR</span>
              </Link>

              {/* Citizen Mini Profile */}
              <div className="flex items-center space-x-2.5 pl-2 sm:border-l sm:border-slate-200">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-600 to-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  SS
                </div>
                <div className="hidden lg:block text-left">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-bold text-slate-800">{citizenProfile.name}</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center">
                      <Award className="w-2.5 h-2.5 mr-0.5 text-amber-600" />
                      {citizenProfile.civicScore} pts
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500">{citizenProfile.ward}</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </header>

      {/* Main Page Body */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>

      {/* Mobile Fixed Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-4 py-2 flex items-center justify-around shadow-lg">
        {navItems.map((item) => {
          const isActive = item.exact 
            ? location.pathname === item.path 
            : location.pathname.startsWith(item.path);

          if (item.name === 'Scan QR') {
            return (
              <Link
                key={item.name}
                to={item.path}
                className="flex flex-col items-center justify-center -mt-5"
              >
                <div className="w-12 h-12 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-600/30 border-2 border-white">
                  <QrCode className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-brand-700 mt-1">Scan</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
                isActive ? 'text-brand-600 font-bold' : 'text-slate-500'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">{item.name}</span>
            </Link>
          );
        })}
      </div>

    </div>
  );
}
