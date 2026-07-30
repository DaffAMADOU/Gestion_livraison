"use client";
import { useState } from "react";
import { livreurs as initialLivreurs } from "@/lib/data";
import { LivreurStatutBadge } from "@/components/ui/Badges";
import { Search, Plus, Phone, Mail, Star, Package } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { FieldWrapper, TextInput, SelectInput } from "@/components/ui/FormField";
import { Livreur } from "@/types";

const emptyForm = { nom: "", telephone: "", email: "", vehicule: "Moto", zone: "" };

export default function LivreursPage() {
  const [livreurs, setLivreurs] = useState<Livreur[]>(initialLivreurs);
  const [search, setSearch] = useState("");
  const [filtre, setFiltre] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filtered = livreurs.filter(l => {
    const matchSearch = l.nom.toLowerCase().includes(search.toLowerCase()) || l.zone.toLowerCase().includes(search.toLowerCase());
    const matchFiltre = !filtre || l.statut === filtre;
    return matchSearch && matchFiltre;
  });

  const stats = [
    { label: "Total livreurs", value: livreurs.length, color: "bg-blue-50 text-blue-700" },
    { label: "Disponibles", value: livreurs.filter(l=>l.statut==="disponible").length, color: "bg-emerald-50 text-emerald-700" },
    { label: "En livraison", value: livreurs.filter(l=>l.statut==="en_livraison").length, color: "bg-orange-50 text-orange-700" },
    { label: "Hors service", value: livreurs.filter(l=>l.statut==="hors_service").length, color: "bg-gray-50 text-gray-600" },
  ];

  const resetAndClose = () => {
    setForm(emptyForm);
    setModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nouveauLivreur: Livreur = {
      id: `l${Date.now()}`,
      nom: form.nom,
      telephone: form.telephone,
      email: form.email,
      vehicule: form.vehicule,
      zone: form.zone,
      statut: "disponible",
      livraisons: 0,
      note: 5,
    };
    setLivreurs([nouveauLivreur, ...livreurs]);
    resetAndClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Livreurs</h1>
          <p className="text-sm text-slate-500 mt-0.5">{livreurs.length} livreurs enregistrés</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 transition-colors">
          <Plus size={15} />Ajouter un livreur
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className={`rounded-xl p-4 ${s.color} border border-current/10`}>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-xs mt-1 opacity-80">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..." className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-400 bg-white" />
        </div>
        <select value={filtre} onChange={e => setFiltre(e.target.value)} className="text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-400 bg-white">
          <option value="">Tous les statuts</option>
          <option value="disponible">Disponible</option>
          <option value="en_livraison">En livraison</option>
          <option value="hors_service">Hors service</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filtered.map((l) => (
          <div key={l.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600">
                  {l.nom.split(" ").map((n: string) => n[0]).join("").slice(0,2).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-slate-800">{l.nom}</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star size={11} className="text-amber-400 fill-amber-400" />
                    <span className="text-xs text-slate-500">{l.note}</span>
                  </div>
                </div>
              </div>
              <LivreurStatutBadge statut={l.statut} />
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-slate-500"><Phone size={12} className="text-slate-400" />{l.telephone}</div>
              <div className="flex items-center gap-2 text-xs text-slate-500"><Mail size={12} className="text-slate-400" />{l.email}</div>
              <div className="flex items-center gap-2 text-xs text-slate-500"><Package size={12} className="text-slate-400" />Zone: {l.zone}</div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div className="text-center">
                <div className="text-base font-bold text-slate-800">{l.livraisons}</div>
                <div className="text-xs text-slate-400">Livraisons</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-slate-600 capitalize">{l.vehicule}</div>
                <div className="text-xs text-slate-400">Véhicule</div>
              </div>
              <button className="px-3 py-1.5 text-xs font-medium rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors">
                Voir détails
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={resetAndClose} title="Ajouter un livreur">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FieldWrapper label="Nom complet" required>
            <TextInput required value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} placeholder="Ex: Abdou Mbaye" />
          </FieldWrapper>
          <FieldWrapper label="Téléphone" required>
            <TextInput required value={form.telephone} onChange={e => setForm({ ...form, telephone: e.target.value })} placeholder="+221 77 111 22 33" />
          </FieldWrapper>
          <FieldWrapper label="Email" required>
            <TextInput required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="nom@exemple.com" />
          </FieldWrapper>
          <div className="grid grid-cols-2 gap-3">
            <FieldWrapper label="Véhicule" required>
              <SelectInput required value={form.vehicule} onChange={e => setForm({ ...form, vehicule: e.target.value })}>
                <option value="Moto">Moto</option>
                <option value="Voiture">Voiture</option>
                <option value="Vélo">Vélo</option>
              </SelectInput>
            </FieldWrapper>
            <FieldWrapper label="Zone" required>
              <TextInput required value={form.zone} onChange={e => setForm({ ...form, zone: e.target.value })} placeholder="Plateau / Médina" />
            </FieldWrapper>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={resetAndClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              Annuler
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors">
              Ajouter le livreur
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
