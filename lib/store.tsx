"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  clients as initialClients,
  livreurs as initialLivreurs,
  commandes as initialCommandes,
  notifications as initialNotifications,
} from "@/lib/data";
import { Client, Livreur, Commande, Notification } from "@/types";

const STORAGE_KEY = "deliverops_data_v1";

interface DataState {
  clients: Client[];
  livreurs: Livreur[];
  commandes: Commande[];
  notifications: Notification[];
}

interface DataContextValue extends DataState {
  addClient: (client: Client) => void;
  addLivreur: (livreur: Livreur) => void;
  addCommande: (commande: Commande) => void;
  updateCommande: (id: string, patch: Partial<Commande>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  deleteNotification: (id: string) => void;
  resetData: () => void;
}

const defaultState: DataState = {
  clients: initialClients,
  livreurs: initialLivreurs,
  commandes: initialCommandes,
  notifications: initialNotifications,
};

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DataState>(defaultState);
  const [loaded, setLoaded] = useState(false);

  // Charge les données persistées au premier montage (côté client uniquement)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setState({
          clients: parsed.clients ?? initialClients,
          livreurs: parsed.livreurs ?? initialLivreurs,
          commandes: parsed.commandes ?? initialCommandes,
          notifications: parsed.notifications ?? initialNotifications,
        });
      }
    } catch (e) {
      console.error("Impossible de lire les données sauvegardées :", e);
    } finally {
      setLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sauvegarde à chaque changement, une fois le chargement initial terminé
  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Impossible de sauvegarder les données :", e);
    }
  }, [state, loaded]);

  const addClient = (client: Client) => {
    setState(s => ({ ...s, clients: [client, ...s.clients] }));
  };

  const addLivreur = (livreur: Livreur) => {
    setState(s => ({ ...s, livreurs: [livreur, ...s.livreurs] }));
  };

  const addCommande = (commande: Commande) => {
    setState(s => ({ ...s, commandes: [commande, ...s.commandes] }));
  };

  const updateCommande = (id: string, patch: Partial<Commande>) => {
    setState(s => ({
      ...s,
      commandes: s.commandes.map(c => (c.id === id ? { ...c, ...patch } : c)),
    }));
  };

  const markNotificationRead = (id: string) => {
    setState(s => ({
      ...s,
      notifications: s.notifications.map(n => (n.id === id ? { ...n, lu: true } : n)),
    }));
  };

  const markAllNotificationsRead = () => {
    setState(s => ({ ...s, notifications: s.notifications.map(n => ({ ...n, lu: true })) }));
  };

  const deleteNotification = (id: string) => {
    setState(s => ({ ...s, notifications: s.notifications.filter(n => n.id !== id) }));
  };

  const resetData = () => {
    setState(defaultState);
  };

  return (
    <DataContext.Provider
      value={{
        ...state,
        addClient,
        addLivreur,
        addCommande,
        updateCommande,
        markNotificationRead,
        markAllNotificationsRead,
        deleteNotification,
        resetData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error("useData doit être utilisé à l'intérieur d'un <DataProvider>");
  }
  return ctx;
}
