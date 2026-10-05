import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  QrCode, 
  MapPin, 
  Building2, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Flame, 
  PlusCircle, 
  ArrowLeft, 
  ShieldCheck, 
  Zap, 
  Trash2, 
  Bus, 
  Sparkles, 
  Droplets, 
  Layers,
  ChevronRight,
  ThumbsUp,
  Share2,
  FileSpreadsheet,
  Loader2,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { useCitizen } from '../../context/CitizenContext';
import { assetApi } from '../../services/api';

export default function AssetDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { assets, complaints, confirmComplaint } = useCitizen();

  const [assetData, setAssetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(false);
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const fallbackAsset = assets.find(a => a.id?.toLowerCase() === id?.toLowerCase());

  // Fetch asset information from backend API on mount
  useEffect(() => {
    const fetchAssetData = async () => {
      if (!id) return;
      setLoading(true);
      setNotFoundError(false);

      try {
        const res = await assetApi.getAssetById(id);
        if (res?.data) {
          const a = res.data;
          setAssetData({
            id: a.assetId,
            name: `${a.type} #${a.assetId}`,
            type: a.type,
            category: a.type === 'Streetlight' ? 'Electrical & Power' : 'Civic Infrastructure',
            location: a.location,
            ward: 'Ward 12 - Mira Bhayandar',
            department: a.type === 'Streetlight' ? 'Municipal Electrical Division' : 'Municipal Works Dept',
            status: a.status,
            statusColor: a.status === 'Operational' ? 'emerald' : 'amber',
            lastMaintenance: a.installationDate ? new Date(a.installationDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recent Install',
            installationDate: a.installationDate,
            coordinates: `${a.latitude || 19.2812}° N, ${a.longitude || 72.8561}° E`,
            qrCodeString: `https://urbanqr.gov.in/asset/${a.assetId}`,
            healthScore: a.status === 'Operational' ? 98 : 55,
            specifications: [
              { label: 'Asset ID', value: a.assetId },
              { label: 'Asset Type', value: a.type },
              { label: 'GPS Coordinates', value: `${a.latitude || 19.2812}° N, ${a.longitude || 72.8561}° E` },
              { label: 'Installation Date', value: a.installationDate ? new Date(a.installationDate).toLocaleDateString() : 'N/A' },
            ],
            recentComplaints: fallbackAsset?.recentComplaints || []
          });
        }
      } catch (err) {
        if (fallbackAsset) {
          setAssetData(fallbackAsset);
        } else {
          setNotFoundError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAssetData();
  }, [id, assets]);

  const currentAsset = assetData || fallbackAsset;

  // Find active complaint for this asset (if any)
  const activeComplaint = currentAsset 
    ? complaints.find(c => c.assetId.toUpperCase() === currentAsset.id.toUpperCase() && c.status !== 'Resolved')
    : null;

  const handleConfirm = async () => {
    if (activeComplaint && !hasConfirmed) {
      await confirmComplaint(activeComplaint.id);
      setHasConfirmed(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3500);
    }
  };

  // 1. Loading State
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 border border-brand-200">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Connecting to Municipal QR Registry...</h2>
          <p className="text-xs text-slate-500 font-mono">Fetching telemetry for asset ID: {id}</p>
        </div>
      </div>
    );
  }

  // 2. Unknown Asset / Not Found State
  if (notFoundError || !currentAsset) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center bg-white rounded-3xl p-8 border border-slate-200 shadow-subtle space-y-6">
        <div className="w-16 h-16 mx-auto bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center border border-rose-200">
          <XCircle className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-slate-900">Unknown Urban Asset</h2>
          <p className="text-xs text-slate-600">
            No registered municipal asset found matching identifier <strong className="font-mono text-slate-900 font-bold">{id}</strong>.
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 text-left space-y-2">
          <div className="flex items-center space-x-2 font-bold text-slate-800">
            <HelpCircle className="w-4 h-4 text-brand-600" />
            <span>Possible Reasons:</span>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-[11px] text-slate-500">
            <li>The physical QR code tag may belong to a different municipal jurisdiction.</li>
            <li>The asset has not yet been onboarded into Ward 12 Asset Matrix.</li>
            <li>Typo in manual Asset ID lookup.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            to="/citizen/scan"
            className="flex-1 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-sm"
          >
            Scan Another QR
          </Link>
          <Link
            to="/citizen"
            className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // 3. Successful Scan & Display
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Back Button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/citizen/scan')}
          className="inline-flex items-center text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Back to QR Scanner</span>
        </button>

        <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>VERIFIED ASSET:</span>
          <span className="font-bold text-slate-900">{currentAsset.id}</span>
        </div>
      </div>

      {/* Asset Main Telemetry Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-6">
        
        {/* Top Header: Name, ID, & Status */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-200 text-brand-600 flex items-center justify-center shrink-0">
              <Zap className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2.5">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">
                  {currentAsset.id}
                </h1>
                <span className="text-sm font-bold text-slate-700">
                  • {currentAsset.name}
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center mt-1">
                <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
                {currentAsset.location} ({currentAsset.ward})
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider ${
              currentAsset.status === 'Operational'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}>
              {currentAsset.status}
            </span>

            <Link
              to={`/citizen/report?assetId=${currentAsset.id}`}
              className="inline-flex items-center space-x-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-xs font-bold rounded-xl shadow-md transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report Problem</span>
            </Link>
          </div>
        </div>

        {/* Duplicate Shield Alert Banner (If an active issue exists) */}
        {activeComplaint && (
          <div className="rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-amber-950">Active Outage Already Logged on this Asset</h3>
                  <p className="text-xs text-amber-800">
                    "{activeComplaint.issue}"
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                {activeComplaint.status}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-amber-200/80 text-xs">
              <div className="flex items-center space-x-3 text-amber-900">
                <span className="font-semibold flex items-center">
                  <Flame className="w-4 h-4 mr-1 text-orange-600" />
                  {activeComplaint.confirmations} citizens confirmed this outage
                </span>
                <span>•</span>
                <span className="text-slate-600">Reported: {activeComplaint.reportedDate}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleConfirm}
                  disabled={hasConfirmed}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    hasConfirmed
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm'
                  }`}
                >
                  {hasConfirmed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirmed! (Updates On)</span>
                    </>
                  ) : (
                    <>
                      <ThumbsUp className="w-4 h-4" />
                      <span>I'm facing this too (+1 Confirm)</span>
                    </>
                  )}
                </button>

                <Link
                  to={`/citizen/complaint/${activeComplaint.id}`}
                  className="px-3 py-2 bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-semibold"
                >
                  View Timeline
                </Link>
              </div>
            </div>

            {showToast && (
              <div className="p-2.5 rounded-lg bg-emerald-800 text-white text-xs flex items-center space-x-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>You confirmed this complaint. Municipal dispatch notified of increased community impact.</span>
              </div>
            )}
          </div>
        )}

        {/* Specifications & Metadata Grid */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 mb-3">Asset Technical Specs & Governance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Responsible Division</span>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{currentAsset.department}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Last Maintenance Audit</span>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{currentAsset.lastMaintenance}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] text-slate-400 uppercase font-bold">GPS Coordinates</span>
              <p className="text-xs font-mono font-bold text-brand-700 mt-0.5">{currentAsset.coordinates}</p>
            </div>

            {currentAsset.specifications?.map((spec, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] text-slate-400 uppercase font-bold">{spec.label}</span>
                <p className="text-xs font-bold text-slate-800 mt-0.5">{spec.value}</p>
              </div>
            ))}

          </div>
        </div>

        {/* Recent Complaints History */}
        <div className="pt-4 border-t border-slate-100">
          <h2 className="text-sm font-bold text-slate-900 mb-3">Recent Complaints on this Asset</h2>
          
          {currentAsset.recentComplaints?.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No prior complaint history for this asset.</p>
          ) : (
            <div className="space-y-3">
              {currentAsset.recentComplaints?.map((comp) => (
                <div
                  key={comp.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-brand-700">{comp.id}</span>
                      <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                        comp.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {comp.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium">{comp.issue}</p>
                    <p className="text-[11px] text-slate-400">{comp.reportedDate} • {comp.confirmations} confirmations</p>
                  </div>

                  <Link
                    to={`/citizen/complaint/${comp.id}`}
                    className="shrink-0 text-xs font-semibold text-brand-600 hover:text-brand-800 flex items-center"
                  >
                    View Status <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Report CTA */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            Experiencing a malfunction or broken component on this asset?
          </p>

          <Link
            to={`/citizen/report?assetId=${currentAsset.id}`}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>File New Verified Report</span>
          </Link>
        </div>

      </div>

    </div>
  );
}
