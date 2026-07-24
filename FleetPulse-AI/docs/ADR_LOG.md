# 📜 Architecture Decision Record (ADR) Log — FleetPulse-AI

## ADR-0001: Adoption of Theme 4 Nordic Slate & Glacial Frost UI Architecture
- **Status:** Approved
- **Context:** The target employer (Apex Freight Logistics) requires high data density for monitoring 450 heavy trucks without visual clutter or eye strain.
- **Decision:** Adopt Theme 4 (Nordic Slate & Glacial Frost) with `#F1F5F9` canvas, `#0D9488` teal accents, and `#0F172A` text, guaranteeing a 14.1:1 WCAG AAA text contrast ratio.

## ADR-0002: Level 1–3 Slide-Over Drawer Hierarchy for Zero Context Switching
- **Status:** Approved
- **Context:** Fleet supervisors need to inspect vehicle details and DTC engine codes without navigating away from the live 450-vehicle telematics grid.
- **Decision:** Implement Level 2 Slide Drawer (`DriverInspectionDrawer`) and Level 3 Leaf Drawer (`VehicleDetailLeafDrawer`) with breadcrumb history, allowing 3-layer deep inspection in sub-50ms.

## ADR-0003: 4-Tier Commercial Licensing & 3-Step Sanitization Engine
- **Status:** Approved
- **Context:** Software Factory Section 8 mandates 4 commercial license models and automated state purging.
- **Decision:** Wire `<SelfHostProvisioningModal />`, `<WhiteLabelCustomizerModal />`, and `<SourceCodeLicenseModal />` with 1-click `purgeClientState()` engine.
