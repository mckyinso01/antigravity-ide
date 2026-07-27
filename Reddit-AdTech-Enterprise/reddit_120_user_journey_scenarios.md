# Stage 4: 120 Exhaustive User Journey Scenarios — Reddit AdTech Enterprise

> 📍 **WORKFLOW TELEMETRY**: `[STAGE 4: 120 USER JOURNEY SCENARIOS — 🟢 COMPLETED]`  
> **Structure**: 30 Scenarios per Component across 4 Core Components = 120 Total Scenarios  

---

## 📊 Component 1: `<AdRankingStreamConsole />` (30 Scenarios)

1. **TC-AD-001**: User opens telemetry console ➔ System connects live web-socket auction feed ➔ Displays live eCPM rates & post rankings.
2. **TC-AD-002**: User filters stream by subreddit (`r/technology`) ➔ Feed filters in <5ms ➔ Shows technology ad auctions only.
3. **TC-AD-003**: User clicks "Pause Stream" ➔ Telemetry updates pause ➔ Yellow "Stream Paused" badge displays.
4. **TC-AD-004**: User clicks "Resume Stream" ➔ Telemetry resumes receiving auction payloads ➔ Green "Stream Active" badge animates.
5. **TC-AD-005**: User searches bid ID `BID-8891` ➔ System highlights matching auction row ➔ Displays winning advertiser.
6. **TC-AD-006**: User presses `Backspace` in bid search field ➔ Search string clears instantly ➔ Full stream restores.
7. **TC-AD-007**: User presses `Ctrl+K` ➔ Global Command Palette opens ➔ Cursor focuses on command search input.
8. **TC-AD-008**: User selects "Sort by Highest eCPM" ➔ Stream re-orders descending by eCPM value ($45.20 -> $1.20).
9. **TC-AD-009**: User selects "Sort by Auction Latency" ➔ Stream re-orders by processing speed (1.2ms -> 18.5ms).
10. **TC-AD-010**: User clicks "Export Live Stream (.json)" ➔ Browser triggers `.json` file download of active auction telemetry.
11. **TC-AD-011**: User toggles "Low Win Rate Alert" ➔ System highlights auctions where win rate fell below 50%.
12. **TC-AD-012**: User hovers over eCPM pill ➔ Tooltip displays historical 24h eCPM trend graph.
13. **TC-AD-013**: Network disconnect occurs ➔ System displays red "Reconnecting Stream..." banner ➔ Retries connection automatically.
14. **TC-AD-014**: Network reconnects ➔ Green toast notification pops up ("Telemetry Stream Restored") ➔ Banner clears.
15. **TC-AD-015**: User filters by campaign budget status ➔ Shows "Active", "Pacing Warning", and "Exhausted" filters.
16. **TC-AD-016**: User clicks on advertiser name `AcmeCorp` ➔ Slide-over modal opens with AcmeCorp campaign details.
17. **TC-AD-017**: User changes stream density to "Compact" ➔ Table row padding shrinks from `p-4` to `p-2` for high-density monitors.
18. **TC-AD-018**: User changes stream density to "Spacious" ➔ Table expands with full metadata preview.
19. **TC-AD-019**: User clicks "Clear Stream Logs" ➔ Console clears live buffer ➔ Displays "Buffer Cleared".
20. **TC-AD-020**: User inputs invalid regex in search bar ➔ System displays graceful inline error without breaking UI.
21. **TC-AD-021**: User selects multi-country filter (US, UK, CA, AU) ➔ Stream updates showing country-specific bids.
22. **TC-AD-022**: User toggles "High-eCPM Priority Mode" ➔ System pins bids > $30.00 to top of feed.
23. **TC-AD-023**: User clicks "Copy Stream Frame" ➔ Active JSON payload copied to clipboard ➔ Toast notification confirms copy.
24. **TC-AD-024**: User switches browser tabs ➔ Telemetry pauses background rendering to conserve GPU resources.
25. **TC-AD-025**: User returns to browser tab ➔ Telemetry catches up buffer seamlessly.
26. **TC-AD-026**: User sets minimum bid threshold slider to $5.00 ➔ Auctions below $5.00 are hidden.
27. **TC-AD-027**: User adjusts refresh rate from 100ms to 1,000ms ➔ Stream update frequency slows down.
28. **TC-AD-028**: User clicks "Pin Auction Row" ➔ Selected row remains pinned to top during stream updates.
29. **TC-AD-029**: User unpins row ➔ Row returns to natural chronological position.
30. **TC-AD-030**: User double-clicks auction row ➔ Expands full JSON payload in slide-over code viewer.

