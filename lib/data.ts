import { Client, Livreur, Commande, Notification } from "@/types";

export const clients: Client[] = [
  { id: "c1", nom: "Fatou Diallo", email: "fatou.diallo@gmail.com", telephone: "+221 77 123 45 67", adresse: "Rue 10, Médina", ville: "Dakar", totalCommandes: 12, dateCreation: "2024-01-15" },
  { id: "c2", nom: "Moussa Ndiaye", email: "m.ndiaye@outlook.com", telephone: "+221 76 234 56 78", adresse: "Allées du Centenaire", ville: "Dakar", totalCommandes: 8, dateCreation: "2024-02-20" },
  { id: "c3", nom: "Aissatou Bâ", email: "aissatou.ba@yahoo.fr", telephone: "+221 78 345 67 89", adresse: "Cité Keur Gorgui", ville: "Dakar", totalCommandes: 5, dateCreation: "2024-03-10" },
  { id: "c4", nom: "Ibrahima Sow", email: "ibra.sow@gmail.com", telephone: "+221 70 456 78 90", adresse: "HLM Grand Yoff", ville: "Dakar", totalCommandes: 20, dateCreation: "2023-11-05" },
  { id: "c5", nom: "Mariama Diop", email: "mariama.d@gmail.com", telephone: "+221 77 567 89 01", adresse: "Sacré-Cœur 3", ville: "Dakar", totalCommandes: 3, dateCreation: "2024-05-18" },
  { id: "c6", nom: "Cheikh Fall", email: "cheikh.fall@gmail.com", telephone: "+221 76 678 90 12", adresse: "Mermoz Pyrotechnie", ville: "Dakar", totalCommandes: 7, dateCreation: "2024-04-02" },
];

export const livreurs: Livreur[] = [
  { id: "l1", nom: "Abdou Mbaye", telephone: "+221 77 111 22 33", email: "abdou.mbaye@gmail.com", vehicule: "Moto", zone: "Plateau / Médina", statut: "en_livraison", livraisons: 245, note: 4.8 },
  { id: "l2", nom: "Seydou Diop", telephone: "+221 76 222 33 44", email: "seydou.d@gmail.com", vehicule: "Voiture", zone: "Almadies / Ngor", statut: "disponible", livraisons: 178, note: 4.6 },
  { id: "l3", nom: "Lamine Sarr", telephone: "+221 78 333 44 55", email: "lamine.sarr@gmail.com", vehicule: "Moto", zone: "Parcelles Assainies", statut: "disponible", livraisons: 312, note: 4.9 },
  { id: "l4", nom: "Omar Niang", telephone: "+221 70 444 55 66", email: "omar.niang@gmail.com", vehicule: "Vélo", zone: "Grand Dakar / HLM", statut: "hors_service", livraisons: 89, note: 4.3 },
  { id: "l5", nom: "Babacar Thiam", telephone: "+221 77 555 66 77", email: "baba.thiam@gmail.com", vehicule: "Moto", zone: "Ouakam / Mermoz", statut: "en_livraison", livraisons: 156, note: 4.7 },
];

