const fs = require('fs');
const path = require('path');

// 1. SmartTooltip.tsx
const tooltipPath = path.join(__dirname, 'clinical-pristine', 'src', 'components', 'SmartTooltip.tsx');
let tooltip = fs.readFileSync(tooltipPath, 'utf8');
tooltip = tooltip.replace(
  'const timeoutRef = useRef<NodeJS.Timeout | null>(null);',
  'const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);'
);
fs.writeFileSync(tooltipPath, tooltip, 'utf8');
console.log('✅ Fixed SmartTooltip.tsx');

// 2. TrialExpiryCoDesignModal.tsx
const coDesignPath = path.join(__dirname, 'clinical-pristine', 'src', 'components', 'TrialExpiryCoDesignModal.tsx');
let coDesign = fs.readFileSync(coDesignPath, 'utf8');
coDesign = coDesign.replace(
  `import { 
  X, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Send, 
  CreditCard, 
  Download, 
  HelpCircle, 
  CheckCircle2, 
  Calendar,
  MessageSquareQuote
} from 'lucide-react';`,
  `import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  Send, 
  CreditCard, 
  Download, 
  Calendar,
  MessageSquareQuote
} from 'lucide-react';`
);
fs.writeFileSync(coDesignPath, coDesign, 'utf8');
console.log('✅ Fixed TrialExpiryCoDesignModal.tsx');

// 3. TrialStatusHeaderBadge.tsx
const badgePath = path.join(__dirname, 'clinical-pristine', 'src', 'components', 'TrialStatusHeaderBadge.tsx');
let badge = fs.readFileSync(badgePath, 'utf8');
badge = badge.replace(
  "import { Clock, Sparkles, ShieldCheck } from 'lucide-react';",
  "import { Clock, ShieldCheck } from 'lucide-react';"
);
fs.writeFileSync(badgePath, badge, 'utf8');
console.log('✅ Fixed TrialStatusHeaderBadge.tsx');

// 4. useEnterpriseTrial.ts
const trialHookPath = path.join(__dirname, 'clinical-pristine', 'src', 'hooks', 'useEnterpriseTrial.ts');
let trialHook = fs.readFileSync(trialHookPath, 'utf8');
trialHook = trialHook.replace(
  "import { useState, useEffect } from 'react';",
  "import { useState } from 'react';"
);
fs.writeFileSync(trialHookPath, trialHook, 'utf8');
console.log('✅ Fixed useEnterpriseTrial.ts');
