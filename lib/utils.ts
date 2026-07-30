import { StatutCommande, StatutPaiement } from "@/types";

export function formatMontant(montant: number): string {
  return new Intl.NumberFormat("fr-FR").format(montant) + " FCFA";
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export function formatRelative(dateStr: string): string {
  const now = new Date("2024-06-10T12:00:00");
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffH = Math.floor(diffMin / 60);
  const diffJ = Math.floor(diffH / 24);
  if (diffMin < 1) return "À l'instant";
  if (diffMin < 60) return `Il y a ${diffMin} min`;
  if (diffH < 24) return `Il y a ${diffH}h`;
  if (diffJ === 1) return "Hier";
  return formatDate(dateStr);
}

export const statutConfig: Record<StatutCommande, { label: string; color: string; bg: string }> = {
  en_attente: { label: "En attente", color: "text-amber-700", bg: "bg-amber-100" },
  assignee: { label: "Assignée", color: "text-purple-700", bg: "bg-purple-100" },
  en_transit: { label: "En transit", color: "text-blue-700", bg: "bg-blue-100" },
  livree: { label: "Livrée", color: "text-emerald-700", bg: "bg-emerald-100" },
  echouee: { label: "Échouée", color: "text-red-700", bg: "bg-red-100" },
  annulee: { label: "Annulée", color: "text-gray-600", bg: "bg-gray-100" },
};

export const paiementConfig: Record<StatutPaiement, { label: string; color: string; bg: string }> = {
  en_attente: { label: "En attente", color: "text-amber-700", bg: "bg-amber-100" },
  paye: { label: "Payé", color: "text-emerald-700", bg: "bg-emerald-100" },
  rembourse: { label: "Remboursé", color: "text-blue-700", bg: "bg-blue-100" },
  echec: { label: "Échec", color: "text-red-700", bg: "bg-red-100" },
};

export const modeConfig: Record<string, { label: string; icon: string }> = {
  wave: { label: "Wave", icon: "🌊" },
  orange_money: { label: "Orange Money", icon: "🟠" },
  cash: { label: "Cash", icon: "💵" },
  carte: { label: "Carte bancaire", icon: "💳" },
};
