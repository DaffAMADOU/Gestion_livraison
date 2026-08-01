import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { DataProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "ABD — Gestion de Livraison",
  description: "Gestion des livraisons",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <DataProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col" style={{ marginLeft: "260px" }}>
              <Topbar />
              <main className="flex-1 p-6 bg-slate-50">{children}</main>
            </div>
          </div>
        </DataProvider>
      </body>
    </html>
  );
}
