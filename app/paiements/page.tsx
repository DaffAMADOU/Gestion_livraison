"use client";
import { useState } from "react";
import { useData } from "@/lib/store";
import { formatMontant, formatDateTime } from "@/lib/utils";
import { PaiementBadge, ModeBadge } from "@/components/ui/Badges";
import { Search, TrendingUp, CreditCard, AlertCircle, RotateCcw } from "lucide-react";

export default function PaiementsPage() {
  const { commandes } = useData();
  const [search, setSearch] = useState("");
  const [filtre, setFiltre] = useState("");

  const totalPaye = commandes.filter(c=>c.paiementStatut==="paye").reduce((s,c)=>s+c.montant,0);
  const totalAttente = commandes.filter(c=>c.paiementStatut==="en_attente").reduce((s,c)=>s+c.montant,0);
  const totalRembourse = commandes.filter(c=>c.paiementStatut==="rembourse").reduce((s,c)=>s+c.montant,0);

  const stats = [
    { label: "Total encaissé", value: formatMontant(totalPaye), icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "En attente", value: formatMontant(totalAttente), icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Remboursé", value: formatMontant(totalRembourse), icon: RotateCcw, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Transactions", value: commandes.length, icon: CreditCard, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const filtered = commandes.filter(c => {
    const matchSearch = c.reference.toLowerCase().includes(search.toLowerCase()) || c.clientNom.toLowerCase().includes(search.toLowerCase());
    const matchFiltre = !filtre || c.paiementStatut === filtre;
    return matchSearch && matchFiltre;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Paiements</h1>
        <p className="text-sm text-slate-500 mt-0.5">Suivi des transactions et paiements</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map(s => (
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

      <div className="bg-white rounded-xl border border-slate-200">
        <div className="flex items-center gap-3 p-4 border-b border-slate-100">
          <div className="relative flex-1 max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Référence ou client..." className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-400 bg-slate-50 focus:bg-white" />
          </div>
          <select value={filtre} onChange={e => setFiltre(e.target.value)} className="text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none bg-white">
            <option value="">Tous les statuts</option>
            <option value="paye">Payé</option>
            <option value="en_attente">En attente</option>
            <option value="rembourse">Remboursé</option>
            <option value="echec">Échec</option>
          </select>
          <span className="text-sm text-slate-500 ml-auto">{filtered.length} transactions</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr className="text-xs text-slate-500 border-b border-slate-100">
                <th className="text-left px-4 py-3 font-medium">Référence</th>
                <th className="text-left px-4 py-3 font-medium">Client</th>
                <th className="text-left px-4 py-3 font-medium">Montant</th>
                <th className="text-left px-4 py-3 font-medium">Frais livraison</th>
                <th className="text-left px-4 py-3 font-medium">Mode</th>
                <th className="text-left px-4 py-3 font-medium">Statut</th>
                <th className="text-left px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(cmd => (
                <tr key={cmd.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3 text-sm font-mono font-semibold text-blue-600">{cmd.reference}</td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-slate-800">{cmd.clientNom}</div>
                    <div className="text-xs text-slate-400">{cmd.clientTelephone}</div>
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-slate-800">{formatMontant(cmd.montant)}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{formatMontant(cmd.fraisLivraison)}</td>
                  <td className="px-4 py-3"><ModeBadge mode={cmd.paiementMode} /></td>
                  <td className="px-4 py-3"><PaiementBadge statut={cmd.paiementStatut} /></td>
                  <td className="px-4 py-3 text-xs text-slate-500">{formatDateTime(cmd.dateCreation)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
