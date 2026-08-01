"use client";
import { Bell, Search } from "lucide-react";
import Link from "next/link";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 px-6 py-3 bg-white border-b border-slate-200">
      <div className="flex-1 max-w-md relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" placeholder="Rechercher une commande, client..."
          className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-400 focus:bg-white transition-colors" />
      </div>
      <div className="flex items-center gap-3 ml-auto">
        <Link href="/notifications" className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <Bell size={18} className="text-slate-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
        </Link>
        <div className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg border border-slate-200">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white bg-blue-700">ABD</div>
          <span className="text-sm font-medium text-slate-700">Admin</span>
        </div>
      </div>
    </header>
  );
}
