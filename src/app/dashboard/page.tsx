
"use client";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { api } from "../../lib/api";
import { useEffect, useState } from "react";

type Bundle = { id:string; title:string; code:string; sizeMb:number; };

export default function Dashboard(){
  const [balance, setBalance] = useState<string>("—");
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [bundleId, setBundleId] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [fundAmount, setFundAmount] = useState<number>(10);
  const [email, setEmail] = useState<string>("");
  const [busyBuy, setBusyBuy] = useState(false);
  const [busyFund, setBusyFund] = useState(false);
  const [msg, setMsg] = useState<string>("");

  const load = async () => {
    setMsg("");
    try{
      const bal = await api<any>("/wallet/balance", { auth:true });
      const b = await api<any>("/bundles?network=MTN", { auth:false }).catch(()=>({items:[]}));
      const list = Array.isArray(b) ? b : (b.items || b.data || []);
      setBundles(list);
      setBalance(String(bal.balance ?? bal.balanceCached ?? bal.amount ?? "0"));
      if (!bundleId && list[0]?.id) setBundleId(list[0].id);
    }catch(ex:any){ setMsg(ex.message || "Failed to load dashboard"); }
  };

  useEffect(()=>{ load(); }, []);

  const onFund = async () => {
    setBusyFund(true); setMsg("");
    try{
      const res = await api<{authorization_url:string}>("/wallet/fund/paystack/init", { method:"POST", auth:true, body:{ amount: fundAmount, email } });
      window.location.href = res.authorization_url;
    }catch(ex:any){ setMsg(ex.message || "Funding failed"); }finally{ setBusyFund(false); }
  };

  const onBuy = async () => {
    setBusyBuy(true); setMsg("");
    try{
      const res = await api<{orderRef:string, status:string}>("/orders", { method:"POST", auth:true, body:{ bundleId, recipientPhone: phone } });
      setMsg(`Order created: ${res.orderRef} (${res.status})`);
      setPhone(""); await load();
    }catch(ex:any){ setMsg(ex.message || "Order failed"); }finally{ setBusyBuy(false); }
  };

  return <>
    <Nav />
    <div className="container">
      <div className="grid">
        <div className="card">
          <h2 className="h2">Buy MTN Bundle</h2>
          <p className="p">Choose a bundle, enter the recipient number, and place the order.</p>
          <div className="label">Select bundle</div>
          <select className="input" value={bundleId} onChange={e=>setBundleId(e.target.value)}>
            {bundles.map(b => <option key={b.id} value={b.id}>{b.title} ({b.code})</option>)}
          </select>
          <div className="label">Recipient phone</div>
          <input className="input" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="024xxxxxxx / 054xxxxxxx" />
          <div className="row" style={{marginTop:14}}>
            <button className="btn primary" onClick={onBuy} disabled={busyBuy || !bundleId || !phone}>{busyBuy ? "Processing..." : "Buy now"}</button>
            <a className="btn" href="/dashboard/orders">View orders</a>
            <a className="btn" href="/dashboard/transactions">Transactions</a>
          </div>
          {msg && <div className="notice" style={{marginTop:12}}>{msg}</div>}
        </div>
        <div className="card">
          <h2 className="h2">Wallet</h2>
          <div className="kpi"><div className="k">Available balance</div><div className="v">GHS {balance}</div></div>
          <div style={{height:12}} />
          <h2 className="h2">Fund wallet (Paystack)</h2>
          <div className="label">Email (required by Paystack)</div>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" />
          <div className="label">Amount (GHS)</div>
          <input className="input" type="number" value={fundAmount} onChange={e=>setFundAmount(Number(e.target.value))} />
          <div className="row" style={{marginTop:14}}>
            <button className="btn primary" onClick={onFund} disabled={busyFund || !email || fundAmount<=0}>{busyFund ? "Opening Paystack..." : "Fund wallet"}</button>
            <a className="btn" href="https://wa.me/233546183019" target="_blank">Need help?</a>
          </div>
          <div style={{height:14}} />
          <div className="notice">After payment, Paystack will notify the server. Refresh your dashboard to see the updated balance.</div>
        </div>
      </div>
    </div>
    <Footer />
  </>;
}
