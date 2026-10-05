import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Building2, Lock, Mail, ShieldCheck, ArrowRight, UserCheck, CheckCircle2, Wrench } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('officer');
  const [email, setEmail] = useState('officer.ward12@mbmc.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loggedInSuccess, setLoggedInSuccess] = useState(false);

  if (!isOpen) return null;

  const roles = [
    { id: 'officer', name: 'Ward Officer', badge: 'Triage & SLA Approval' },
    { id: 'technician', name: 'Field Crew', badge: 'On-Site Fix & GPS Photo' },
    { id: 'admin', name: 'City Commissioner', badge: 'Citywide Analytics & GIS' },
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    if (roleId === 'officer') setEmail('officer.ward12@mbmc.gov.in');
    if (roleId === 'technician') setEmail('field.crew04@mbmc.gov.in');
    if (roleId === 'admin') setEmail('commissioner.hq@mbmc.gov.in');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      setLoggedInSuccess(true);
    }, 600);
  };

  const handleEnterConsole = () => {
    setLoggedInSuccess(false);
    onClose();
    if (selectedRole === 'technician') {
      navigate('/worker');
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center text-white">
              {selectedRole === 'technician' ? <Wrench className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-sm font-bold">
                {selectedRole === 'technician' ? 'Field Crew Terminal Login' : 'Municipal Operations Portal'}
              </h3>
              <p className="text-[11px] text-slate-400">Urban Governance & Field Dispatch</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {loggedInSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 mx-auto bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 border border-emerald-200">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Municipal Session Authenticated</h4>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedRole === 'technician' ? (
                    <span>Logged in as <strong>Rajesh Sharma (Lead Tech, Van #04)</strong>.</span>
                  ) : (
                    <span>Connected to Ward 12 Triage Console as <strong>Officer S. Kulkarni</strong>.</span>
                  )}
                </p>
              </div>
              
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={handleEnterConsole}
                  className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md flex items-center justify-center space-x-2 transition-all"
                >
                  <span>
                    {selectedRole === 'technician' ? 'Launch Field Worker Terminal' : 'Launch Municipal Officer Dashboard'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setLoggedInSuccess(false);
                    onClose();
                  }}
                  className="w-full py-2 text-slate-500 hover:text-slate-700 text-xs font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Select Role Persona (Demo Mode):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {roles.map((r) => (
                    <button
                      type="button"
                      key={r.id}
                      onClick={() => handleRoleSelect(r.id)}
                      className={`p-2 rounded-xl text-center border transition-all text-xs ${
                        selectedRole === r.id
                          ? 'border-brand-500 bg-brand-50/80 text-brand-900 font-bold ring-1 ring-brand-500'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                      }`}
                    >
                      <div className="font-semibold truncate">{r.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Official Gov ID / Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Secure Password / Security Key
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Gov-grade 2FA and Biometric Geo-fencing enforced on production terminals.</span>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
              >
                {isLoggingIn ? (
                  <span>Authenticating Gov Credentials...</span>
                ) : (
                  <>
                    <span>Sign In to Console</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