---

## 📈 Component 2: `<MLLatencyHistogram />` (30 Scenarios)

31. **TC-LAT-001**: User navigates to Latency Histogram view ➔ System renders sub-millisecond distribution graph.
32. **TC-LAT-002**: User toggles node pool filter to "GPU Cluster Alpha" ➔ Histogram updates with GPU-only latency curve.
33. **TC-LAT-003**: User toggles node pool filter to "CPU Fallback Nodes" ➔ Histogram updates showing higher latency tail (15ms-25ms).
34. **TC-LAT-004**: User hovers over p95 bar ➔ Tooltip displays exact p95 latency (`3.42ms`) and sample count (`1,420,000`).
35. **TC-LAT-005**: User hovers over p99 bar ➔ Tooltip displays p99 latency (`8.15ms`) and bottleneck cluster name.
36. **TC-LAT-006**: User sets p99 alert threshold to 10.0ms ➔ System displays green "SLO Compliant" status badge.
37. **TC-LAT-007**: User sets p99 alert threshold to 2.0ms ➔ System displays red "SLO Violation Warning" alert banner.
38. **TC-LAT-008**: User selects time range "Last 1 Hour" ➔ Graph updates displaying 60-minute latency trend.
39. **TC-LAT-009**: User selects time range "Last 24 Hours" ➔ Graph aggregates data into 15-minute buckets.
40. **TC-LAT-010**: User clicks "Simulate Latency Spike" ➔ Histogram injects a 45ms outlier peak ➔ Alert sentinel fires.
41. **TC-LAT-011**: User clicks "Self-Healing Load Rebalance" ➔ Traffic shifts to GPU Cluster Beta ➔ Latency normalizes <5ms.
42. **TC-LAT-012**: User exports latency metrics as CSV ➔ Browser downloads `reddit_ml_latency_report.csv`.
43. **TC-LAT-013**: User toggles percentiles display (p50/p90/p95/p99) ➔ Legend updates chart lines accordingly.
44. **TC-LAT-014**: User switches chart view from Bar Histogram to Cumulative Distribution Function (CDF) line chart.
45. **TC-LAT-015**: User clicks "Compare GPU vs CPU" ➔ Overlay graph displays dual latency curves for side-by-side analysis.
46. **TC-LAT-016**: User clicks on latency spike bar ➔ Displays breakdown of transformer layers causing inference delay.
47. **TC-LAT-017**: User sets auto-refresh to 5 seconds ➔ Graph smoothly transitions updates every 5s.
48. **TC-LAT-018**: User turns off auto-refresh ➔ Graph remains static with "Frozen Snapshot" badge.
49. **TC-LAT-019**: User clicks "Reset Latency Baselines" ➔ Restores default 10ms SLA baseline.
50. **TC-LAT-020**: User zooms into 0ms–5ms window ➔ Graph rescales x-axis to microsecond resolution.
51. **TC-LAT-021**: User resets zoom ➔ X-axis snaps back to full 0ms–50ms scale.
52. **TC-LAT-022**: User toggles "Show Cold Start Spikes" ➔ Highlights initial model load latency anomalies.
53. **TC-LAT-023**: User selects model version `RankingModel-v4.2` ➔ Metrics update for specified model artifact.
54. **TC-LAT-024**: User selects model version `RankingModel-v4.3-Canary` ➔ Compares canary performance against v4.2.
55. **TC-LAT-025**: User clicks "Trigger Model Fallback" ➔ System routes traffic to lightweight heuristic ranking model.
56. **TC-LAT-026**: User hovers over memory utilization gauge ➔ Displays GPU VRAM usage (`18.4GB / 24.0GB`).
57. **TC-LAT-027**: User clicks "Download GPU Topology" ➔ Downloads node cluster JSON diagram.
58. **TC-LAT-028**: User resizes window to tablet screen (768px) ➔ Histogram resizes fluidly without x-axis truncation.
59. **TC-LAT-029**: User resizes window to mobile (375px) ➔ Histogram collapses to summary metric cards with expandable chart drawer.
60. **TC-LAT-030**: User clicks "Copy Latency SLA Certificate" ➔ RSA-signed SLA compliance certificate copied to clipboard.

