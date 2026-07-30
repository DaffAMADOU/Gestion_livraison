"use client";
import { useState } from "react";
import { commandes as initialCommandes, clients, livreurs } from "@/lib/data";
import { formatMontant, formatDateTime } from "@/lib/utils";
import { StatutBadge, PaiementBadge, ModeBadge } from "@/components/ui/Badges";
import Modal from "@/components/ui/Modal";
import { FieldWrapper, TextInput, NumberInput, SelectInput, TextArea } from "@/components/ui/FormField";
import { Search, Filter, Plus, Eye, Truck } from "lucide-react";
import { Commande, ModePaiement } from "@/types";

const STATUTS: { value: string; label: string }[] = [
  { value: "", label: "Tous les statuts" },
  { value: "en_attente", label: "En attente" },
  { value: "assignee", label: "Assignée" },
  { value: "en_transit", label: "En transit" },
  { value: "livree", label: "Livrée" },
  { value: "echouee", label: "Échouée" },
  { value: "annulee", label: "Annulée" },
];

const emptyForm = {
  clientId: "",
  livreurId: "",
  adresseLivraison: "",
  villeLivraison: "",
  montant: "",
  fraisLivraison: "",
  paiementMode: "cash" as ModePaiement,
  notes: "",
};

export default function CommandesPage() {
  const [commandes, setCommandes] = useState<Commande[]>(initialCommandes);
  const [search, setSearch] = useState("");
  const [statut, setStatut] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filtered = commandes.filter(c => {
    const matchSearch = c.reference.toLowerCase().includes(search.toLowerCase()) ||
      c.clientNom.toLowerCase().includes(search.toLowerCase());
    const matchStatut = !statut || c.statut === statut;
    return matchSearch && matchStatut;
  });

  const resetAndClose = () => {
    setForm(emptyForm);
    setModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find(c => c.id === form.clientId);
    if (!client) return;
    const livreur = livreurs.find(l => l.id === form.livreurId);

    const nextNumber = commandes.length + 1;
    const reference = `LVR-2024-${String(nextNumber).padStart(4, "0")}`;

    const nouvelleCommande: Commande = {
      id: `cmd${Date.now()}`,
      reference,
      clientId: client.id,
      clientNom: client.nom,
      clientTelephone: client.telephone,
      livreurId: livreur?.id,
      livreurNom: livreur?.nom,
      statut: livreur ? "assignee" : "en_attente",
      adresseLivraison: form.adresseLivraison || client.adresse,
      villeLivraison: form.villeLivraison || client.ville,
      montant: Number(form.montant) || 0,
      fraisLivraison: Number(form.fraisLivraison) || 0,
      dateCreation: new Date().toISOString(),
      notes: form.notes || undefined,
      paiementStatut: "en_attente",
      paiementMode: form.paiementMode,
    };

    setCommandes([nouvelleCommande, ...commandes]);
    resetAndClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Commandes</h1>
          <p className="text-sm text-slate-500 mt-0.5">{commandes.length} commandes au total</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 transition-colors">
          <Plus size={15} />Nouvelle commande
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        <div className="flex items-center gap-3 p-4 border-b border-slate-100">
          <div className="relative flex-1 max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher..." className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-400 bg-slate-50 focus:bg-white" />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={15} className="text-slate-400" />
            <select value={statut} onChange={e => setStatut(e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-400 bg-white">
              {STATUTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <span className="text-sm text-slate-500 ml-auto">{filtered.length} résultats</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr className="text-xs text-slate-500 border-b border-slate-100">
                <th className="text-left px-4 py-3 font-medium">Référence</th>
                <th className="text-left px-4 py-3 font-medium">Client</th>
                <th className="text-left px-4 py-3 font-medium">Livreur</th>
                <th className="text-left px-4 py-3 font-medium">Montant</th>
                <th className="text-left px-4 py-3 font-medium">Paiement</th>
                <th className="text-left px-4 py-3 font-medium">Statut</th>
                <th className="text-left px-4 py-3 font-medium">Date</th>
                <th className="text-left px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((cmd) => (
                <tr key={cmd.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3 text-sm font-mono font-semibold text-blue-600">{cmd.reference}</td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-slate-800">{cmd.clientNom}</div>
                    <div className="text-xs text-slate-400">{cmd.clientTelephone}</div>
                  </td>
                  <td className="px-4 py-3">
                    {cmd.livreurNom ? (
                      <div className="flex items-center gap-1.5">
                        <Truck size={13} className="text-slate-400" />
                        <span className="text-sm text-slate-700">{cmd.livreurNom}</span>
                      </div>
                    ) : <span className="text-xs text-slate-400 italic">Non assigné</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-semibold text-slate-800">{formatMontant(cmd.montant)}</div>
                    <div className="text-xs text-slate-400">+{formatMontant(cmd.fraisLivraison)} livraison</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <PaiementBadge statut={cmd.paiementStatut} />
                      <div><ModeBadge mode={cmd.paiementMode} /></div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><StatutBadge statut={cmd.statut} /></td>
                  <td className="px-4 py-3 text-xs text-slate-500">{formatDateTime(cmd.dateCreation)}</td>
                  <td className="px-4 py-3">
                    <button className="p-1.5 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors">
                      <Eye size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <Search size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">Aucune commande trouvée</p>
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={resetAndClose} title="Nouvelle commande">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FieldWrapper label="Client" required>
            <SelectInput required value={form.clientId} onChange={e => setForm({ ...form, clientId: e.target.value })}>
              <option value="">Sélectionner un client</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
            </SelectInput>
          </FieldWrapper>

          <FieldWrapper label="Livreur (optionnel)">
            <SelectInput value={form.livreurId} onChange={e => setForm({ ...form, livreurId: e.target.value })}>
              <option value="">Non assigné</option>
              {livreurs.map(l => <option key={l.id} value={l.id}>{l.nom}</option>)}
            </SelectInput>
          </FieldWrapper>

          <div className="grid grid-cols-2 gap-3">
            <FieldWrapper label="Adresse de livraison">
              <TextInput value={form.adresseLivraison} onChange={e => setForm({ ...form, adresseLivraison: e.target.value })} placeholder="Laisser vide pour utiliser l'adresse du client" />
            </FieldWrapper>
            <FieldWrapper label="Ville">
              <TextInput value={form.villeLivraison} onChange={e => setForm({ ...form, villeLivraison: e.target.value })} placeholder="Dakar" />
            </FieldWrapper>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FieldWrapper label="Montant (FCFA)" required>
              <NumberInput required min={0} value={form.montant} onChange={e => setForm({ ...form, montant: e.target.value })} />
            </FieldWrapper>
            <FieldWrapper label="Frais de livraison (FCFA)" required>
              <NumberInput required min={0} value={form.fraisLivraison} onChange={e => setForm({ ...form, fraisLivraison: e.target.value })} />
            </FieldWrapper>
          </div>

          <FieldWrapper label="Mode de paiement">
            <SelectInput value={form.paiementMode} onChange={e => setForm({ ...form, paiementMode: e.target.value as ModePaiement })}>
              <option value="cash">Cash</option>
              <option value="wave">Wave</option>
              <option value="orange_money">Orange Money</option>
              <option value="carte">Carte bancaire</option>
            </SelectInput>
          </FieldWrapper>

          <FieldWrapper label="Notes">
            <TextArea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Instructions particulières..." />
          </FieldWrapper>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={resetAndClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              Annuler
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors">
              Créer la commande
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
