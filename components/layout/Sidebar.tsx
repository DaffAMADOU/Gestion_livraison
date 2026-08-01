"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Users, Truck, CreditCard, Bell, History, Package, Settings, LogOut } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/commandes", label: "Commandes", icon: ShoppingBag },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/livreurs", label: "Livreurs", icon: Truck },
  { href: "/paiements", label: "Paiements", icon: CreditCard },
  { href: "/notifications", label: "Notifications", icon: Bell, badge: 3 },
  { href: "/historique", label: "Historique", icon: History },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 h-full z-40 flex flex-col" style={{ width: "260px", background: "#0f172a" }}>
      <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-700/50">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-blue-500">
          <Package size={20} className="text-white" />
        </div>
        <div>
          <div className="font-bold text-white text-base">ABD</div>
          <div className="text-xs text-slate-500">Gestion Livraisons</div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-xs font-semibold uppercase tracking-wider px-3 pb-2 text-slate-600">Menu principal</p>
        {navItems.map(({ href, label, icon: Icon, badge }: { href: string; label: string; icon: React.ElementType; badge?: number }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all"
              style={{ color: active ? "#60a5fa" : "#94a3b8", background: active ? "rgba(59,130,246,0.12)" : "transparent", fontWeight: active ? 500 : 400 }}>
              <Icon size={17} style={{ color: active ? "#3b82f6" : "#64748b" }} />
              {label}
              {badge && <span className="ml-auto text-xs font-medium rounded-full px-1.5 py-0.5 bg-red-500 text-white">{badge}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-slate-700/50">
        <Link href="/parametres" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-slate-200 transition-colors">
          <Settings size={17} className="text-slate-600" />Paramètres
        </Link>
        <div className="flex items-center gap-3 px-3 py-3 mt-2 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white bg-blue-500">ABD</div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">Ambocar</div>
            <div className="text-xs text-slate-500 truncate">amadoubocardaff@gmail.com</div>
          </div>
          <button className="p-1 rounded hover:bg-slate-700 transition-colors"><LogOut size={15} className="text-slate-500" /></button>
        </div>
      </div>
    </aside>
  );
}
