import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export const metadata: Metadata = {
  title: "DeliverOps — Gestion de Livraison",
  description: "SaaS de gestion des livraisons",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col" style={{ marginLeft: "260px" }}>
            <Topbar />
            <main className="flex-1 p-6 bg-slate-50">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
