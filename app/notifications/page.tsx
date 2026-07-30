"use client";
import { useState } from "react";
import { notifications } from "@/lib/data";
import { formatRelative } from "@/lib/utils";
import { Bell, CheckCircle, Package, TrendingUp, AlertTriangle, Check, Trash2 } from "lucide-react";
import { Notification } from "@/types";

export default function NotificationsPage() {
  const [items, setItems] = useState(notifications);
  const unread = items.filter(n => !n.lu).length;

  const markAll = () => setItems(items.map(n => ({ ...n, lu: true })));
  const markOne = (id: string) => setItems(items.map(n => n.id === id ? { ...n, lu: true } : n));
  const deleteOne = (id: string) => setItems(items.filter(n => n.id !== id));

  const icons: Record<Notification["type"], React.ReactNode> = {
    livraison: <CheckCircle size={18} className="text-emerald-500" />,
    paiement: <TrendingUp size={18} className="text-blue-500" />,
    commande: <Package size={18} className="text-purple-500" />,
    systeme: <AlertTriangle size={18} className="text-amber-500" />,
  };

  const typeBg: Record<Notification["type"], string> = {
    livraison: "bg-emerald-50",
    paiement: "bg-blue-50",
    commande: "bg-purple-50",
    systeme: "bg-amber-50",
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="text-sm text-slate-500 mt-0.5">{unread} non lue{unread !== 1 ? "s" : ""}</p>
        </div>
        {unread > 0 && (
          <button onClick={markAll} className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
            <Check size={14} />Tout marquer comme lu
          </button>
        )}
      </div>

      <div className="space-y-2">
        {items.map(n => (
          <div key={n.id} className={`bg-white rounded-xl border p-4 flex gap-4 transition-all ${!n.lu ? "border-blue-200 shadow-sm" : "border-slate-200"}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${typeBg[n.type]}`}>
              {icons[n.type]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-800">{n.titre}</span>
                    {!n.lu && <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>}
                  </div>
                  <p className="text-sm text-slate-600 mt-0.5">{n.message}</p>
                  <p className="text-xs text-slate-400 mt-1">{formatRelative(n.date)}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  {!n.lu && (
                    <button onClick={() => markOne(n.id)} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors" title="Marquer comme lu">
                      <Check size={13} className="text-slate-500" />
                    </button>
                  )}
                  <button onClick={() => deleteOne(n.id)} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer">
                    <Trash2 size={13} className="text-slate-400 hover:text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <Bell size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">Aucune notification</p>
            <p className="text-sm mt-1">Vous êtes à jour !</p>
          </div>
        )}
      </div>
    </div>
  );
}