export const commandes: Commande[] = [
  { id: "cmd1", reference: "LVR-2024-0001", clientId: "c1", clientNom: "Fatou Diallo", clientTelephone: "+221 77 123 45 67", livreurId: "l1", livreurNom: "Abdou Mbaye", statut: "en_transit", adresseLivraison: "Rue 10, Médina", villeLivraison: "Dakar", montant: 45000, fraisLivraison: 2000, dateCreation: "2024-06-10T08:30:00", notes: "Appeler avant livraison", paiementStatut: "paye", paiementMode: "wave" },
  { id: "cmd2", reference: "LVR-2024-0002", clientId: "c2", clientNom: "Moussa Ndiaye", clientTelephone: "+221 76 234 56 78", livreurId: "l3", livreurNom: "Lamine Sarr", statut: "livree", adresseLivraison: "Allées du Centenaire", villeLivraison: "Dakar", montant: 28500, fraisLivraison: 1500, dateCreation: "2024-06-09T10:00:00", dateLivraison: "2024-06-09T14:30:00", paiementStatut: "paye", paiementMode: "orange_money" },
  { id: "cmd3", reference: "LVR-2024-0003", clientId: "c4", clientNom: "Ibrahima Sow", clientTelephone: "+221 70 456 78 90", statut: "en_attente", adresseLivraison: "HLM Grand Yoff", villeLivraison: "Dakar", montant: 75000, fraisLivraison: 2500, dateCreation: "2024-06-10T09:15:00", paiementStatut: "en_attente", paiementMode: "cash" },
  { id: "cmd4", reference: "LVR-2024-0004", clientId: "c3", clientNom: "Aissatou Bâ", clientTelephone: "+221 78 345 67 89", livreurId: "l5", livreurNom: "Babacar Thiam", statut: "assignee", adresseLivraison: "Cité Keur Gorgui", villeLivraison: "Dakar", montant: 32000, fraisLivraison: 2000, dateCreation: "2024-06-10T07:45:00", paiementStatut: "paye", paiementMode: "wave" },
  { id: "cmd5", reference: "LVR-2024-0005", clientId: "c6", clientNom: "Cheikh Fall", clientTelephone: "+221 76 678 90 12", statut: "echouee", adresseLivraison: "Mermoz Pyrotechnie", villeLivraison: "Dakar", montant: 18000, fraisLivraison: 1500, dateCreation: "2024-06-08T11:00:00", notes: "Client absent", paiementStatut: "rembourse", paiementMode: "orange_money" },
  { id: "cmd6", reference: "LVR-2024-0006", clientId: "c5", clientNom: "Mariama Diop", clientTelephone: "+221 77 567 89 01", livreurId: "l2", livreurNom: "Seydou Diop", statut: "livree", adresseLivraison: "Sacré-Cœur 3", villeLivraison: "Dakar", montant: 55000, fraisLivraison: 2000, dateCreation: "2024-06-07T14:00:00", dateLivraison: "2024-06-07T17:00:00", paiementStatut: "paye", paiementMode: "carte" },
  { id: "cmd7", reference: "LVR-2024-0007", clientId: "c1", clientNom: "Fatou Diallo", clientTelephone: "+221 77 123 45 67", livreurId: "l3", livreurNom: "Lamine Sarr", statut: "en_transit", adresseLivraison: "Rue 10, Médina", villeLivraison: "Dakar", montant: 12500, fraisLivraison: 1500, dateCreation: "2024-06-10T11:00:00", paiementStatut: "paye", paiementMode: "wave" },
  { id: "cmd8", reference: "LVR-2024-0008", clientId: "c4", clientNom: "Ibrahima Sow", clientTelephone: "+221 70 456 78 90", statut: "annulee", adresseLivraison: "HLM Grand Yoff", villeLivraison: "Dakar", montant: 9000, fraisLivraison: 1000, dateCreation: "2024-06-06T09:00:00", notes: "Annulée par le client", paiementStatut: "rembourse", paiementMode: "cash" },
];

export const notifications: Notification[] = [
  { id: "n1", type: "livraison", titre: "Livraison effectuée", message: "La commande LVR-2024-0002 a été livrée avec succès à Moussa Ndiaye.", lu: false, date: "2024-06-09T14:30:00", commandeId: "cmd2" },
  { id: "n2", type: "commande", titre: "Nouvelle commande", message: "Une nouvelle commande (LVR-2024-0003) a été reçue d'Ibrahima Sow.", lu: false, date: "2024-06-10T09:15:00", commandeId: "cmd3" },
  { id: "n3", type: "paiement", titre: "Paiement reçu", message: "Le paiement de 45 000 FCFA via Wave a été confirmé pour LVR-2024-0001.", lu: true, date: "2024-06-10T08:35:00", commandeId: "cmd1" },
  { id: "n4", type: "livraison", titre: "Échec de livraison", message: "La livraison LVR-2024-0005 a échoué. Client introuvable à l'adresse.", lu: false, date: "2024-06-08T15:00:00", commandeId: "cmd5" },
  { id: "n5", type: "systeme", titre: "Livreur hors service", message: "Omar Niang (Vélo) est passé en statut hors service.", lu: true, date: "2024-06-09T08:00:00" },
  { id: "n6", type: "commande", titre: "Commande en transit", message: "La commande LVR-2024-0007 est en cours de livraison.", lu: true, date: "2024-06-10T11:00:00", commandeId: "cmd7" },
];

export const revenusHebdo = [
  { jour: "Lun", revenu: 125000, commandes: 8 },
  { jour: "Mar", revenu: 98000, commandes: 6 },
  { jour: "Mer", revenu: 187000, commandes: 12 },
  { jour: "Jeu", revenu: 145000, commandes: 9 },
  { jour: "Ven", revenu: 210000, commandes: 14 },
  { jour: "Sam", revenu: 265000, commandes: 18 },
  { jour: "Dim", revenu: 88000, commandes: 5 },
];

export const statutsDistrib = [
  { name: "Livrées", value: 45, color: "#10b981" },
  { name: "En transit", value: 20, color: "#3b82f6" },
  { name: "En attente", value: 15, color: "#f59e0b" },
  { name: "Assignées", value: 12, color: "#8b5cf6" },
  { name: "Échouées", value: 8, color: "#ef4444" },
];
