import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Layers, 
  Search, 
  Filter, 
  QrCode, 
  MapPin, 
  Calendar, 
  Building2, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Zap, 
  Trash2, 
  Bus, 
  Sparkles, 
  Droplets, 
  Printer, 
  Download,
  Eye, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  X,
  Compass,
  FileSpreadsheet,
  Check,
  Trees
} from 'lucide-react';
import { useCitizen } from '../../context/CitizenContext';

export default function AdminAssetsPage() {
  const navigate = useNavigate();
  const { assets, addAsset } = useCitizen();

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [assetId, setAssetId] = useState('SL-1025');
  const [assetType, setAssetType] = useState('Streetlight');
  const [location, setLocation] = useState('Mira Road, Sector 5, Junction Crossing');
  const [area, setArea] = useState('Ward 12 - Mira Bhayandar');
  const [latitude, setLatitude] = useState('19.2825');
  const [longitude, setLongitude] = useState('72.8572');
  const [installationDate, setInstallationDate] = useState('2026-09-01');
  const [status, setStatus] = useState('Operational');

  // QR Modal State
  const [activeQrAsset, setActiveQrAsset] = useState(null);
  const [downloadToast, setDownloadToast] = useState(false);

  // Auto-generate Asset ID based on type
  const handleTypeChange = (newType) => {
    setAssetType(newType);
    const prefixes = {
      'Streetlight': 'SL',
      'Garbage Bin': 'WB',
      'Bus Stop': 'BS',
      'Public Toilet': 'PT',
      'Park Equipment': 'PK',
      'Water Point': 'WP',
    };
    const prefix = prefixes[newType] || 'AS';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setAssetId(`${prefix}-${randomNum}`);
  };

  const handleUseCurrentGps = () => {
    setLatitude('19.2831');
    setLongitude('72.8594');
  };

  const handleCreateAsset = (e) => {
    e.preventDefault();

    const created = addAsset({
      id: assetId,
      type: assetType,
      location: location,
      area: area,
      latitude: latitude,
      longitude: longitude,
      installationDate: installationDate,
      status: status,
    });

    setShowAddForm(false);
    // Immediately display the generated QR code preview modal
    setActiveQrAsset(created);
  };

  const handleDownloadQr = () => {
    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 3500);
  };

  const handlePrintQr = () => {
    window.print();
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = 
      asset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = 
      categoryFilter === 'All' || 
      asset.type === categoryFilter || 
      asset.category === categoryFilter;

    const matchesStatus = statusFilter === 'All' || asset.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Urban Asset Management
            </h1>
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
              Ward 12 Matrix
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Register municipal assets, generate tamper-proof QR codes, and monitor infrastructure telemetry.
          </p>
        </div>

        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            handleTypeChange(assetType);
          }}
          className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-xs font-bold rounded-xl shadow-md transition-all"
        >
          {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{showAddForm ? 'Close Asset Form' : 'Register New Urban Asset'}</span>
        </button>
      </div>

      {/* Asset Creation Form Card (Expandable) */}
      {showAddForm && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-brand-300 shadow-card animate-fadeIn space-y-6">
          <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <Plus className="w-5 h-5 text-brand-600" />
                <span>Register New Urban Infrastructure Asset</span>
              </h2>
              <p className="text-xs text-slate-500">
                Generates a secure QR plate URL (`/asset/[ASSET_ID]`) linked to municipal maintenance workflows.
              </p>
            </div>
            <span className="text-xs font-mono font-bold bg-brand-50 text-brand-700 px-3 py-1 rounded-xl border border-brand-200">
              NEW REGISTRATION
            </span>
          </div>

          <form onSubmit={handleCreateAsset} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Asset Type */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Asset Type <span className="text-rose-500">*</span>
                </label>
                <select
                  value={assetType}
                  onChange={(e) => handleTypeChange(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                >
                  <option value="Streetlight">⚡ Streetlight</option>
                  <option value="Garbage Bin">🗑️ Garbage Bin</option>
                  <option value="Bus Stop">🚏 Bus Stop</option>
                  <option value="Public Toilet">✨ Public Toilet</option>
                  <option value="Park Equipment">🌳 Park Equipment</option>
                  <option value="Water Point">💧 Water Point</option>
                </select>
              </div>

              {/* Asset ID */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800">
                    Asset ID <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleTypeChange(assetType)}
                    className="text-[10px] text-brand-600 font-bold hover:underline"
                  >
                    Regenerate
                  </button>
                </div>
                <input
                  type="text"
                  value={assetId}
                  onChange={(e) => setAssetId(e.target.value)}
                  required
                  placeholder="e.g. SL-1025"
                  className="w-full px-3.5 py-2.5 text-xs font-mono font-bold rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              {/* Status */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Initial Status <span className="text-rose-500">*</span>
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                >
                  <option value="Operational">Operational</option>
                  <option value="Faulty">Faulty</option>
                  <option value="Needs Maintenance">Needs Maintenance</option>
                  <option value="Needs Inspection">Needs Inspection</option>
                  <option value="Needs Clearing">Needs Clearing</option>
                </select>
              </div>

              {/* Installation Date */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Installation Date
                </label>
                <input
                  type="date"
                  value={installationDate}
                  onChange={(e) => setInstallationDate(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-medium rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              {/* Location */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Street Address & Landmark <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  placeholder="e.g. Mira Road, Sector 5 Crossing, Near Central Garden"
                  className="w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              {/* Area */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Ward Jurisdiction / Area <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  required
                  placeholder="e.g. Ward 12 - Mira Bhayandar"
                  className="w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              {/* Latitude */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800">Latitude</label>
                  <button
                    type="button"
                    onClick={handleUseCurrentGps}
                    className="text-[10px] text-brand-600 font-bold hover:underline"
                  >
                    Auto-GPS
                  </button>
                </div>
                <input
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="19.2812"
                  className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              {/* Longitude */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">Longitude</label>
                <input
                  type="text"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="72.8561"
                  className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              {/* Preview Target URL */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">Generated QR Target URL</label>
                <div className="px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono text-brand-700 font-bold truncate">
                  https://urbanqr.gov.in/asset/{assetId}
                </div>
              </div>

            </div>

            <div className="pt-2 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md transition-all"
              >
                <QrCode className="w-4 h-4" />
                <span>Create Asset & Generate QR Code</span>
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Asset ID (e.g. SL-1024), type, location..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 text-xs font-bold rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="All">All Asset Types</option>
              <option value="Streetlight">⚡ Streetlights</option>
              <option value="Garbage Bin">🗑️ Garbage Bins</option>
              <option value="Bus Stop">🚏 Bus Stops</option>
              <option value="Public Toilet">✨ Public Toilets</option>
              <option value="Park Equipment">🌳 Park Equipment</option>
              <option value="Water Point">💧 Water Points</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs font-bold rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="All">All Statuses</option>
              <option value="Operational">Operational</option>
              <option value="Faulty">Faulty</option>
              <option value="Needs Maintenance">Needs Maintenance</option>
              <option value="Needs Inspection">Needs Inspection</option>
              <option value="Needs Clearing">Needs Clearing</option>
            </select>
          </div>

        </div>
      </div>

      {/* Assets Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px] tracking-wider">
                <th className="py-3.5 px-4">Asset ID</th>
                <th className="py-3.5 px-4">Asset Type</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">QR Code</th>
                <th className="py-3.5 px-4">Last Maintenance</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredAssets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                    No assets found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Asset ID */}
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                        {asset.id}
                      </span>
                    </td>

                    {/* Asset Type */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{asset.name}</div>
                      <span className="text-[10px] text-brand-700 font-medium">{asset.type} • {asset.category}</span>
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4">
                      <div className="truncate max-w-[200px] text-slate-700 font-medium" title={asset.location}>
                        {asset.location}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{asset.coordinates}</span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        asset.status === 'Operational'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {asset.status}
                      </span>
                    </td>

                    {/* QR Code Action */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => setActiveQrAsset(asset)}
                        className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-700 border border-slate-200 transition-colors font-mono text-[11px] font-bold"
                        title="View Generated QR Plate"
                      >
                        <QrCode className="w-3.5 h-3.5 text-brand-600" />
                        <span>QR Plate</span>
                      </button>
                    </td>

                    {/* Last Maintenance */}
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">{asset.lastMaintenance}</div>
                      <span className="text-[10px] text-slate-400">{asset.department}</span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/citizen/asset/${asset.id}`}
                          target="_blank"
                          className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center space-x-1"
                          title="Open Telemetry Profile"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </Link>

                        <button
                          onClick={() => setActiveQrAsset(asset)}
                          className="px-2.5 py-1 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold text-xs border border-brand-200 transition-colors"
                        >
                          Print QR
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generated QR Code Preview Modal */}
      {activeQrAsset && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="relative bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Generated QR Code Plate</h3>
                  <p className="text-[11px] text-slate-400">Urban Asset Physical Label Standard</p>
                </div>
              </div>
              <button
                onClick={() => setActiveQrAsset(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Download Toast Notification */}
            {downloadToast && (
              <div className="p-3 rounded-xl bg-emerald-800 text-white text-xs font-bold flex items-center space-x-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>QR Label package downloaded: urbanqr-{activeQrAsset.id}.png (300 DPI Vector)</span>
              </div>
            )}

            {/* Physical Metal QR Plate Preview */}
            <div className="bg-slate-950 text-white rounded-3xl p-6 border-4 border-slate-800 text-center space-y-4 shadow-2xl relative overflow-hidden">
              
              {/* Corner Screws / Bolts */}
              <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-slate-700 border border-slate-500 shadow-inner" />
              <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-slate-700 border border-slate-500 shadow-inner" />
              <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-slate-700 border border-slate-500 shadow-inner" />
              <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-slate-700 border border-slate-500 shadow-inner" />

              <div className="flex items-center justify-between text-[10px] text-amber-300 font-extrabold uppercase tracking-widest border-b border-slate-800 pb-2">
                <span>MBMC WARD 12</span>
                <span>MUNICIPAL ASSET</span>
              </div>

              {/* QR Graphic Container */}
              <div className="bg-white p-4 rounded-2xl mx-auto inline-block shadow-lg border-2 border-slate-300">
                <QrCode className="w-36 h-36 text-slate-950 stroke-[1.8]" />
              </div>

              {/* Asset Information */}
              <div className="space-y-1">
                <h4 className="text-xl font-black font-mono text-white tracking-tight">
                  {activeQrAsset.id}
                </h4>
                <p className="text-xs text-brand-300 font-bold">{activeQrAsset.name}</p>
                <p className="text-[11px] text-slate-400 truncate max-w-xs mx-auto">{activeQrAsset.location}</p>
              </div>

              {/* Secure Concept URL Display */}
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center justify-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">https://urbanqr.gov.in/asset/{activeQrAsset.id}</span>
              </div>

              <div className="pt-1 text-[10px] text-slate-400 font-medium tracking-wide">
                SCAN TO REPORT OUTAGE • NO APP REQUIRED
              </div>

            </div>

            {/* 3 Required Action Buttons: Download QR, Print QR, View Asset */}
            <div className="grid grid-cols-3 gap-2">
              
              {/* 1. Download QR */}
              <button
                onClick={handleDownloadQr}
                className="py-2.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 text-xs font-bold flex flex-col items-center justify-center gap-1 transition-colors border border-slate-200"
              >
                <Download className="w-4 h-4 text-slate-700" />
                <span>Download QR</span>
              </button>

              {/* 2. Print QR */}
              <button
                onClick={handlePrintQr}
                className="py-2.5 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white text-xs font-bold flex flex-col items-center justify-center gap-1 transition-colors shadow-sm"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Print Plate</span>
              </button>

              {/* 3. View Asset */}
              <Link
                to={`/citizen/asset/${activeQrAsset.id}`}
                target="_blank"
                className="py-2.5 px-2 rounded-xl bg-brand-50 hover:bg-brand-100 active:bg-brand-200 text-brand-700 text-xs font-bold flex flex-col items-center justify-center gap-1 transition-colors border border-brand-200"
              >
                <ExternalLink className="w-4 h-4 text-brand-600" />
                <span>View Asset</span>
              </Link>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
