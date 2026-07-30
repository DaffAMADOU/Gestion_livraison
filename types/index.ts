export type StatutCommande = "en_attente" | "assignee" | "en_transit" | "livree" | "echouee" | "annulee";
export type StatutPaiement = "en_attente" | "paye" | "rembourse" | "echec";
export type ModePaiement = "wave" | "orange_money" | "cash" | "carte";

export interface Client {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  ville: string;
  totalCommandes: number;
  dateCreation: string;
}

export interface Livreur {
  id: string;
  nom: string;
  telephone: string;
  email: string;
  vehicule: string;
  zone: string;
  statut: "disponible" | "en_livraison" | "hors_service";
  livraisons: number;
  note: number;
}

export interface Commande {
  id: string;
  reference: string;
  clientId: string;
  clientNom: string;
  clientTelephone: string;
  livreurId?: string;
  livreurNom?: string;
  statut: StatutCommande;
  adresseLivraison: string;
  villeLivraison: string;
  montant: number;
  fraisLivraison: number;
  dateCreation: string;
  dateLivraison?: string;
  notes?: string;
  paiementStatut: StatutPaiement;
  paiementMode: ModePaiement;
}

export interface Notification {
  id: string;
  type: "livraison" | "paiement" | "commande" | "systeme";
  titre: string;
  message: string;
  lu: boolean;
  date: string;
  commandeId?: string;
}