---

## 🎛️ Component 3: `<CampaignBudgetOptimizerModal />` (30 Scenarios)

61. **TC-OPT-001**: User clicks "Open Campaign Budget Optimizer" ➔ Slide-over right drawer opens smoothly.
62. **TC-OPT-002**: User adjusts eCPM target slider from $10.00 to $25.00 ➔ Projected reach updates dynamically.
63. **TC-OPT-003**: User toggles "Accelerated Budget Pacing" ➔ Pacing mode badge changes to "Accelerated".
64. **TC-OPT-004**: User toggles "Even Pacing" ➔ Pacing mode updates to "Standard Even Distribution".
65. **TC-OPT-005**: User inputs daily budget `$50,000 USD` ➔ System calculates estimated hourly spend rate (`$2,083.33/hr`).
66. **TC-OPT-006**: User selects currency dropdown "EUR (€)" ➔ All budget figures convert using live FX rate ($1 = €0.92).
67. **TC-OPT-007**: User selects currency dropdown "GBP (£)" ➔ Figures convert ($1 = £0.78).
68. **TC-OPT-008**: User selects currency dropdown "JPY (¥)" ➔ Figures convert ($1 = ¥155.40).
69. **TC-OPT-009**: User clicks "Apply Optimization Rules" ➔ Settings persist to `LocalStorage` ➔ Toast notification confirms save.
70. **TC-OPT-010**: User attempts to set negative budget (`-$500`) ➔ Form blocks submit with error "Budget must be greater than $0".
71. **TC-OPT-011**: User sets eCPM floor higher than eCPM ceiling ➔ Form displays validation warning "Floor cannot exceed Ceiling".
72. **TC-OPT-012**: User clicks "Reset Default Budget Rules" ➔ Form resets to initial campaign parameters.
73. **TC-OPT-013**: User toggles "Auto-Stop on Low CTR" ➔ Campaign auto-pause rule activates when CTR < 0.5%.
74. **TC-OPT-014**: User sets maximum bid cap to $50.00 ➔ System caps max auction bids.
75. **TC-OPT-015**: User clicks "Simulate Campaign ROI" ➔ Displays 30-day projected conversion revenue graph.
76. **TC-OPT-016**: User closes modal via `Esc` key ➔ Drawer slides closed ➔ Focus returns to trigger button.
77. **TC-OPT-017**: User closes modal by clicking backdrop overlay ➔ Drawer closes cleanly.
78. **TC-OPT-018**: User closes modal by clicking "X" close button ➔ Drawer closes cleanly.
79. **TC-OPT-019**: User makes unsaved changes and attempts close ➔ System displays "Unsaved Changes" confirmation modal.
80. **TC-OPT-020**: User confirms "Discard Changes" ➔ Drawer closes and reverts state.
81. **TC-OPT-021**: User confirms "Save & Close" ➔ Drawer saves configuration and closes.
82. **TC-OPT-022**: User toggles "Dayparting Schedule" ➔ Displays 7-day hourly grid for peak traffic bidding.
83. **TC-OPT-023**: User selects hours 09:00–17:00 EST ➔ Bidding restricted to selected daytime hours.
84. **TC-OPT-024**: User clicks "Select All Peak Hours" ➔ All high-converting time slots selected.
85. **TC-OPT-025**: User inputs target impression goal `1,000,000` ➔ System calculates required bid competitiveness.
86. **TC-OPT-026**: User toggles "Subreddit Category Whitelist" ➔ Shows list of 10 primary subreddit groups.
87. **TC-OPT-027**: User selects `r/gaming` and `r/pcbuilding` ➔ Ad distribution limited to selected subreddits.
88. **TC-OPT-028**: User clicks "Export Optimization Config (.json)" ➔ Browser downloads JSON configuration file.
89. **TC-OPT-029**: User imports previous config JSON ➔ Form populates all fields automatically.
90. **TC-OPT-030**: User clicks "Lock Campaign Config" ➔ Locks controls against accidental clicks.

