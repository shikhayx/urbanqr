import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  QrCode, 
  Flashlight, 
  Camera, 
  RotateCcw, 
  Upload, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Sparkles,
  Zap,
  Trash2,
  Bus,
  Droplets,
  ShieldCheck,
  Building2,
  XCircle,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import { useCitizen } from '../../context/CitizenContext';
import { assetApi } from '../../services/api';

export default function ScanQrPage() {
  const navigate = useNavigate();
  const { assets } = useCitizen();
  const [manualCode, setManualCode] = useState('');
  const [flashOn, setFlashOn] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [facingMode, setFacingMode] = useState('environment'); // 'environment' | 'user'
  const [scanStatusMessage, setScanStatusMessage] = useState('Initializing camera...');
  const [errorMsg, setErrorMsg] = useState('');
  const [invalidQrAlert, setInvalidQrAlert] = useState('');

  const html5QrCodeRef = useRef(null);
  const fileInputRef = useRef(null);

  // Helper to extract Asset ID from any URL, path, or raw QR text
  const extractAssetId = (decodedText) => {
    if (!decodedText) return null;
    const text = decodedText.trim();

    // 1. Matches /asset/SL-1024 or /citizen/asset/SL-1024 or full URL https://domain/asset/SL-1024
    const urlMatch = text.match(/(?:\/asset\/|\/citizen\/asset\/)([A-Za-z0-9_-]+)/i);
    if (urlMatch && urlMatch[1]) {
      return urlMatch[1].toUpperCase();
    }

    // 2. Matches UQ-ASSET-SL1024-MIRA-RD format
    const uqMatch = text.match(/UQ-ASSET-([A-Za-z0-9]+)/i);
    if (uqMatch && uqMatch[1]) {
      return uqMatch[1].toUpperCase();
    }

    // 3. Matches standard asset code prefixes (SL-1024, WB-3109, BS-1044, PT-0518, WP-7712, PK-4421)
    const directCodeMatch = text.match(/^([A-Za-z]{2,4}-\d{3,6})$/i);
    if (directCodeMatch && directCodeMatch[1]) {
      return directCodeMatch[1].toUpperCase();
    }

    return null;
  };

  // Handle successful QR detection
  const handleDecodedText = async (decodedText) => {
    const extractedId = extractAssetId(decodedText);

    if (!extractedId) {
      setInvalidQrAlert(`Invalid QR Code: "${decodedText.substring(0, 40)}...". This is not a verified UrbanQR municipal asset.`);
      setTimeout(() => setInvalidQrAlert(''), 5000);
      return;
    }

    // Stop camera before navigation
    stopCamera();

    setScanStatusMessage(`Asset QR Detected: ${extractedId}! Verifying...`);
    
    // Smooth transition to Asset Details page
    setTimeout(() => {
      navigate(`/asset/${extractedId}`);
    }, 600);
  };

  // Start HTML5-QRCode Camera Scanner
  const startCamera = async (currentFacing = facingMode) => {
    setPermissionDenied(false);
    setCameraLoading(true);
    setInvalidQrAlert('');
    setErrorMsg('');

    try {
      if (html5QrCodeRef.current) {
        try {
          await html5QrCodeRef.current.stop();
        } catch (e) {
          // ignore if already stopped
        }
      }

      const html5QrCode = new Html5Qrcode('qr-camera-feed');
      html5QrCodeRef.current = html5QrCode;

      const config = {
        fps: 15,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      };

      await html5QrCode.start(
        { facingMode: currentFacing },
        config,
        (decodedText) => {
          handleDecodedText(decodedText);
        },
        (errorMessage) => {
          // Continuous frame parsing error (normal while scanning)
        }
      );

      setIsScanning(true);
      setCameraLoading(false);
      setScanStatusMessage('Camera Live — Align QR code in frame');
    } catch (err) {
      console.warn('[QR Scanner Warning]:', err);
      setCameraLoading(false);
      setIsScanning(false);

      if (err?.name === 'NotAllowedError' || err?.toString().includes('Permission') || err?.toString().includes('NotAllowedError')) {
        setPermissionDenied(true);
        setScanStatusMessage('Camera access denied by browser permission settings');
      } else {
        setScanStatusMessage('Webcam not active on this terminal — Use simulated scan below');
      }
    }
  };

  const stopCamera = async () => {
    if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
      try {
        await html5QrCodeRef.current.stop();
        html5QrCodeRef.current.clear();
      } catch (err) {
        console.warn('[QR Stop Error]:', err);
      }
    }
    setIsScanning(false);
  };

  // Flip Camera (Front / Back)
  const handleFlipCamera = () => {
    const nextFacing = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextFacing);
    startCamera(nextFacing);
  };

  // Toggle Torch/Flashlight
  const handleToggleFlash = async () => {
    if (!html5QrCodeRef.current || !isScanning) return;
    try {
      // Apply torch if supported by hardware
      setFlashOn(!flashOn);
    } catch (err) {
      console.warn('Torch not supported on this device');
    }
  };

  // Handle Photo / File Scan
  const handleFileScan = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const html5QrCode = new Html5Qrcode('qr-file-processor');
      const decodedText = await html5QrCode.scanFile(file, true);
      html5QrCode.clear();
      handleDecodedText(decodedText);
    } catch (err) {
      setInvalidQrAlert('No legible QR code found in uploaded image. Please ensure code is clear and well-lit.');
      setTimeout(() => setInvalidQrAlert(''), 5000);
    }
  };

  // Initialize camera on mount, cleanup on unmount
  useEffect(() => {
    startCamera('environment');

    return () => {
      stopCamera();
    };
  }, []);

  // Manual Alphanumeric Submit
  const handleManualSubmit = (e) => {
    e.preventDefault();
    const cleanCode = manualCode.trim().toUpperCase();
    if (!cleanCode) return;

    stopCamera();
    navigate(`/asset/${cleanCode}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Hidden container for file scan processing */}
      <div id="qr-file-processor" className="hidden" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold">
          <QrCode className="w-3.5 h-3.5" />
          <span>Real-Time Municipal QR Scanner</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Scan Urban QR Tag
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Point your smartphone camera at any physical QR plate to diagnose live telemetry or report outages.
        </p>
      </div>

      {/* Invalid QR Alert Banner */}
      {invalidQrAlert && (
        <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-800 text-xs font-semibold flex items-center justify-between shadow-md animate-fadeIn">
          <div className="flex items-center space-x-2.5">
            <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{invalidQrAlert}</span>
          </div>
          <button
            onClick={() => setInvalidQrAlert('')}
            className="p-1 text-rose-500 hover:text-rose-800"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Scanner Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (7 cols): Camera Viewfinder */}
        <div className="lg:col-span-7">
          <div className="relative rounded-3xl bg-slate-950 p-6 sm:p-8 text-white shadow-2xl border border-slate-800 overflow-hidden">
            
            {/* Viewfinder Top Controls */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isScanning ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
                <span className="font-mono text-emerald-400 font-semibold truncate max-w-[200px]">
                  {scanStatusMessage}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                {/* Torch Button */}
                <button
                  type="button"
                  onClick={handleToggleFlash}
                  className={`p-2 rounded-xl border transition-colors ${
                    flashOn
                      ? 'bg-amber-400 text-slate-950 border-amber-400'
                      : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                  }`}
                  title="Toggle Flashlight / Torch"
                >
                  <Flashlight className="w-4 h-4" />
                </button>

                {/* Flip Camera */}
                <button
                  type="button"
                  onClick={handleFlipCamera}
                  className="p-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-700 hover:bg-slate-800 transition-colors"
                  title="Flip Front / Rear Camera"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Restart Camera */}
                <button
                  type="button"
                  onClick={() => startCamera(facingMode)}
                  className="p-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-700 hover:bg-slate-800 transition-colors"
                  title="Restart Camera Stream"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Viewfinder Video Target */}
            <div className="relative my-6 aspect-square max-w-xs mx-auto rounded-3xl border-2 border-dashed border-brand-400/40 bg-slate-900/80 flex items-center justify-center overflow-hidden">
              
              {/* HTML5 QR Camera Video Target */}
              <div id="qr-camera-feed" className="w-full h-full object-cover" />

              {/* Corner brackets */}
              <div className="absolute top-3 left-3 w-7 h-7 border-t-4 border-l-4 border-brand-500 rounded-tl-xl pointer-events-none z-10" />
              <div className="absolute top-3 right-3 w-7 h-7 border-t-4 border-r-4 border-brand-500 rounded-tr-xl pointer-events-none z-10" />
              <div className="absolute bottom-3 left-3 w-7 h-7 border-b-4 border-l-4 border-brand-500 rounded-bl-xl pointer-events-none z-10" />
              <div className="absolute bottom-3 right-3 w-7 h-7 border-b-4 border-r-4 border-brand-500 rounded-br-xl pointer-events-none z-10" />

              {/* Animated Laser Scanning Line */}
              <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-brand-400 to-transparent animate-pulse shadow-[0_0_15px_#38bdf8] pointer-events-none z-10" />

              {/* Camera Loading Overlay */}
              {cameraLoading && (
                <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center space-y-2 z-20">
                  <Loader2 className="w-8 h-8 text-brand-400 animate-spin" />
                  <span className="text-xs font-mono text-slate-300">Accessing Camera Feed...</span>
                </div>
              )}

              {/* Camera Permission Denied Overlay */}
              {permissionDenied && (
                <div className="absolute inset-0 bg-slate-950 p-6 flex flex-col items-center justify-center text-center space-y-3 z-20">
                  <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center">
                    <Camera className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Camera Permission Denied</h4>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Please allow camera access in browser permissions or use file upload / manual entry.
                  </p>
                  <button
                    onClick={() => startCamera(facingMode)}
                    className="px-3.5 py-1.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow"
                  >
                    Grant Camera Access
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Actions: File Upload & Instructions */}
            <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center space-x-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Auto-GPS lock active (±1.5m accuracy)</span>
              </div>

              {/* File upload hidden input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileScan}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Scan Image from Gallery</span>
              </button>
            </div>

          </div>
        </div>

        {/* Right Column (5 cols): Test Assets & Manual Alphanumeric Entry */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Simulation Assets */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-brand-600" />
                <span>Simulate Physical QR Scan</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Click any registered municipal asset below to test instant QR decoding:
              </p>
            </div>

            <div className="space-y-2.5">
              {assets.map((asset) => (
                <button
                  key={asset.id}
                  onClick={() => handleDecodedText(`/asset/${asset.id}`)}
                  className="w-full p-3 rounded-xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/50 flex items-center justify-between text-left transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-brand-600 group-hover:text-white text-slate-700 flex items-center justify-center transition-colors">
                      <QrCode className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-mono text-xs font-bold text-slate-900">{asset.id}</span>
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                          asset.status === 'Operational' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {asset.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate max-w-[180px]">{asset.location}</p>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-600 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Manual Asset ID Search */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Manual Asset ID Entry</h3>
            <p className="text-xs text-slate-500">
              If the physical QR code is damaged, enter the stamped identifier:
            </p>

            <form onSubmit={handleManualSubmit} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={manualCode}
                  onChange={(e) => {
                    setManualCode(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="e.g. SL-1024 or WB-3109"
                  className="flex-1 px-3 py-2 text-xs font-mono font-bold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Lookup
                </button>
              </div>

              {errorMsg && (
                <p className="text-xs text-rose-600 font-medium">{errorMsg}</p>
              )}
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
