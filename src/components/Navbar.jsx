import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Menu, X, Shield, ArrowRight, Building2, UserCheck, AlertCircle, LayoutDashboard } from 'lucide-react';

export default function Navbar({ onOpenScanModal, onOpenLoginModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Smart Assets', href: '#smart-assets' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Duplicate Shield', href: '#duplicate-detection' },
    { name: 'Municipality Benefits', href: '#benefits' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-subtle border-b border-slate-200/80 py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
              <QrCode className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
                  Urban<span className="text-brand-600">QR</span>
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-brand-50 text-brand-700 border border-brand-200">
                  SMART CITY
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 tracking-wide">
                Civic Asset Intelligence
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-brand-50/60 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right CTAs */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/citizen"
              className="inline-flex items-center space-x-2 px-3.5 py-2 text-sm font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-lg transition-all shadow-sm"
            >
              <LayoutDashboard className="w-4 h-4 text-brand-600" />
              <span>Citizen Portal</span>
            </Link>

            <Link
              to="/citizen/scan"
              className="inline-flex items-center space-x-2 px-3.5 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-all"
            >
              <QrCode className="w-4 h-4 text-slate-600" />
              <span>Scan QR</span>
            </Link>

            <button
              onClick={onOpenLoginModal}
              className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-lg transition-all shadow-sm hover:shadow-md hover:shadow-brand-600/20"
            >
              <Building2 className="w-4 h-4" />
              <span>Municipal Login</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              to="/citizen"
              className="px-2.5 py-1.5 rounded-lg bg-brand-50 text-brand-700 border border-brand-200 text-xs font-bold"
            >
              Citizen App
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-md text-base font-medium text-slate-700 hover:text-brand-600 hover:bg-brand-50 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col space-y-2">
            <Link
              to="/citizen"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 text-sm font-bold text-brand-700 bg-brand-50 border border-brand-200 rounded-lg"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Open Citizen Portal</span>
            </Link>
            <Link
              to="/citizen/scan"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 border border-slate-200 rounded-lg"
            >
              <QrCode className="w-4 h-4" />
              <span>Camera QR Scanner</span>
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLoginModal();
              }}
              className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm"
            >
              <Building2 className="w-4 h-4" />
              <span>Municipal Portal Login</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
