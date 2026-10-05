import React, { useState } from 'react';
import Hero from '../components/Hero';
import SmartAssets from '../components/SmartAssets';
import HowItWorks from '../components/HowItWorks';
import DuplicateDetection from '../components/DuplicateDetection';
import MunicipalityBenefits from '../components/MunicipalityBenefits';
import CtaSection from '../components/CtaSection';
import ScanModal from '../components/ScanModal';
import LoginModal from '../components/LoginModal';

export default function LandingPage({
  isScanModalOpen,
  setIsScanModalOpen,
  isLoginModalOpen,
  setIsLoginModalOpen
}) {
  const [preselectedAsset, setPreselectedAsset] = useState(null);

  const handleSelectAssetForScan = (asset) => {
    setPreselectedAsset(asset);
    setIsScanModalOpen(true);
  };

  return (
    <div>
      {/* 1. Hero Section */}
      <Hero
        onOpenScanModal={() => {
          setPreselectedAsset(null);
          setIsScanModalOpen(true);
        }}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
      />

      {/* 2. Smart Urban Assets Section */}
      <SmartAssets onSelectAssetForScan={handleSelectAssetForScan} />

      {/* 3. How It Works (4 Steps) */}
      <HowItWorks
        onOpenScanModal={() => {
          setPreselectedAsset(null);
          setIsScanModalOpen(true);
        }}
      />

      {/* 4. Duplicate Complaint Detection Section */}
      <DuplicateDetection />

      {/* 5. Municipality Benefits */}
      <MunicipalityBenefits />

      {/* 6. Final CTA Section */}
      <CtaSection
        onOpenScanModal={() => {
          setPreselectedAsset(null);
          setIsScanModalOpen(true);
        }}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
      />

      {/* Interactive Scan Simulator Modal */}
      <ScanModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        preselectedAsset={preselectedAsset}
      />

      {/* Municipal Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}
