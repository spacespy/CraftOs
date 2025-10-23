import React, { useEffect, useState } from "react";
export default function Clients() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ nom: "", email: "", tel: "" });
  const fetchClients = async () => {
    const res = await fetch("/api/clients");
    const data = await res.json();
    setClients(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ nom: "", email: "", tel: "" });
    fetchClients();
  };
  useEffect(() => { fetchClients(); }, []);
  return (
    <div>
      <h1>Clients</h1>
      <form onSubmit={handleSubmit} className="form">
        <input placeholder="Nom" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Téléphone" value={form.tel} onChange={(e) => setForm({ ...form, tel: e.target.value })} />
        <button>Ajouter</button>
      </form>
      <ul className="list">
        {clients.map(c => <li key={c.id}>{c.nom} — {c.email} — {c.tel}</li>)}
      </ul>
    </div>
  );
}
