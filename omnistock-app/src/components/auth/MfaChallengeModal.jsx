import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Loader2, Lock } from "lucide-react";

/**
 * MFA Step-Up Challenge Modal (MITNICK-OWNER-01).
 * Blocks rendering of executive financial/tax content until MFA is verified.
 */
export default function MfaChallengeModal({ title = "MFA Verification Required" }) {
  const { verifyMfa } = useAuth();
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(null);

  const handleVerify = async () => {
    if (!code.trim()) return;
    setVerifying(true);
    setError(null);
    const ok = await verifyMfa(code.trim());
    if (!ok) {
      setError("Invalid MFA code. Please try again.");
      setVerifying(false);
    }
    // On success, AuthContext.mfaVerified flips to true and parent re-renders
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <div className="bg-[#0B1C30] border border-slate-800 rounded-2xl shadow-2xl w-full max-w-sm p-8 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center shrink-0">
            <Lock className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="font-bold text-white text-base">{title}</h2>
            <p className="text-xs text-slate-400 mt-0.5">Enter your MFA code to access this page</p>
          </div>
        </div>

        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Enter 6-digit code"
            value={code}
            onChange={e => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            onKeyDown={e => { if (e.key === "Enter") handleVerify(); }}
            className="bg-[#071322] border-slate-700 text-white text-center text-lg font-mono tracking-widest placeholder:text-slate-500 focus:border-cyan-500"
            autoFocus
          />
          {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}
        </div>

        <Button
          onClick={handleVerify}
          disabled={verifying || !code.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold gap-2 rounded-xl py-3"
        >
          {verifying ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
          {verifying ? "Verifying..." : "Verify & Unlock"}
        </Button>

        <p className="text-[11px] text-slate-500 text-center">
          This page contains sensitive financial data and requires step-up authentication.
        </p>
      </div>
    </div>
  );
}
