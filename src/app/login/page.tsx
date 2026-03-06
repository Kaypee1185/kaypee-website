"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";
import { setToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login(){
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try{
      // Expected: POST /auth/login { phone, password } -> { accessToken }
      const res = await api<{accessToken:string}>("/auth/login", { method:"POST", body:{ phone, password } });
      setToken(res.accessToken);
      router.push("/dashboard");
    }catch(ex:any){
      setErr(ex.message || "Login failed");
    }finally{
      setBusy(false);
    }
  }

  return (
    <>
      <Nav />
      <div className="container">
        <div className="card" style={{maxWidth:520, margin:"0 auto"}}>
          <h2 className="h2">Login</h2>
          <p className="p">Access your wallet and start selling bundles.</p>
          <form onSubmit={onSubmit}>
            <div className="label">Phone</div>
            <input className="input" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="054xxxxxxx" />
            <div className="label">Password</div>
            <input className="input" value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="••••••••" />
            {err && <div className="notice" style={{marginTop:12}}>{err}</div>}
            <div className="row" style={{marginTop:14}}>
              <button className="btn primary" disabled={busy}>{busy ? "Signing in..." : "Login"}</button>
              <a className="btn" href="/register">Create account</a>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
