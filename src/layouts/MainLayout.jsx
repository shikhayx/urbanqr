import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout({ children, onOpenScanModal, onOpenLoginModal }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-brand-500 selection:text-white">
      <Navbar onOpenScanModal={onOpenScanModal} onOpenLoginModal={onOpenLoginModal} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
