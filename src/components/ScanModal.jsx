import React, { useState, useEffect } from 'react';
import { 
  X, 
  QrCode, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Building2, 
  Send, 
  Camera, 
  Sparkles,
  Flame,
  ThumbsUp,
  Clock,
  ArrowRight
} from 'lucide-react';
import { assetTypes } from '../data/landingData';

export default function ScanModal({ isOpen, onClose, preselectedAsset }) {
  const [selectedAsset, setSelectedAsset] = useState(assetTypes[0]);
  const [reportStage, setReportStage] = useState('scan'); // 'scan' | 'inspect' | 'success'
  const [selectedIssue, setSelectedIssue] = useState('');
  const [isDuplicateFlow, setIsDuplicateFlow] = useState(true);
  const [confirmedCount, setConfirmedCount] = useState(14);
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [customComment, setCustomComment] = useState('');
  const [generatedTicketId, setGeneratedTicketId] = useState('');

  useEffect(() => {
    if (preselectedAsset) {
      setSelectedAsset(preselectedAsset);
      setSelectedIssue(preselectedAsset.commonIssues[0]);
      setReportStage('inspect');
    } else {
      setSelectedAsset(assetTypes[0]);
      setSelectedIssue(assetTypes[0].commonIssues[0]);
      setReportStage('scan');
    }
    setHasConfirmed(false);
    setConfirmedCount(14);
  }, [preselectedAsset, isOpen]);

  if (!isOpen) return null;

  const handleAssetChange = (e) => {
    const asset = assetTypes.find(a => a.id === e.target.value) || assetTypes[0];
    setSelectedAsset(asset);
    setSelectedIssue(asset.commonIssues[0]);
  };

  const handleConfirmExisting = () => {
    setHasConfirmed(true);
    setConfirmedCount(prev => prev + 1);
  };

  const handleSubmitNewReport = (e) => {
    e.preventDefault();
    const randomTicket = `UQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedTicketId(randomTicket);
    setReportStage('success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold">UrbanQR Asset Scanner</h3>
              <p className="text-[11px] text-slate-400">Citizen Reporting Simulator</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {reportStage === 'scan' && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-brand-50 border-2 border-dashed border-brand-300 rounded-2xl flex items-center justify-center text-brand-600">
                  <QrCode className="w-8 h-8 animate-pulse" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Select an Urban Asset to Simulate Scan</h4>
                <p className="text-xs text-slate-500">
                  In production, scanning the physical QR plate instantly opens this screen with zero typing.
                </p>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-700">
                  Choose Asset Category:
                </label>
                <select
                  value={selectedAsset.id}
                  onChange={handleAssetChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {assetTypes.map((asset) => (
                    <option key={asset.id} value={asset.id}>
                      {asset.name} ({asset.sampleAsset.id} - {asset.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Sample Asset ID:</span>
                  <span className="font-mono font-bold text-slate-800">{selectedAsset.sampleAsset.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Verified Location:</span>
                  <span className="font-medium text-slate-800 text-right">{selectedAsset.sampleAsset.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Responsible Dept:</span>
                  <span className="font-medium text-brand-700">{selectedAsset.sampleAsset.department}</span>
                </div>
              </div>

              <button
                onClick={() => setReportStage('inspect')}
                className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>Simulate Camera QR Scan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {reportStage === 'inspect' && (
            <div className="space-y-5">
              {/* Asset Badge */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold font-mono text-slate-900">{selectedAsset.sampleAsset.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      GPS LOCKED
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center mt-0.5">
                    <MapPin className="w-3 h-3 mr-1 text-slate-400" />
                    {selectedAsset.sampleAsset.location}
                  </p>
                </div>
                <span className="text-xs font-semibold text-brand-700 bg-brand-50 px-2 py-1 rounded">
                  {selectedAsset.name}
                </span>
              </div>

              {/* Deduplication Shield Notice */}
              {isDuplicateFlow && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span className="text-xs font-bold text-amber-900">Active Incident Already Reported</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded">
                      PRIORITY 1
                    </span>
                  </div>

                  <p className="text-xs text-amber-800">
                    "Critical failure reported: {selectedAsset.commonIssues[0]}."
                  </p>

                  <div className="flex items-center justify-between text-xs text-amber-900 pt-1">
                    <span className="flex items-center font-semibold">
                      <Flame className="w-3.5 h-3.5 mr-1 text-orange-600" />
                      {confirmedCount} citizens confirmed this
                    </span>
                    <span className="text-emerald-700 font-medium">Crew in Transit</span>
                  </div>

                  <button
                    onClick={handleConfirmExisting}
                    disabled={hasConfirmed}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                      hasConfirmed
                        ? 'bg-emerald-600 text-white cursor-default'
                        : 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm'
                    }`}
                  >
                    {hasConfirmed ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>You confirmed this! SMS alerts active.</span>
                      </>
                    ) : (
                      <>
                        <ThumbsUp className="w-4 h-4" />
                        <span>I'm also facing this issue (+1 Confirm)</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Form to submit custom report */}
              <form onSubmit={handleSubmitNewReport} className="space-y-4 pt-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-700">
                    Or Report a Specific New Problem:
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsDuplicateFlow(!isDuplicateFlow)}
                    className="text-[11px] text-brand-600 hover:underline"
                  >
                    {isDuplicateFlow ? 'Hide duplicate alert' : 'Show duplicate alert'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {selectedAsset.commonIssues.map((issue, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setSelectedIssue(issue)}
                      className={`p-2 rounded-lg text-left text-xs font-medium border transition-all ${
                        selectedIssue === issue
                          ? 'border-brand-500 bg-brand-50 text-brand-900 ring-1 ring-brand-500'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      {issue}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Optional Details / Landmark Notes:
                  </label>
                  <textarea
                    rows={2}
                    value={customComment}
                    onChange={(e) => setCustomComment(e.target.value)}
                    placeholder="e.g. Near corner grocery store..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Verified Civic Report</span>
                </button>
              </form>
            </div>
          )}

          {reportStage === 'success' && (
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 mx-auto bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 border border-emerald-200 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-lg font-bold text-slate-900">Report Successfully Lodged!</h4>
                <p className="text-xs text-slate-500">
                  Dispatched directly to <strong className="text-slate-800">{selectedAsset.sampleAsset.department}</strong>.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Tracking Reference:</span>
                  <span className="font-mono font-bold text-brand-700">{generatedTicketId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Asset:</span>
                  <span className="font-medium text-slate-800">{selectedAsset.sampleAsset.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Issue Category:</span>
                  <span className="font-medium text-slate-800">{selectedIssue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Resolution:</span>
                  <span className="font-semibold text-emerald-700">Within 4 Hours (SLA Active)</span>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => setReportStage('scan')}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold"
                >
                  Scan Another Asset
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
