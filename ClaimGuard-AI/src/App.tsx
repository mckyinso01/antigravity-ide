import React, { useState, useEffect } from 'react';
import './tokens/designSystem.css';
import { Topbar } from './components/layout/Topbar';
import { AttorneySlideDrawer } from './components/layout/AttorneySlideDrawer';
import { ClaimsLedgerGrid } from './components/claims/ClaimsLedgerGrid';
import { DevilsMootCourtModal } from './components/moot-court/DevilsMootCourtModal';
import { SaccadeMultiViewComparator } from './components/agentic-tools/SaccadeMultiViewComparator';
import { DocumentPanZoomCanvas } from './components/document-studio/DocumentPanZoomCanvas';
import { ScannerBridgeModal } from './components/hardware-telecom/ScannerBridgeModal';
import { EFaxDispatcherModal } from './components/hardware-telecom/EFaxDispatcherModal';
import { PromptPayInterestCalculator } from './components/hardware-telecom/PromptPayInterestCalculator';
import { PricingGapReportModal } from './components/pricing-gap/PricingGapReportModal';
import { BuyoutEscrowModal } from './components/pricing-gap/BuyoutEscrowModal';
import { ProblemDestructionGrid } from './components/problem-destruction/ProblemDestructionGrid';
import { FrictionlessUxShowcase } from './components/problem-destruction/FrictionlessUxShowcase';
import { EdgeCasesVaultDirectory } from './components/problem-destruction/EdgeCasesVaultDirectory';
import { VendorArchetypeDiagnostic } from './components/vendor-diagnostic/VendorArchetypeDiagnostic';
import { FounderFleetCommandHub } from './components/master-telemetry/FounderFleetCommandHub';
import { CaseStudy, EDGE_CASE_STUDIES } from './engine/edgeCaseStudiesData';

import { LoginGateway } from './components/auth/LoginGateway';
import { AuthUser } from './components/layout/Topbar';
import { DocumentIngestionDrawer } from './components/document-studio/DocumentIngestionDrawer';
import { UniversalClaimsMigrationModal } from './components/claims/UniversalClaimsMigrationModal';
import { ErisaPenaltyInterestClockModal } from './components/claims/ErisaPenaltyInterestClockModal';
import { useUrlProspectSession } from './hooks/useUrlTabNavigation';
import { ExitSurveyModal } from './components/ExitSurveyModal';
import { useEnterpriseTrial } from './hooks/useEnterpriseTrial';
import { TrialExpiryCoDesignModal } from './components/TrialExpiryCoDesignModal';
import { codeIntegrityGuardian } from './utils/codeIntegrityGuardian';

