"use client";
import { useData } from "@/lib/store";
import { formatMontant, formatDateTime } from "@/lib/utils";
import { StatutBadge, PaiementBadge } from "@/components/ui/Badges";
import { History, Package, CheckCircle, XCircle } from "lucide-react";

export default function HistoriquePage() {
  const { commandes } = useData();
  const done = commandes.filter(c => ["livree", "echouee", "annulee"].includes(c.statut));
  const totalLivrees = done.filter(c => c.statut === "livree").length;
  const totalEchouees = done.filter(c => c.statut === "echouee").length;
  const totalRevenu = done.filter(c => c.statut === "livree" && c.paiementStatut === "paye").reduce((s,c) => s+c.montant, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Historique</h1>
        <p className="text-sm text-slate-500 mt-0.5">Toutes les livraisons terminées</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total archivées", value: done.length, icon: History, color: "text-slate-600", bg: "bg-slate-50" },
          { label: "Livrées", value: totalLivrees, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Échouées / Annulées", value: totalEchouees + done.filter(c=>c.statut==="annulee").length, icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
          { label: "Revenus générés", value: formatMontant(totalRevenu), icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-slate-500">{s.label}</span>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.bg}`}>
                <s.icon size={17} className={s.color} />
              </div>
            </div>
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
          <h2 className="font-semibold text-slate-700 text-sm">Livraisons archivées</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-xs text-slate-500 border-b border-slate-100">
              <th className="text-left px-4 py-3 font-medium">Référence</th>
              <th className="text-left px-4 py-3 font-medium">Client</th>
              <th className="text-left px-4 py-3 font-medium">Livreur</th>
              <th className="text-left px-4 py-3 font-medium">Montant</th>
              <th className="text-left px-4 py-3 font-medium">Paiement</th>
              <th className="text-left px-4 py-3 font-medium">Résultat</th>
              <th className="text-left px-4 py-3 font-medium">Date livraison</th>
              <th className="text-left px-4 py-3 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {done.map(cmd => (
              <tr key={cmd.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3 text-sm font-mono font-semibold text-blue-600">{cmd.reference}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{cmd.clientNom}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{cmd.livreurNom || <span className="italic text-slate-400">—</span>}</td>
                <td className="px-4 py-3 text-sm font-bold text-slate-800">{formatMontant(cmd.montant)}</td>
                <td className="px-4 py-3"><PaiementBadge statut={cmd.paiementStatut} /></td>
                <td className="px-4 py-3"><StatutBadge statut={cmd.statut} /></td>
                <td className="px-4 py-3 text-xs text-slate-500">{cmd.dateLivraison ? formatDateTime(cmd.dateLivraison) : "—"}</td>
                <td className="px-4 py-3 text-xs text-slate-400 max-w-xs truncate">{cmd.notes || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
