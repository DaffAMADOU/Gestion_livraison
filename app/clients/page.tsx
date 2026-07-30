"use client";
import { useState } from "react";
import { clients as initialClients } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { Search, Plus, Mail, Phone, MapPin, ShoppingBag } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { FieldWrapper, TextInput } from "@/components/ui/FormField";
import { Client } from "@/types";

const emptyForm = { nom: "", email: "", telephone: "", adresse: "", ville: "" };

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filtered = clients.filter(c =>
    c.nom.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.telephone.includes(search)
  );

  const resetAndClose = () => {
    setForm(emptyForm);
    setModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nouveauClient: Client = {
      id: `c${Date.now()}`,
      nom: form.nom,
      email: form.email,
      telephone: form.telephone,
      adresse: form.adresse,
      ville: form.ville,
      totalCommandes: 0,
      dateCreation: new Date().toISOString(),
    };
    setClients([nouveauClient, ...clients]);
    resetAndClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Clients</h1>
          <p className="text-sm text-slate-500 mt-0.5">{clients.length} clients enregistrés</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 transition-colors">
          <Plus size={15} />Nouveau client
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher un client..." className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-400 bg-white" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filtered.map((client) => (
          <div key={client.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-700">
                  {client.nom.split(" ").map((n: string) => n[0]).join("").slice(0,2).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-slate-800">{client.nom}</div>
                  <div className="text-xs text-slate-400">Client depuis {formatDate(client.dateCreation)}</div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                <ShoppingBag size={11} />{client.totalCommandes}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Mail size={12} className="text-slate-400" />{client.email}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Phone size={12} className="text-slate-400" />{client.telephone}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <MapPin size={12} className="text-slate-400" />{client.adresse}, {client.ville}
              </div>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <Search size={32} className="mx-auto mb-2 opacity-40" />
          <p className="text-sm">Aucun client trouvé</p>
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={resetAndClose} title="Nouveau client">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FieldWrapper label="Nom complet" required>
            <TextInput required value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} placeholder="Ex: Fatou Diallo" />
          </FieldWrapper>
          <FieldWrapper label="Email" required>
            <TextInput required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="nom@exemple.com" />
          </FieldWrapper>
          <FieldWrapper label="Téléphone" required>
            <TextInput required value={form.telephone} onChange={e => setForm({ ...form, telephone: e.target.value })} placeholder="+221 77 123 45 67" />
          </FieldWrapper>
          <div className="grid grid-cols-2 gap-3">
            <FieldWrapper label="Adresse" required>
              <TextInput required value={form.adresse} onChange={e => setForm({ ...form, adresse: e.target.value })} placeholder="Rue 10, Médina" />
            </FieldWrapper>
            <FieldWrapper label="Ville" required>
              <TextInput required value={form.ville} onChange={e => setForm({ ...form, ville: e.target.value })} placeholder="Dakar" />
            </FieldWrapper>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={resetAndClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              Annuler
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors">
              Ajouter le client
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
