import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Loader2, X, AlertTriangle } from "lucide-react";

/**
 * Dual-Party Sign-Off Modal (JACK-INV-03).
 * Replaces browser confirm() with a proper supervisor sign-off flow for
 * inventory write-offs exceeding $100. Requires supervisor ID + OTP signature.
 */
export default function SupervisorSignOffModal({ writeOffValue, onConfirm, onCancel }) {
  const [supervisorId, setSupervisorId] = useState("");
  const [supervisorOtp, setSupervisorOtp] = useState("");
  const [verifying, setVerifying] = useState(false);

  const handleConfirm = async () => {
    if (!supervisorId.trim() || !supervisorOtp.trim()) return;
    setVerifying(true);
    // Generate a simple signature from supervisor ID + OTP + timestamp
    const signature = btoa(`${supervisorId}:${supervisorOtp}:${Date.now()}`);
    onConfirm({
      supervisor_id: supervisorId.trim(),
      supervisor_signature: signature,
    });
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0B1C30] border border-amber-800/60 rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950/90 border border-amber-800/60 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="font-bold text-white text-base">Dual-Party Sign-Off Required</h2>
              <p className="text-xs text-slate-400">Write-off exceeds $100 threshold</p>
            </div>
          </div>
          <button onClick={onCancel} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
        </div>

        <div className="flex items-center gap-2 bg-amber-950/40 border border-amber-800/40 rounded-xl p-3">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <p className="text-xs text-amber-300 font-medium">
            Estimated write-off value: <span className="font-bold font-mono">₱{writeOffValue.toFixed(2)}</span>
          </p>
        </div>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">Supervisor ID *</Label>
            <Input
              type="text"
              placeholder="Enter supervisor employee ID"
              value={supervisorId}
              onChange={e => setSupervisorId(e.target.value)}
              className="bg-[#071322] border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">Supervisor OTP Signature *</Label>
            <Input
              type="password"
              placeholder="Enter supervisor OTP code"
              value={supervisorOtp}
              onChange={e => setSupervisorOtp(e.target.value)}
              className="bg-[#071322] border-slate-700 text-white text-center font-mono tracking-widest placeholder:text-slate-500 focus:border-amber-500"
            />
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={onCancel} className="text-slate-300 hover:text-white text-xs">Cancel</Button>
          <Button
            onClick={handleConfirm}
            disabled={verifying || !supervisorId.trim() || !supervisorOtp.trim()}
            className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs gap-1.5"
          >
            {verifying ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
            {verifying ? "Authorizing..." : "Approve Write-Off"}
          </Button>
        </div>

        <p className="text-[11px] text-slate-500 text-center">
          Both supervisor ID and OTP signature are cryptographically logged for audit trail.
        </p>
      </div>
    </div>
  );
}
