import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  QrCode, 
  LayoutDashboard, 
  AlertCircle, 
  Layers, 
  Users, 
  BarChart3, 
  Settings, 
  Search, 
  Bell, 
  Menu, 
  X, 
  ShieldCheck, 
  Building2, 
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { useCitizen } from '../context/CitizenContext';

export default function AdminLayout({ children }) {
  const location = useLocation();
  const { officerProfile, complaints } = useCitizen();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const activeComplaintsCount = complaints.filter(c => c.status !== 'Resolved').length;

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Complaints', path: '/admin/complaints', icon: AlertCircle, badge: activeComplaintsCount },
    { name: 'Urban Assets', path: '/admin/assets', icon: Layers },
    { name: 'Workers', path: '/admin/workers', icon: Users },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const unreadCount = officerProfile.notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans flex flex-col md:flex-row antialiased selection:bg-brand-500 selection:text-white">
      
      {/* Mobile Top Header */}
      <div className="md:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50 border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center text-white">
              <QrCode className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm tracking-tight">UrbanQR Municipal</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 relative"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div>
          <div className="p-5 border-b border-slate-800">
            <Link to="/admin" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="text-base font-bold tracking-tight text-white font-sans">
                    Urban<span className="text-brand-400">QR</span>
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                    OFFICER
                  </span>
                </div>
                <span className="text-[10px] font-medium text-slate-400 tracking-wide">
                  Ward 12 Control Desk
                </span>
              </div>
            </Link>
          </div>

          {/* Nav Items List */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Quick Switchers & Officer Info */}
        <div className="p-3 border-t border-slate-800 space-y-3">
          
          {/* Switch to Citizen Portal */}
          <div className="bg-slate-800/60 rounded-xl p-2.5 border border-slate-700/60 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span>Portals Switcher:</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <Link
                to="/citizen"
                className="px-2 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-[11px] font-medium text-center transition-colors"
              >
                Citizen Portal
              </Link>
              <Link
                to="/"
                className="px-2 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-[11px] font-medium text-center transition-colors"
              >
                Public Site
              </Link>
            </div>
          </div>

          {/* Officer Profile Card */}
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-600 to-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
              SK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{officerProfile.name}</p>
              <p className="text-[10px] text-slate-400 truncate">{officerProfile.badgeId}</p>
            </div>
          </div>

        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Desktop Top Bar */}
        <header className="hidden md:flex h-16 bg-white border-b border-slate-200 px-6 sm:px-8 items-center justify-between sticky top-0 z-30 shadow-subtle">
          
          {/* Search Box */}
          <div className="relative w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assets, tickets (e.g. SL-1024), workers..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-4">
            
            {/* Live Ward Status Chip */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Ward 12 Triage Live • 98.4% SLA</span>
            </div>

            {/* Notification Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors relative"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
                )}
              </button>

              {/* Dropdown Menu */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 animate-fadeIn">
                  <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Municipal Alerts</span>
                    <span className="text-[10px] font-semibold text-brand-600">{unreadCount} unread</span>
                  </div>

                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                    {officerProfile.notifications.map((notif) => (
                      <div key={notif.id} className="p-3 hover:bg-slate-50 transition-colors space-y-0.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className={`font-bold ${notif.unread ? 'text-slate-900' : 'text-slate-600'}`}>
                            {notif.title}
                          </span>
                          <span className="text-[10px] text-slate-400">{notif.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-tight">
                          {notif.message}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="px-4 pt-2 border-t border-slate-100 text-center">
                    <button
                      onClick={() => setNotificationsOpen(false)}
                      className="text-xs font-semibold text-brand-600 hover:text-brand-700"
                    >
                      Dismiss Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Officer Profile Badge */}
            <div className="flex items-center space-x-3 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                SK
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-800">{officerProfile.name}</div>
                <div className="text-[10px] text-slate-500">{officerProfile.role}</div>
              </div>
            </div>

          </div>

        </header>

        {/* Page Content Shell */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-8 flex-1">
          {children}
        </main>

      </div>

    </div>
  );
}
