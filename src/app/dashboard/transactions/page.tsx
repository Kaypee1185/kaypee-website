
"use client";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import { api } from "../../../lib/api";
import { useEffect, useState } from "react";

export default function Transactions(){
  const [items, setItems] = useState<any[]>([]);
  const [err, setErr] = useState("");
  useEffect(()=>{ (async ()=>{ try{
    const res = await api<any>("/wallet/ledger?limit=50", { auth:true });
    setItems(Array.isArray(res) ? res : (res.items || res.data || []));
  }catch(ex:any){ setErr(ex.message || "Failed to load transactions"); } })(); },[]);
  return <>
    <Nav />
    <div className="container"><div className="card">
      <h2 className="h2">Transactions</h2><p className="p">Wallet credits and debits.</p>
      {err && <div className="notice">{err}</div>}
      <table className="table"><thead><tr><th>Date</th><th>Type</th><th>Amount</th><th>Source</th><th>Reference</th></tr></thead>
      <tbody>{items.map((t)=><tr key={t.reference || t.id}><td>{String(t.createdAt || "").slice(0,10)}</td><td>{t.type}</td><td>{t.amount}</td><td>{t.source}</td><td>{t.reference}</td></tr>)}</tbody></table>
    </div></div>
    <Footer />
  </>;
}
