import { StatutCommande, StatutPaiement } from "@/types";
import { statutConfig, paiementConfig, modeConfig } from "@/lib/utils";

export function StatutBadge({ statut }: { statut: StatutCommande }) {
  const c = statutConfig[statut];
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${c.color} ${c.bg}`}>{c.label}</span>;
}

export function PaiementBadge({ statut }: { statut: StatutPaiement }) {
  const c = paiementConfig[statut];
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${c.color} ${c.bg}`}>{c.label}</span>;
}

export function ModeBadge({ mode }: { mode: string }) {
  const c = modeConfig[mode] || { label: mode, icon: "💰" };
  return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700"><span>{c.icon}</span>{c.label}</span>;
}

export function LivreurStatutBadge({ statut }: { statut: string }) {
  const map: Record<string, { label: string; color: string; bg: string; dot: string }> = {
    disponible: { label: "Disponible", color: "text-emerald-700", bg: "bg-emerald-100", dot: "bg-emerald-500" },
    en_livraison: { label: "En livraison", color: "text-blue-700", bg: "bg-blue-100", dot: "bg-blue-500" },
    hors_service: { label: "Hors service", color: "text-gray-600", bg: "bg-gray-100", dot: "bg-gray-400" },
  };
  const c = map[statut] || { label: statut, color: "text-gray-600", bg: "bg-gray-100", dot: "bg-gray-400" };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${c.color} ${c.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${c.dot}`}></span>{c.label}
    </span>
  );
}
