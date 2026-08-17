import React, { useState } from 'react';
import type { ClientAccount } from '../types';
import { 
  Building2, 
  Send, 
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ThreePlBillingViewProps {
  clients: ClientAccount[];
  onAddClient?: (client: ClientAccount) => void;
}

export const ThreePlBillingView: React.FC<ThreePlBillingViewProps> = ({
  clients
}) => {

  const [selectedClient, setSelectedClient] = useState<ClientAccount>(clients[0]);
  const [invoiceSent, setInvoiceSent] = useState<boolean>(false);

  const totalMonthlyBilled = clients.reduce((acc, c) => acc + c.currentMonthBilled, 0);
  const totalPalletsStored = clients.reduce((acc, c) => acc + c.activePallets, 0);

  const handleSendInvoice = () => {
    setInvoiceSent(true);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 }
    });
    setTimeout(() => setInvoiceSent(false), 3000);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#070B14] overflow-hidden font-sans">
      {/* Header */}
      <div className="h-14 border-b border-[#1E2D4D] bg-[#0D1527] px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <Building2 size={18} />
          </div>
          <div>
            <h2 className="font-mono font-bold text-sm text-white">3PL Multi-Client Storage & Billing Engine</h2>
            <span className="text-[10px] text-slate-400 font-mono">Automated Pallet-Day & Handling Rate Invoicing</span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="px-3 py-1 bg-[#121D36] border border-[#2A4374] rounded-lg text-emerald-400 font-bold">
            Total 3PL MRR: ${totalMonthlyBilled.toLocaleString()}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4 p-6 border-b border-[#1E2D4D] bg-[#0D1527]/40 shrink-0 font-mono text-xs">
        <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E2D4D]">
          <span className="text-slate-400 text-[10px] block mb-1">TOTAL PALLETS UNDER MANAGEMENT</span>
          <div className="text-white font-bold text-xl">{totalPalletsStored} Pallets</div>
          <span className="text-[10px] text-emerald-400 font-sans">Across 3 Strategic Enterprise Clients</span>
        </div>
        <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E2D4D]">
          <span className="text-slate-400 text-[10px] block mb-1">AVG STORAGE YIELD / PALLET</span>
          <div className="text-[#5BC0BE] font-bold text-xl">$29.16 / mo</div>
          <span className="text-[10px] text-slate-400 font-sans">+ $4.73 per handling pick</span>
        </div>
        <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E2D4D]">
          <span className="text-slate-400 text-[10px] block mb-1">BILLING CYCLE COMPLIANCE</span>
          <div className="text-emerald-400 font-bold text-xl">100% On-Time</div>
          <span className="text-[10px] text-slate-400 font-sans">Automated Stripe/QuickBooks Sync</span>
        </div>
      </div>

      {/* Main Ledger Split */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-hidden">
        {/* Left Client List */}
        <div className="border-r border-[#1E2D4D] bg-[#070B14] p-4 overflow-y-auto space-y-3 font-mono">
          <span className="text-xs font-bold text-slate-400 block mb-2">3PL Client Accounts</span>
          {clients.map((client) => (
            <div
              key={client.id}
              onClick={() => setSelectedClient(client)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                selectedClient.id === client.id 
                  ? 'bg-[#121D36] border-[#5BC0BE] shadow-md glow-mint' 
                  : 'bg-[#0D1527] border-[#1E2D4D] hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-white font-bold text-sm font-sans">{client.companyName}</h4>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                  {client.contractTier}
                </span>
              </div>
              <div className="text-slate-400 text-xs font-sans">
                Contact: {client.contactPerson}
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1 border-t border-[#1E2D4D]">
                <span>{client.activePallets} Pallets</span>
                <strong className="text-emerald-400">${client.currentMonthBilled.toLocaleString()} / mo</strong>
              </div>
            </div>
          ))}
        </div>

        {/* Right Invoice & Rate Sheet Breakdown */}
        <div className="lg:col-span-2 bg-[#0D1527] p-6 overflow-y-auto space-y-6 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[#1E2D4D] pb-4">
            <div>
              <span className="text-[#5BC0BE] font-bold block text-[11px]">MONTHLY RATE SHEET & INVOICE</span>
              <h3 className="text-white text-lg font-bold font-sans">{selectedClient.companyName}</h3>
              <span className="text-slate-400">{selectedClient.email}</span>
            </div>
            <button
              onClick={handleSendInvoice}
              className="flex items-center gap-1.5 bg-gradient-to-r from-[#5BC0BE] to-[#3A86FF] text-[#070B14] font-bold px-4 py-2 rounded-xl transition-all cursor-pointer shadow-lg glow-mint text-xs"
            >
              <Send size={14} />
              <span>Dispatch Invoice PDF</span>
            </button>
          </div>

          {/* Invoice Itemized Table */}
          <div className="bg-[#070B14] border border-[#1E2D4D] rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-[#1E2D4D] bg-[#121D36] text-slate-400">
                  <th className="p-3">BILLING COMPONENT</th>
                  <th className="p-3 text-right">VOLUME</th>
                  <th className="p-3 text-right">CONTRACT RATE</th>
                  <th className="p-3 text-right">SUBTOTAL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2D4D]/60 text-slate-300">
                <tr>
                  <td className="p-3 font-bold text-white">Pallet Storage Fee (Monthly)</td>
                  <td className="p-3 text-right">{selectedClient.activePallets} Pallets</td>
                  <td className="p-3 text-right">${selectedClient.monthlyStorageRate.toFixed(2)}/plt</td>
                  <td className="p-3 text-right text-emerald-400 font-bold">
                    ${(selectedClient.activePallets * selectedClient.monthlyStorageRate).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Inbound & Outbound Pick Handling</td>
                  <td className="p-3 text-right">1,120 Picks</td>
                  <td className="p-3 text-right">${selectedClient.handlingFeePerPick.toFixed(2)}/pick</td>
                  <td className="p-3 text-right text-emerald-400 font-bold">
                    ${(1120 * selectedClient.handlingFeePerPick).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Cold Vault Environmental Surcharge</td>
                  <td className="p-3 text-right">Included</td>
                  <td className="p-3 text-right">Flat Tier</td>
                  <td className="p-3 text-right text-emerald-400 font-bold">$350.00</td>
                </tr>
                <tr className="bg-[#121D36]/80 font-bold text-white">
                  <td colSpan={3} className="p-3 text-right text-sm">TOTAL AMOUNT DUE (NET 30):</td>
                  <td className="p-3 text-right text-base text-[#6FFFE9] font-bold">
                    ${selectedClient.currentMonthBilled.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {invoiceSent && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-center font-bold flex items-center justify-center gap-2 font-mono">
              <CheckCircle2 size={16} />
              <span>Itemized Invoice dispatched to {selectedClient.email}!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
