import React from 'react';
import { QrCode, Mail, Phone, MapPin, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer" className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
                <QrCode className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white font-sans">
                  Urban<span className="text-brand-500">QR</span>
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  Smart Urban Asset Management & Citizen Reporting
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Empowering cities and citizens through durable QR code telemetry, eliminating duplicate complaint backlogs, and accelerating civic resolution times.
            </p>

            <div className="pt-2 flex items-center space-x-2 text-xs text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Municipal Gateways Operational • 99.98% Uptime</span>
            </div>
          </div>

          {/* Col 3: Smart Assets */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Asset Verticals
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#smart-assets" className="hover:text-white transition-colors">Streetlights & Poles</a></li>
              <li><a href="#smart-assets" className="hover:text-white transition-colors">Garbage & Waste Bins</a></li>
              <li><a href="#smart-assets" className="hover:text-white transition-colors">Bus Stops & Shelters</a></li>
              <li><a href="#smart-assets" className="hover:text-white transition-colors">Public Sanitation Units</a></li>
              <li><a href="#smart-assets" className="hover:text-white transition-colors">Parks & Green Spaces</a></li>
              <li><a href="#smart-assets" className="hover:text-white transition-colors">Drinking Water Hydrants</a></li>
            </ul>
          </div>

          {/* Col 4: Solutions & Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Civic Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#how-it-works" className="hover:text-white transition-colors">Zero-App Citizen Flow</a></li>
              <li><a href="#duplicate-detection" className="hover:text-white transition-colors">Duplicate Shield Engine</a></li>
              <li><a href="#benefits" className="hover:text-white transition-colors">Automated Ward Dispatch</a></li>
              <li><a href="#benefits" className="hover:text-white transition-colors">Verified SLA Audits</a></li>
              <li><a href="#benefits" className="hover:text-white transition-colors">GIS & CRM Integration</a></li>
            </ul>
          </div>

          {/* Col 5: Municipal Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              City Desk Contact
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center space-x-2 text-slate-400">
                <Mail className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                <span>contact@urbanqr.gov</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Phone className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                <span>+1 (800) 555-URBAN</span>
              </div>
              <div className="flex items-start space-x-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0 mt-0.5" />
                <span>Smart Governance Tower, Innovation Corridor, Sector 4</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} UrbanQR Technologies. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Standard</span>
            <span className="hover:text-slate-400 cursor-pointer">Municipal Terms</span>
            <span className="hover:text-slate-400 cursor-pointer">Citizen Charter</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Compliance</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