export const App: React.FC = () => {
  // Authentication State (Pre-configured demo or authenticated hospital specialist)
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('claimguard_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  // Dynamic Cases Defense Queue State
  const [casesList, setCasesList] = useState<CaseStudy[]>(EDGE_CASE_STUDIES);

  // Theme & Display Controls
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [jurisdiction, setJurisdiction] = useState<'US' | 'UK'>('US');

  // Selected Case & Modals State
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(EDGE_CASE_STUDIES[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isIngestionOpen, setIsIngestionOpen] = useState(false);
  const [isMootCourtOpen, setIsMootCourtOpen] = useState(false);
  const [isSaccadeOpen, setIsSaccadeOpen] = useState(false);
  const [isDocStudioOpen, setIsDocStudioOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isEFaxOpen, setIsEFaxOpen] = useState(false);
  const [isPromptPayOpen, setIsPromptPayOpen] = useState(false);
  const [isPricingGapOpen, setIsPricingGapOpen] = useState(false);
  const [isFleetHubOpen, setIsFleetHubOpen] = useState(false);
  const [isEscrowOpen, setIsEscrowOpen] = useState(false);
  const [escrowTier, setEscrowTier] = useState<string>('Tier 1: Departmental Workstation');
  const [escrowPrice, setEscrowPrice] = useState<number>(18500);
  const [isExitSurveyOpen, setIsExitSurveyOpen] = useState(false);
  const [isErisaClockOpen, setIsErisaClockOpen] = useState(false);
  const prospectSession = useUrlProspectSession('healthcare_legal');

  // 7-Day Reverse Enterprise Trial Engine & Code Guardian
  const { daysRemaining, isExpired, isUnlockedPerpetual, requestExtension } = useEnterpriseTrial();
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);

  useEffect(() => {
    codeIntegrityGuardian.initialize();
  }, []);

  useEffect(() => {
    if (isExpired) {
      setIsTrialModalOpen(true);
    }
  }, [isExpired]);

  // 1. Exit-Intent Mouseleave Trigger
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !sessionStorage.getItem('claimguard_survey_shown')) {
        setIsExitSurveyOpen(true);
        sessionStorage.setItem('claimguard_survey_shown', 'true');
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  // 2. Modal Browser Back-Button Trapping
  useEffect(() => {
    const isAnyModalOpen = Boolean(
      isDrawerOpen || isIngestionOpen || isMootCourtOpen || isSaccadeOpen ||
      isDocStudioOpen || isScannerOpen || isEFaxOpen || isPromptPayOpen ||
      isPricingGapOpen || isFleetHubOpen || isEscrowOpen || isExitSurveyOpen
    );
    if (isAnyModalOpen) {
      window.history.pushState({ modalOpen: true }, '');
      const handleModalPop = () => {
        setIsDrawerOpen(false);
        setIsIngestionOpen(false);
        setIsMootCourtOpen(false);
        setIsSaccadeOpen(false);
        setIsDocStudioOpen(false);
        setIsScannerOpen(false);
        setIsEFaxOpen(false);
        setIsPromptPayOpen(false);
        setIsPricingGapOpen(false);
        setIsFleetHubOpen(false);
        setIsEscrowOpen(false);
        setIsExitSurveyOpen(false);
      };
      window.addEventListener('popstate', handleModalPop, { once: true });
      return () => window.removeEventListener('popstate', handleModalPop);
    }
  }, [
    isDrawerOpen, isIngestionOpen, isMootCourtOpen, isSaccadeOpen,
    isDocStudioOpen, isScannerOpen, isEFaxOpen, isPromptPayOpen,
    isPricingGapOpen, isFleetHubOpen, isEscrowOpen, isExitSurveyOpen
  ]);

  const handleAddNewCase = (newCase: CaseStudy) => {
    setCasesList(prev => [newCase, ...prev]);
    setSelectedCase(newCase);
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.setProperty('--app-brightness', `${brightness}%`);
    document.documentElement.style.setProperty('--app-contrast', `${contrast}%`);
  }, [theme, brightness, contrast]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleOpenCase = (c: CaseStudy) => {
    setSelectedCase(c);
    setIsDrawerOpen(true);
  };

  const handleOpenEscrow = (tier: string, price: number) => {
    setEscrowTier(tier);
    setEscrowPrice(price);
    setIsEscrowOpen(true);
    setIsPricingGapOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('claimguard_auth_user');
    setAuthUser(null);
  };

  if (!authUser) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-app)' }}>
        <LoginGateway onLoginSuccess={(user) => setAuthUser(user)} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-app)' }}>
      {/* Universal Topbar */}
      <Topbar
        currentTheme={theme}
        toggleTheme={toggleTheme}
        brightness={brightness}
        setBrightness={setBrightness}
        contrast={contrast}
        setContrast={setContrast}
        currentJurisdiction={jurisdiction}
        setJurisdiction={setJurisdiction}
        onOpenMootCourt={() => setIsMootCourtOpen(true)}
        onOpenScanner={() => setIsScannerOpen(true)}
        onOpenEFax={() => setIsEFaxOpen(true)}
        onOpenPricingGap={() => setIsPricingGapOpen(true)}
        onOpenFleetHub={() => setIsFleetHubOpen(true)}
        onOpenPromptPay={() => setIsPromptPayOpen(true)}
        onOpenIngestion={() => setIsIngestionOpen(true)}
        onOpenErisaClock={() => setIsErisaClockOpen(true)}
        authUser={authUser}
        onLogout={handleLogout}
        onOpenExitSurvey={() => setIsExitSurveyOpen(true)}
        trialDaysRemaining={daysRemaining}
        isUnlockedPerpetual={isUnlockedPerpetual}
        onOpenTrialModal={() => setIsTrialModalOpen(true)}
      />

      {/* Main Workspace Body */}
      <main style={{
        flex: 1,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        maxWidth: '1600px',
        margin: '0 auto',
        width: '100%'
      }}>
        <h1 className="sr-only">ClaimGuard AI — Pre-Submission Adversarial Healthcare Claims Defense Engine</h1>

        {/* Master Claims Defense Queue */}
        <ClaimsLedgerGrid
          onSelectCase={handleOpenCase}
          selectedCaseId={selectedCase?.id}
          cases={casesList}
          onOpenIngestion={() => setIsIngestionOpen(true)}
        />

        {/* The 50 Real-World Edge Cases Directory & Alternate Reality Simulator */}
        <EdgeCasesVaultDirectory
          onSelectCase={handleOpenCase}
          onOpenMootCourt={(c) => { setSelectedCase(c); setIsMootCourtOpen(true); }}
          onOpenDocStudio={(c) => { setSelectedCase(c); setIsDocStudioOpen(true); }}
        />

        {/* Problem-Destruction Architecture Grid */}
        <ProblemDestructionGrid />

        {/* Anti-Burnout Frictionless UX Showcase */}
        <FrictionlessUxShowcase />

        {/* Vendor Archetype Diagnostic */}
        <VendorArchetypeDiagnostic />
      </main>

      {/* Universal 1-Click Epic, EDI 835 & Optum Migration Modal */}
      <UniversalClaimsMigrationModal
        isOpen={isIngestionOpen}
        onClose={() => setIsIngestionOpen(false)}
      />

      {/* Non-Modal Document Ingestion & Pre-Submission Scanner Drawer */}
      <DocumentIngestionDrawer
        isOpen={false}
        onClose={() => {}}
        onAddNewCase={handleAddNewCase}
      />

      {/* Non-Modal Attorney Slide Drawer (Zero Blur / Context Preserving) */}
      <AttorneySlideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        selectedCase={selectedCase}
        onOpenMootCourt={(c) => { setIsDrawerOpen(false); setIsMootCourtOpen(true); }}
        onOpenSaccade={(c) => { setIsDrawerOpen(false); setIsSaccadeOpen(true); }}
        onOpenDocStudio={(c) => { setIsDrawerOpen(false); setIsDocStudioOpen(true); }}
      />

      {/* Modals Suite */}
      <DevilsMootCourtModal
        isOpen={isMootCourtOpen}
        onClose={() => setIsMootCourtOpen(false)}
        caseStudy={selectedCase}
      />

      <SaccadeMultiViewComparator
        isOpen={isSaccadeOpen}
        onClose={() => setIsSaccadeOpen(false)}
        caseStudy={selectedCase}
      />

      <DocumentPanZoomCanvas
        isOpen={isDocStudioOpen}
        onClose={() => setIsDocStudioOpen(false)}
        caseStudy={selectedCase}
      />

      <ScannerBridgeModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
      />

      <EFaxDispatcherModal
        isOpen={isEFaxOpen}
        onClose={() => setIsEFaxOpen(false)}
      />

      <PromptPayInterestCalculator
        isOpen={isPromptPayOpen}
        onClose={() => setIsPromptPayOpen(false)}
      />

      <PricingGapReportModal
        isOpen={isPricingGapOpen}
        onClose={() => setIsPricingGapOpen(false)}
        onOpenEscrow={handleOpenEscrow}
      />

      <BuyoutEscrowModal
        isOpen={isEscrowOpen}
        onClose={() => setIsEscrowOpen(false)}
        tierName={escrowTier}
        price={escrowPrice}
      />

      <FounderFleetCommandHub
        isOpen={isFleetHubOpen}
        onClose={() => setIsFleetHubOpen(false)}
      />

      {/* 📋 Exit-Intent & Walkthrough Micro-Survey Modal */}
      <ExitSurveyModal
        isOpen={isExitSurveyOpen}
        onClose={() => setIsExitSurveyOpen(false)}
        prospectSession={prospectSession}
        appName="ClaimGuard AI Legal Defense OS"
      />

      {/* ⏳ 7-Day Product-Led Reverse Trial & Co-Design Modal */}
      <TrialExpiryCoDesignModal
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
        daysRemaining={daysRemaining}
        isExpired={isExpired}
        onRequestExtension={requestExtension}
        onOpenLicensingModal={() => setIsPricingGapOpen(true)}
      />

      {/* ⚖️ Statutory ERISA § 502(a)(1)(B) 18% Penalty Clock & 15% Escrow Split */}
      <ErisaPenaltyInterestClockModal
        isOpen={isErisaClockOpen}
        onClose={() => setIsErisaClockOpen(false)}
      />

      {/* Sovereign Footer */}
      <footer style={{
        padding: '24px',
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface-elevated)',
        textAlign: 'center',
        fontSize: '12px',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '6px' }}>
          <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>ClaimGuard AI Enterprise</span>
          <span>•</span>
          <span>LinkableAI Master Fleet Hub</span>
          <span>•</span>
          <span style={{ color: 'var(--status-emerald)', fontWeight: 700 }}>100% Perpetual Sovereign License</span>
        </div>
        <p>
          Protected under ERISA § 502(a)(1)(B), 42 CFR § 412.3, CMS-0057-F, and Federal No Surprises Act statutory frameworks.
        </p>
      </footer>
    </div>
  );
};
