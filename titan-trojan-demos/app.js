/**
 * TITAN TROJAN HORSE NICHE DEMOS - JAVASCRIPT ENGINE
 * Manages 3 Niche Pre-Built Apps + Live Client Personalization
 */

let activeClientName = "Acme Health Group";

document.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  setupPersonalizer();
});

function setupTabs() {
  const tabBtns = document.querySelectorAll(".demo-tab-btn");
  const panels = document.querySelectorAll(".demo-panel");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const target = btn.getAttribute("data-target");
      const activePanel = document.getElementById(target);
      if (activePanel) activePanel.classList.add("active");
    });
  });
}

function setupPersonalizer() {
  const clientInput = document.getElementById("target-client-input");
  if (!clientInput) return;

  clientInput.addEventListener("input", (e) => {
    activeClientName = e.target.value || "Your Company";
    updateClientLabels();
  });
  updateClientLabels();
}

function updateClientLabels() {
  document.querySelectorAll(".client-placeholder").forEach(el => {
    el.textContent = activeClientName;
  });

  // Update pitch email preview
  const pitchClinical = document.getElementById("pitch-clinical");
  if (pitchClinical) {
    pitchClinical.textContent = `Subject: Automated patient matching prototype for ${activeClientName}\n\nHi Dr. Smith,\n\nNoticed ${activeClientName} is recruiting for Phase II trials. We built a live FDA 21 CFR Part 11 compliant matching portal for you in 15 mins:\n[Link: ${activeClientName.toLowerCase().replace(/\\s+/g, '-')}-trials.surge.sh]\n\nWorth a quick look?`;
  }

  const pitchChargeback = document.getElementById("pitch-chargeback");
  if (pitchChargeback) {
    pitchChargeback.textContent = `Subject: Recovering disputed chargebacks for ${activeClientName}\n\nHi Finance Team,\n\nSaw ${activeClientName}'s high e-commerce volume. We set up an autonomous Stripe dispute evidence engine that auto-wins 82% of chargebacks in <2 seconds:\n[Link: ${activeClientName.toLowerCase().replace(/\\s+/g, '-')}-dispute.surge.sh]\n\nCan I show you how to save $14,000/mo?`;
  }
}

// Interactive Demo Action 1: Clinical Match
window.simulatePatientMatch = function() {
  const matchBtn = document.getElementById("match-action-btn");
  const matchOutput = document.getElementById("match-result-output");
  if (!matchBtn || !matchOutput) return;

  matchBtn.textContent = "Matching via Titan AI...";
  matchBtn.disabled = true;

  setTimeout(() => {
    matchOutput.innerHTML = `
      <div style="background: rgba(16,185,129,0.1); border: 1px solid var(--accent-emerald); padding: 14px; border-radius: 10px; margin-top: 14px;">
        <div style="font-weight: 700; color: var(--accent-emerald); margin-bottom: 4px;">✓ 3 Eligible Patients Matched Instantly</div>
        <div style="font-size: 13px; color: var(--text-main);">Inclusion Criteria: Biomarker EGFR L858R (+) • Age: 18-65 • eGFR > 60 mL/min.</div>
        <div style="font-size: 11px; font-family: var(--font-mono); color: var(--text-dim); margin-top: 4px;">Audit Hash: SHA-256 (FDA 21 CFR Part 11 Validated)</div>
      </div>
    `;
    matchBtn.textContent = "Run Patient Matching Algorithm";
    matchBtn.disabled = false;
  }, 350);
};

// Interactive Demo Action 2: Auto-Defend Chargeback
window.simulateChargebackDefense = function(txId) {
  const card = document.getElementById(`dispute-${txId}`);
  if (!card) return;

  card.innerHTML = `
    <td><strong>${txId}</strong></td>
    <td>$450.00</td>
    <td><span class="status-pill match">✓ DISPUTE WON (100% EVIDENCE PACKED)</span></td>
    <td><button class="btn-action" style="background: rgba(255,255,255,0.1); color: #fff;" disabled>Evidence Submitted</button></td>
  `;
};

// Interactive Demo Action 3: Disburse Milestone Escrow
window.simulateEscrowRelease = function(milestoneId) {
  const row = document.getElementById(`escrow-${milestoneId}`);
  if (!row) return;

  row.innerHTML = `
    <td><strong>${milestoneId}</strong></td>
    <td>$25,000.00</td>
    <td><span class="status-pill match">✓ FUNDS RELEASED TO SELLER</span></td>
    <td><span style="font-size: 12px; color: var(--accent-emerald); font-family: var(--font-mono);">TX_0x89F4...21A</span></td>
  `;
};
