import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { 
  PlusCircle, 
  Camera, 
  Upload, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Send, 
  X, 
  ArrowLeft, 
  Zap, 
  Trash2, 
  Bus, 
  Sparkles, 
  Droplets,
  ShieldCheck,
  Building2,
  Info,
  Flame,
  ThumbsUp,
  Clock,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { useCitizen } from '../../context/CitizenContext';

export default function ReportIssuePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const assetParam = searchParams.get('assetId');

  const { assets, addComplaint, confirmComplaint, userConfirmedComplaints } = useCitizen();

  const [selectedAssetId, setSelectedAssetId] = useState(assetParam || 'SL-1024');
  const [selectedIssueCategory, setSelectedIssueCategory] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [photoPreview, setPhotoPreview] = useState('https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80');
  const [photoUploaded, setPhotoUploaded] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enableSms, setEnableSms] = useState(true);

  // Duplicate Detection Result State
  const [duplicateResult, setDuplicateResult] = useState(null);
  const [confirmStatusMsg, setConfirmStatusMsg] = useState('');

  const currentAsset = assets.find(a => a.id === selectedAssetId) || assets[0];

  const issueCategoriesMap = {
    'Electrical & Power': [
      'Bulb Outage / Flickering',
      'Exposed Live Wiring / Sparking',
      'Physical Pole Damage / Tilting',
      'Photocell Daytime Sensor Glitch',
      'Underground Cable Fault'
    ],
    'Sanitation': [
      'Overflowing Waste Bin',
      'Damaged Hydraulic Lid / Wheels',
      'Illegal Debris Dumping',
      'Foul Odor / Pest Infestation'
    ],
    'Public Transit': [
      'Broken Toughened Glass Panel',
      'Damaged / Missing Seating Bench',
      'Transit Schedule Display Outage',
      'Graffiti / Vandalism'
    ],
    'Public Health': [
      'No Running Water Supply',
      'Urgent Sanitization Required',
      'Broken Door Latch / Lock',
      'Plumbing Leak / Choked Drain'
    ],
    'Water & Utilities': [
      'Continuous Pipeline Leak',
      'No Water Flow / Dry Station',
      'Damaged Push Tap Valve',
      'Water Quality / Murky Flow'
    ],
    'Urban Greenery': [
      'Broken Play Equipment / Swing',
      'Fallen Tree Branch Hazard',
      'Damaged Sprinkler Line',
      'Litter & Lawn Damage'
    ]
  };

  const currentIssues = issueCategoriesMap[currentAsset.category] || [
    'General Equipment Breakdown',
    'Safety Hazard / Physical Damage',
    'Maintenance Required'
  ];

  useEffect(() => {
    setSelectedIssueCategory(currentIssues[0]);
    setDuplicateResult(null);
  }, [selectedAssetId]);

  const handleAssetSelect = (e) => {
    setSelectedAssetId(e.target.value);
  };

  const handleSimulatePhotoUpload = () => {
    setPhotoUploaded(true);
    setPhotoPreview('https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setDuplicateResult(null);

    setTimeout(() => {
      const result = addComplaint({
        assetId: currentAsset.id,
        issue: selectedIssueCategory,
        issueCategory: selectedIssueCategory,
        description: description || `Citizen reported: ${selectedIssueCategory} at ${currentAsset.location}.`,
        priority: priority,
        photoUrl: photoPreview
      });

      setIsSubmitting(false);

      if (result.duplicate) {
        // Show Duplicate Detection Screen
        setDuplicateResult(result);
      } else {
        // Navigate to newly created complaint
        navigate(`/citizen/complaint/${result.data.id}`);
      }
    }, 600);
  };

  const handleConfirmDuplicate = () => {
    if (!duplicateResult) return;
    const res = confirmComplaint(duplicateResult.existingComplaint.id);
    if (res.alreadyConfirmed) {
      setConfirmStatusMsg('You have already confirmed this existing complaint.');
    } else {
      setConfirmStatusMsg('Thank you! Your confirmation (+1) has been recorded and community urgency elevated.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Back</span>
        </button>

        <div className="text-right">
          <span className="text-xs font-semibold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-200">
            Automated Ward 12 Routing
          </span>
        </div>
      </div>

      {/* DUPLICATE COMPLAINT DETECTION MODAL / ALERT */}
      {duplicateResult && (
        <div className="bg-gradient-to-br from-amber-500/10 via-white to-amber-500/5 rounded-3xl p-6 sm:p-8 border-2 border-amber-400 shadow-2xl space-y-5 animate-fadeIn">
          
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-amber-950">
                  This issue has already been reported.
                </h2>
                <p className="text-xs text-amber-800 mt-0.5">
                  UrbanQR Smart Deduplication Shield intercepted duplicate ticket creation.
                </p>
              </div>
            </div>
            <button
              onClick={() => setDuplicateResult(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Existing Complaint Spotlight */}
          <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-subtle space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-black text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                  {duplicateResult.existingComplaint.id}
                </span>
                <span className="text-xs font-bold text-slate-900">
                  {duplicateResult.existingComplaint.assetName}
                </span>
              </div>

              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                duplicateResult.existingComplaint.status === 'In Progress'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-blue-100 text-blue-900'
              }`}>
                {duplicateResult.existingComplaint.status === 'In Progress' ? 'Under Repair (In Progress)' : duplicateResult.existingComplaint.status}
              </span>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-800">
                Complaint #{duplicateResult.existingComplaint.id} is currently {duplicateResult.existingComplaint.status === 'In Progress' ? 'Under Repair' : duplicateResult.existingComplaint.status}.
              </p>
              <p className="text-xs text-slate-600">
                "{duplicateResult.existingComplaint.issue}"
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
              <span className="flex items-center text-orange-600 font-bold">
                <Flame className="w-4 h-4 mr-1" />
                {duplicateResult.existingComplaint.confirmations} citizens confirmed this outage
              </span>
              <span className="text-slate-600">{duplicateResult.existingComplaint.location}</span>
            </div>
          </div>

          {confirmStatusMsg && (
            <div className="p-3 rounded-xl bg-emerald-800 text-white text-xs font-bold flex items-center space-x-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>{confirmStatusMsg}</span>
            </div>
          )}

          {/* 2 Required Action Buttons: Confirm Existing Complaint & Track Complaint */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={handleConfirmDuplicate}
              disabled={userConfirmedComplaints?.has(duplicateResult.existingComplaint.id)}
              className={`py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                userConfirmedComplaints?.has(duplicateResult.existingComplaint.id)
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md'
              }`}
            >
              {userConfirmedComplaints?.has(duplicateResult.existingComplaint.id) ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>You Confirmed This Complaint (+1)</span>
                </>
              ) : (
                <>
                  <ThumbsUp className="w-4 h-4" />
                  <span>Confirm Existing Complaint</span>
                </>
              )}
            </button>

            <Link
              to={`/citizen/complaint/${duplicateResult.existingComplaint.id}`}
              className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-md transition-colors text-center"
            >
              <span>Track Complaint</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      )}

      {/* Main Report Form */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-6">
        
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Report an Infrastructure Issue
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Submit geo-tagged photographic reports directly to municipal field engineers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* 1. Target Asset Information */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="block text-xs font-bold text-slate-900">
                Target Urban Asset:
              </label>

              <select
                value={selectedAssetId}
                onChange={handleAssetSelect}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                {assets.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.id} — {a.name} ({a.type})
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2 border-t border-slate-200/80 text-xs grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{currentAsset.location}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{currentAsset.department}</span>
              </div>
            </div>
          </div>

          {/* 2. Issue Type Dropdown */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-900">
              Issue Type / Fault Category <span className="text-rose-500">*</span>
            </label>
            <select
              value={selectedIssueCategory}
              onChange={(e) => setSelectedIssueCategory(e.target.value)}
              required
              className="w-full px-4 py-3 text-sm font-medium rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            >
              {currentIssues.map((issue) => (
                <option key={issue} value={issue}>
                  {issue}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Severity / Priority Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-900">
              Urgency / Hazard Level:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'Low', label: 'Low (Routine)', desc: 'Minor cosmetic defect' },
                { id: 'Medium', label: 'Medium (Standard)', desc: 'Public inconvenience' },
                { id: 'High', label: 'High (Hazard)', desc: 'Safety danger / darkness' },
              ].map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setPriority(p.id)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    priority === p.id
                      ? 'border-brand-600 bg-brand-50/70 ring-1 ring-brand-600 text-brand-900'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">{p.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Description Textarea */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-900">
                Detailed Description / Landmarks
              </label>
              <span className="text-[11px] text-slate-400">Optional</span>
            </div>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Streetlamp has been blinking since 7 PM, right next to the school entrance..."
              className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          {/* 5. Upload Photo */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-900">
              Attach Photographic Proof
            </label>

            {photoUploaded && photoPreview ? (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900">
                <img
                  src={photoPreview}
                  alt="Asset issue preview"
                  className="w-full h-48 object-cover opacity-90"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-[11px] font-mono flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>GPS: {currentAsset.coordinates}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setPhotoPreview('')}
                  className="absolute top-3 right-3 p-1.5 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg"
                  title="Remove Photo"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={handleSimulatePhotoUpload}
                className="cursor-pointer border-2 border-dashed border-slate-300 hover:border-brand-500 rounded-2xl p-6 text-center bg-slate-50/50 hover:bg-brand-50/30 transition-all space-y-2"
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-white border border-slate-200 flex items-center justify-center text-brand-600 shadow-sm">
                  <Camera className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold text-slate-700">
                  Click to capture photo or upload image
                </div>
                <p className="text-[11px] text-slate-400">
                  PNG, JPG, HEIC up to 10MB (Auto-stamps GPS coordinates)
                </p>
              </div>
            )}
          </div>

          {/* 6. Notifications Checkbox */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-800">Real-Time SMS & WhatsApp Status Updates</span>
              <p className="text-[11px] text-slate-500">Receive instant alerts when field crew is dispatched and when issue is closed.</p>
            </div>
            <input
              type="checkbox"
              checked={enableSms}
              onChange={(e) => setEnableSms(e.target.checked)}
              className="h-4 w-4 text-brand-600 rounded focus:ring-brand-500 border-slate-300"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <span>Checking Duplicate Shield & Registering...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Verified Civic Complaint</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
