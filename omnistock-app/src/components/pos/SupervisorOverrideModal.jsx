import { useState } from "react";
import { api } from "@/lib/apiClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldAlert, Loader2, X } from "lucide-react";

/**
 * Supervisor Override Modal (MITNICK-MGR-02).
 * Replaces static supervisor PIN with dynamic OTP via backend endpoint.
 * Issues a 5-minute override token that must be present for voids/refunds.
 */
export default function SupervisorOverrideModal({ onApproved, onCancel }) {
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(null);

  const handleVerify = async () => {
    if (!otp.trim()) return;
    setVerifying(true);
    setError(null);
    try {
      const data = await api.auth.supervisorOverride(otp.trim());
      if (data?.overrideToken) {
        onApproved(data.overrideToken);
      } else {
        setError("Supervisor override denied.");
        setVerifying(false);
      }
    } catch (err) {
      setError(err.message || "Supervisor verification failed.");
      setVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0B1C30] border border-amber-800/60 rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950/90 border border-amber-800/60 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="font-bold text-white text-base">Supervisor Override Required</h2>
              <p className="text-xs text-slate-400">Enter supervisor OTP to authorize this action</p>
            </div>
          </div>
          <button onClick={onCancel} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
        </div>

        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Supervisor OTP code"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleVerify(); }}
            className="bg-[#071322] border-slate-700 text-white text-center text-lg font-mono tracking-widest placeholder:text-slate-500 focus:border-amber-500"
            autoFocus
          />
          {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={onCancel} className="text-slate-300 hover:text-white text-xs">Cancel</Button>
          <Button
            onClick={handleVerify}
            disabled={verifying || !otp.trim()}
            className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs gap-1.5"
          >
            {verifying ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldAlert className="w-4 h-4" />}
            {verifying ? "Verifying..." : "Authorize Override"}
          </Button>
        </div>

        <p className="text-[11px] text-slate-500 text-center">
          Override token valid for 5 minutes. All overrides are logged.
        </p>
      </div>
    </div>
  );
}