---

## 🛡️ Component 4: `<AdPolicyComplianceAuditor />` (30 Scenarios)

91. **TC-POL-001**: User opens Policy Auditor tab ➔ System loads ad creative copy scanner.
92. **TC-POL-002**: User pastes clean ad copy ➔ Scanner runs in <2.4ms ➔ Displays green "100% Policy Compliant" status.
93. **TC-POL-003**: User pastes copy containing forbidden keyword `"guaranteed 500% crypto returns"` ➔ Scanner flags violation on Line 2.
94. **TC-POL-004**: System displays red alert banner "Policy Violation: Deceptive Financial Returns Claim".
95. **TC-POL-005**: User clicks "Auto-Redact Violations" ➔ Forbidden text replaced with `[REDACTED_DECEPTIVE_CLAIM]`.
96. **TC-POL-006**: Scanner status updates to green "Compliant After Redaction".
97. **TC-POL-007**: User pastes code containing exposed AWS Key (`AKIAIOSFODNN7EXAMPLE`) ➔ Sub-10ms interceptor fires.
98. **TC-POL-008**: System displays critical security alert "EXPOSED AWS ACCESS KEY DETECTED".
99. **TC-POL-009**: User clicks "Redact Secret Keys" ➔ Key replaced with `[REDACTED_AWS_ACCESS_KEY]`.
100. **TC-POL-010**: Action recorded to SHA-256 audit ledger ➔ New block appended with valid hash.
101. **TC-POL-011**: User clicks "View Security Audit Trail Ledger" ➔ Expands live SHA-256 log chain.
102. **TC-POL-012**: User clicks "Test Tamper Simulation" ➔ Mutates Block #002 hash ➔ System displays red "CHAIN TAMPERED AT BLOCK #002".
103. **TC-POL-013**: User clicks "Self-Healing Restore Valid Chain" ➔ Recalculates hashes ➔ Restores green verified status.
104. **TC-POL-014**: User inputs banned domain link (`http://malicious-spam-site.xyz`) ➔ Scanner flags unsafe URL.
105. **TC-POL-015**: User clicks "Sanitize Links" ➔ Replaces malicious link with `[REDACTED_UNSAFE_URL]`.
106. **TC-POL-016**: User clicks "Download Signed Compliance Certificate (.txt)" ➔ Downloads RSA-signed legal audit record.
107. **TC-POL-017**: User uploads sample ad image ➔ System runs OCR text extraction on image payload.
108. **TC-POL-018**: OCR extracts text from image ➔ Scans extracted text for policy violations.
109. **TC-POL-019**: User clicks "Clear Scanner Textarea" ➔ Input clears and resets status.
110. **TC-POL-020**: User inputs 5,000-line large ad copy file ➔ Scanner completes audit in <8.5ms (within <10ms SLA).
111. **TC-POL-021**: User toggles policy rule set to "Reddit Advertising Policy 2026".
112. **TC-POL-022**: User toggles policy rule set to "EU AI Act Transparency Standards".
113. **TC-POL-023**: User clicks "Copy Redacted Text" ➔ Redacted text copied to clipboard.
114. **TC-POL-024**: User clicks "Audit Log History" ➔ Displays past 50 compliance scan results.
115. **TC-POL-025**: User filters audit logs by severity ("Critical", "Warning", "Info").
116. **TC-POL-026**: User clicks "Test Telemetry Error Sentinel" ➔ Dispatches test error payload to `mckinsyo01@gmail.com`.
117. **TC-POL-027**: Animated toast notification confirms sentinel alert dispatch.
118. **TC-POL-028**: User tests input clearability via `Backspace` ➔ Text clears cleanly without remaining artifacts.
119. **TC-POL-029**: User tests form submission via `Enter` key ➔ Triggers instant policy scan.
120. **TC-POL-030**: Final stage gate checklist verified ➔ 100% Zero-Defect compliance confirmed.
