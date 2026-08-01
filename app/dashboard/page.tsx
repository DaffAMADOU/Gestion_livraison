"use client";
import { revenusHebdo, statutsDistrib } from "@/lib/data";
import { useData } from "@/lib/store";
import { formatMontant, formatRelative } from "@/lib/utils";
import { StatutBadge } from "@/components/ui/Badges";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Package, TrendingUp, Truck, Users, ArrowUpRight, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { commandes, livreurs, clients, notifications } = useData();
  const totalRevenu = commandes.filter(c => c.paiementStatut === "paye").reduce((s, c) => s + c.montant, 0);
  const stats = [
    { label: "Total commandes", value: commandes.length, sub: "+3 aujourd\'hui", icon: Package, gradient: "linear-gradient(135deg,#1e40af,#3b82f6)" },
    { label: "Revenus du mois", value: formatMontant(totalRevenu), sub: "+12% vs mois dernier", icon: TrendingUp, gradient: "linear-gradient(135deg,#065f46,#10b981)" },
    { label: "Livreurs actifs", value: livreurs.filter(l => l.statut !== "hors_service").length, sub: livreurs.filter(l=>l.statut==="disponible").length+" disponibles", icon: Truck, gradient: "linear-gradient(135deg,#c2410c,#f97316)" },
    { label: "Clients", value: clients.length, sub: "+2 ce mois", icon: Users, gradient: "linear-gradient(135deg,#5b21b6,#8b5cf6)" },
  ];
  const unread = notifications.filter(n => !n.lu);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tableau de bord</h1>
          <p className="text-sm text-slate-500 mt-0.5">Vue d'ensemble de votre activité</p>
        </div>
        <Link href="/commandes" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 transition-colors">
          <Package size={15} />Nouvelle commande
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl p-5 text-white" style={{ background: s.gradient }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium opacity-90">{s.label}</span>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/20">
                <s.icon size={18} />
              </div>
            </div>
            <div className="text-2xl font-bold mb-1">{s.value}</div>
            <div className="text-xs opacity-75 flex items-center gap-1"><ArrowUpRight size={12} />{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800">Revenus de la semaine</h2>
            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">7 derniers jours</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenusHebdo} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="jour" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => (v/1000).toFixed(0)+"k"} />
              <Tooltip formatter={(v) => [formatMontant(Number(v)), "Revenus"]} contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" }} />
              <Bar dataKey="revenu" fill="#3b82f6" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="font-semibold text-slate-800 mb-4">Statuts des livraisons</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={statutsDistrib} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                {statutsDistrib.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v) => [Number(v)+"%", ""]} contentStyle={{ borderRadius: "8px", fontSize: "13px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {statutsDistrib.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }}></span>
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-medium text-slate-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800">Commandes récentes</h2>
            <Link href="/commandes" className="text-xs text-blue-600 hover:underline">Voir tout →</Link>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-xs text-slate-500 border-b border-slate-100">
                <th className="text-left pb-2 font-medium">Référence</th>
                <th className="text-left pb-2 font-medium">Client</th>
                <th className="text-left pb-2 font-medium">Montant</th>
                <th className="text-left pb-2 font-medium">Statut</th>
                <th className="text-left pb-2 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {commandes.slice(0,5).map((cmd) => (
                <tr key={cmd.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 text-sm font-mono font-medium text-blue-600">{cmd.reference}</td>
                  <td className="py-2.5 text-sm text-slate-700">{cmd.clientNom}</td>
                  <td className="py-2.5 text-sm font-medium text-slate-800">{formatMontant(cmd.montant)}</td>
                  <td className="py-2.5"><StatutBadge statut={cmd.statut} /></td>
                  <td className="py-2.5 text-xs text-slate-400">{formatRelative(cmd.dateCreation)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800">Alertes récentes</h2>
            <Link href="/notifications" className="text-xs text-blue-600 hover:underline">Voir tout →</Link>
          </div>
          <div className="space-y-3">
            {unread.slice(0,4).map((n) => {
              const icons: Record<string, React.ReactNode> = {
                livraison: <CheckCircle size={14} className="text-emerald-500" />,
                paiement: <TrendingUp size={14} className="text-blue-500" />,
                commande: <Package size={14} className="text-purple-500" />,
                systeme: <AlertTriangle size={14} className="text-amber-500" />,
              };
              return (
                <div key={n.id} className="flex gap-2.5 p-2.5 rounded-lg bg-slate-50">
                  <div className="mt-0.5">{icons[n.type]}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-800">{n.titre}</p>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{n.message}</p>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Clock size={10} />{formatRelative(n.date)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
